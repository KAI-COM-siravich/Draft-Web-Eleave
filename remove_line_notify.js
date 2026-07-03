const fs = require('fs');

let settingsHtml = fs.readFileSync('settings.html', 'utf8');

const regex = /<!-- Line Notify -->\s*<div class="bg-white\/5 border border-white\/10 rounded-2xl p-6">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*/;
// Wait, the div structure:
// <div class="bg-white/5 ... p-6">
//   <div class="flex ...">...</div>
//   <div class="space-y-3">...</div>
// </div>
// It ends exactly where <!-- Email Settings --> begins.

// Let's use a simpler string replace if we can, or a safer regex up to <!-- Email Settings -->
const safeRegex = /<!-- Line Notify -->[\s\S]*?(?=<!-- Email Settings -->)/;

settingsHtml = settingsHtml.replace(safeRegex, '');

// Also, update the card description so it doesn't mention Line Notify
settingsHtml = settingsHtml.replace(
    'Manage Line Notify, Email alerts, and system notification rules.',
    'Manage Email alerts and system notification rules.'
);

fs.writeFileSync('settings.html', settingsHtml);
console.log('Removed Line Notify from Notifications panel');
