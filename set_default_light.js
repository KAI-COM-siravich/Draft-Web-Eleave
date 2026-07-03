const fs = require('fs');

let demoJs = fs.readFileSync('demo_mode.js', 'utf8');

// Change default fallback to 'light'
demoJs = demoJs.replace(
    "const currentTheme = localStorage.getItem('eleave_theme') || 'dark';",
    "const currentTheme = localStorage.getItem('eleave_theme') || 'light';"
);

fs.writeFileSync('demo_mode.js', demoJs);
console.log('Set default theme to Light Mode');
