# Sticksy - Custom Die-Cut Vinyl Stickers

A modern, interactive website for custom die-cut vinyl stickers with a beautiful UI for browsing, designing, and purchasing stickers online.

## 🎨 Features

- **Custom Stickers**: Upload any design and get custom die-cut stickers
- **Interactive Sticker Mat**: Drag and drop stickers on an interactive canvas
- **Shopping Cart**: Add/remove stickers and manage quantities
- **Responsive Design**: Works on all devices (desktop, tablet, mobile)
- **Smooth Animations**: Scroll reveal effects and interactive hover states
- **Payment Integration**: Simulated checkout flow (ready for real payment integration)
- **Mobile Menu**: Hamburger menu for mobile navigation

## 📁 Project Structure

```
Sticksy.in/
├── index.html           # Main HTML file
├── styles.css           # All CSS styling
├── script.js            # JavaScript functionality
├── images/              # SVG images and assets
│   ├── hero-banner.svg
│   ├── sticker-smiley.svg
│   ├── sticker-star.svg
│   ├── sticker-droplet.svg
│   ├── sticker-label.svg
│   ├── icon-waterproof.svg
│   ├── icon-precision.svg
│   ├── logo.svg
│   └── gallery-showcase.svg
├── README.md            # This file
├── LICENSE              # MIT License
└── .gitignore          # Git ignore rules
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sticksy.in.git
   cd sticksy.in
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required!

## 💻 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)** - Interactive features
- **SVG** - Vector graphics for stickers and icons

## 🎯 Key Sections

### Hero Section
Interactive hero with draggable stickers on a grid background

### Benefits
4 key selling points with icons and descriptions

### How It Works
4-step process explaining the workflow

### Gallery
Showcase of different sticker shapes and styles

### For Business
Bulk pricing and B2B features

### Cart & Checkout
Shopping cart with quantity controls and mock payment

### Reviews
Customer testimonials

## 🎮 Interactive Features

- **Draggable Stickers**: Click and drag stickers around the hero mat
- **Scroll Animations**: Elements fade in as you scroll
- **Cart Management**: Add/remove items, adjust quantities
- **Mobile Menu**: Responsive navigation for small screens
- **Payment Modal**: Simulated checkout experience

## 📝 Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
  --paper: #FAFAF6;
  --ink: #191919;
  --teal: #1F7A6C;
  --yellow: #FFCB3D;
  --coral: #FF5F45;
}
```

### Add More Stickers
Edit `script.js` and add to `stickerDefs` array:
```javascript
const stickerDefs = [
  { x: 14, y: 60, rot: -8, color: '#FFCB3D', kind: 'sun' },
  // Add more here
];
```

## 🔗 Links

- **Website**: [sticksy.in](https://sticksy.in)
- **Email**: [hello@sticksy.in](mailto:hello@sticksy.in)
- **Location**: Made in India

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👤 Author

**Sticksy Team**
- Email: hello@sticksy.in

## 🙏 Acknowledgments

- Custom fonts from Google Fonts (Space Grotesk, Inter, JetBrains Mono)
- Inspired by modern e-commerce design patterns
