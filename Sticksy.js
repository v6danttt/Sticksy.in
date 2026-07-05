// ---- reveal on scroll ----
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));

// ---- draggable sticker mat ----
const mat = document.getElementById('mat'); 

const stickerDefs = [
  { x: 14,  y: 60,  rot: -8,  color:'#FFCB3D', kind:'sun' },
  { x: 62,  y: 18,  rot: 10,  color:'#FF5F45', kind:'star' },
  { x: 60,  y: 62,  rot: -6,  color:'#1F7A6C', kind:'label' },
  { x: 20,  y: 8,   rot: 14,  color:'#FFCB3D', kind:'drop' }
];

function shapeSVG(kind, color){
  switch(kind){
    case 'sun': return `<svg width="120" height="120" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="${color}"/><path d="M35 56c5 7 11 10 15 10s10-3 15-10" stroke="#191919" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="38" cy="42" r="4" fill="#191919"/><circle cx="62" cy="42" r="4" fill="#191919"/></svg>`;
    case 'star': return `<svg width="110" height="110" viewBox="0 0 100 100"><path d="M50 6l12 26 29 4-21 20 5 29-25-14-25 14 5-29L9 36l29-4z" fill="${color}"/></svg>`;
    case 'label': return `<svg width="130" height="90" viewBox="0 0 120 80"><rect x="6" y="6" width="108" height="68" rx="12" fill="${color}"/><rect x="22" y="26" width="70" height="7" rx="3.5" fill="#FAFAF6"/><rect x="22" y="42" width="46" height="7" rx="3.5" fill="#FAFAF6"/></svg>`;
    case 'drop': return `<svg width="100" height="120" viewBox="0 0 100 110"><path d="M50 8c22 0 38 16 38 36 0 25-27 45-38 50-11-5-38-25-38-50 0-20 16-36 38-36z" fill="${color}"/></svg>`;
  }
}

stickerDefs.forEach((def, i)=>{
  const el = document.createElement('div');
  el.className = 'sticker';
  el.style.left = def.x + '%';
  el.style.top = def.y + '%';
  el.style.transform = `rotate(${def.rot}deg)`;
  el.innerHTML = `<div class="peel">${shapeSVG(def.kind, def.color)}</div>`;
  mat.appendChild(el);
  makeDraggable(el);
});

function makeDraggable(el){
  let dragging = false, offX = 0, offY = 0, baseRot = 0;

  const start = (clientX, clientY)=>{
    dragging = true;
    const matRect = mat.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    offX = clientX - elRect.left;
    offY = clientY - elRect.top;
    el.style.zIndex = 10;
    const m = el.style.transform.match(/-?\d+(\.\d+)?/);
    baseRot = m ? parseFloat(m[0]) : 0;
  };
  const move = (clientX, clientY)=>{
    if(!dragging) return;
    const matRect = mat.getBoundingClientRect();
    let nx = clientX - matRect.left - offX;
    let ny = clientY - matRect.top - offY;
    nx = Math.max(-20, Math.min(matRect.width - 40, nx));
    ny = Math.max(-20, Math.min(matRect.height - 40, ny));
    el.style.left = (nx / matRect.width * 100) + '%';
    el.style.top = (ny / matRect.height * 100) + '%';
  };
  const end = ()=>{ dragging = false; el.style.zIndex = 1; };

  el.addEventListener('pointerdown', (e)=>{
    el.setPointerCapture(e.pointerId);
    start(e.clientX, e.clientY);
  });
  el.addEventListener('pointermove', (e)=> move(e.clientX, e.clientY));
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
}

// ---- mobile menu (simple toggle to links list) ----
const toggle = document.querySelector('.menu-toggle');
const navlinks = document.querySelector('.navlinks');
toggle?.addEventListener('click', ()=>{
  const open = navlinks.style.display === 'flex';
  navlinks.style.display = open ? 'none' : 'flex';
  navlinks.style.cssText += open ? '' : 'position:absolute;top:74px;left:0;right:0;background:var(--paper);flex-direction:column;padding:20px 32px;border-bottom:1px solid var(--line);gap:18px;';
});

// ---- simple cart + mock payment ----
(function(){
  const priceMap = { s1:79, s2:59, s3:99 };
  const shipping = 25;
  const cartList = document.getElementById('cartList');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const shippingEl = document.getElementById('shipping');

  function updateTotals(){
    let sub = 0;
    document.querySelectorAll('#cartList .cart-item').forEach(item=>{
      const id = item.getAttribute('data-id');
      const q = parseInt(item.querySelector('.qty').textContent||'0',10);
      sub += (priceMap[id]||0) * q;
    });
    subtotalEl.textContent = `₹${sub}`;
    totalEl.textContent = `₹${sub + (sub>0?shipping:0)}`;
    shippingEl.textContent = sub>0?`₹${shipping}`:'₹0';
  }

  cartList?.addEventListener('click', (e)=>{
    const btn = e.target.closest('button');
    if(!btn) return;
    const item = btn.closest('.cart-item');
    if(!item) return;
    const qtyEl = item.querySelector('.qty');
    let q = parseInt(qtyEl.textContent,10)||0;
    if(btn.classList.contains('incr')) q++;
    if(btn.classList.contains('decr')) q = Math.max(0,q-1);
    qtyEl.textContent = q;
    updateTotals();
  });

  // payment modal (simple simulated flow)
  const checkoutBtn = document.getElementById('checkoutBtn');
  const pm = document.createElement('div'); pm.className='payment-modal';
  pm.innerHTML = `<div class="pm-card"><h3>Payment</h3><div class="pm-row"><span>Amount</span><strong id="pmAmount">₹0</strong></div><div style="font-size:13px;color:var(--ink-soft);">Choose a method (simulated)</div><div class="pm-actions"><button class="btn" id="pmPay">Pay</button><button class="btn btn-ghost" id="pmCancel">Cancel</button></div><div id="pmMsg" style="margin-top:12px;font-size:13px;color:var(--ink-soft);"></div></div>`;
  document.body.appendChild(pm);

  function showPM(){
    const totalText = totalEl.textContent || '₹0';
    pm.querySelector('#pmAmount').textContent = totalText;
    pm.classList.add('in');
  }
  function hidePM(){ pm.classList.remove('in'); pm.querySelector('#pmMsg').textContent=''; }

  checkoutBtn?.addEventListener('click', ()=>{
    const subVal = parseInt((subtotalEl.textContent||'₹0').replace(/[^0-9]/g,''),10)||0;
    if(subVal<=0){ alert('Your cart is empty. Add some stickers first.'); return; }
    showPM();
  });

  pm.querySelector('#pmCancel')?.addEventListener('click', hidePM);
  pm.querySelector('#pmPay')?.addEventListener('click', ()=>{
    const msg = pm.querySelector('#pmMsg');
    msg.textContent = 'Processing payment...';
    setTimeout(()=>{
      msg.textContent = 'Payment successful — thanks! Your order is confirmed.';
      // clear quantities
      document.querySelectorAll('#cartList .qty').forEach(q=>q.textContent='0');
      updateTotals();
    },1000);
  });

  // init
  updateTotals();
})();
