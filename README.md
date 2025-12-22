# 💰 Expense Tracker PWA

A Progressive Web App for tracking income and expenses that works offline. Built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

- 📱 **Progressive Web App** - Install on any device
- 🔒 **Secure PIN Authentication** - Your data stays private
- 📶 **Offline Support** - Works without internet connection
- 💾 **Local Storage** - Data stored on your device using IndexedDB
- 📊 **Dashboard** - View balance, income, and expenses at a glance
- 💳 **Transaction Management** - Add, edit, delete, and search transactions
- 📈 **Categories** - Organize transactions by category
- 📤 **Export Data** - Export transactions as JSON
- 🎨 **Responsive Design** - Works on mobile, tablet, and desktop

## 🚀 Getting Started

1. Open `index.html` in a web browser
2. Click "Get Started" to go to login
3. Enter PIN `1234` (demo) or set your own
4. Start tracking your expenses!

## 📱 Installation

### Desktop (Chrome/Edge)
- Click the install button in the address bar
- Or use the "Install App" button on the homepage

### Mobile (Android)
- Tap "Add to Home Screen" when prompted
- Or use browser menu → "Install App"

### iOS Safari
- Tap Share button → "Add to Home Screen"

## 🗂️ File Structure

```
Web App (PWA)/
├── index.html          # Landing page
├── login.html          # PIN authentication
├── dashboard.html      # Main dashboard
├── transactions.html   # Transaction management
├── manifest.json       # PWA configuration
├── sw.js              # Service Worker (offline support)
├── icons/             # App icons (if any)
└── README.md          # This file
```

## 💡 Usage

### Demo Login
- **PIN**: `1234`
- Or use fingerprint demo button

### Adding Transactions
1. Click the "+" button
2. Choose Income or Expense
3. Enter amount and description
4. Select category
5. Set date and optional notes
6. Save

### Features
- **Search**: Find transactions by description or category
- **Filter**: View by type, category, or date range
- **Export**: Download transaction data as JSON
- **Bulk Actions**: Select multiple transactions to delete or export

## 🛠️ Technical Details

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Storage**: IndexedDB for offline data persistence
- **PWA**: Service Worker for caching and offline functionality
- **Authentication**: Local PIN storage (no server required)
- **Responsive**: CSS Grid and Flexbox for all screen sizes

## 🔧 Customization

### Categories
Edit the `categories` array in `transactions.html` to add/modify expense categories.

### Currency
Change `KES` to your local currency in the JavaScript files.

### Colors
Modify CSS custom properties in the `<style>` sections to change the theme.

## 📊 Data Storage

All data is stored locally on your device using:
- **IndexedDB**: For transaction data
- **localStorage**: For settings and authentication

No data is sent to external servers.

## 🌐 Browser Support

- Chrome 67+ (recommended)
- Firefox 63+
- Safari 11.1+
- Edge 79+

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Made with ❤️ for Kenya** 🇰🇪