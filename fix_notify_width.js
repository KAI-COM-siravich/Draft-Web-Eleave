const fs = require('fs');

let settingsHtml = fs.readFileSync('settings.html', 'utf8');

// The specific block is under panel-notifications
// We can just replace 'space-y-6 max-w-2xl' with 'space-y-6 w-full'
settingsHtml = settingsHtml.replace(
    '<div class="space-y-6 max-w-2xl">',
    '<div class="space-y-6 w-full">'
);

fs.writeFileSync('settings.html', settingsHtml);
console.log('Fixed max-w-2xl to w-full in notifications panel');
