const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Use regex to match the span line regardless of its inner content
indexHtml = indexHtml.replace(/<span id="cp-main-logo-text".*?<\/span>\s*/, '');

fs.writeFileSync('index.html', indexHtml);

let demoJs = fs.readFileSync('demo_mode.js', 'utf8');

// Also remove from JS to avoid any null reference if we didn't check
demoJs = demoJs.replace("if (els.mainText) els.mainText.innerHTML = profile.name.toUpperCase();", "");

fs.writeFileSync('demo_mode.js', demoJs);
console.log('Removed company name from main logo E in index.html');
