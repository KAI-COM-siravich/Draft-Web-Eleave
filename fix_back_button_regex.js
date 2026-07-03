const fs = require('fs');

let settingsHtml = fs.readFileSync('settings.html', 'utf8');

// Match the specific <a> tag and replace it
const regex = /<a href="index\.html" class="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group[\s\S]*?Back to Home<\/span>\s*<\/a>/;

const replacement = `<a href="index.html" class="flex items-center gap-3 glass rounded-full px-5 py-3 transition-all-smooth glass-hover group no-underline">
              <i class="fa-solid fa-arrow-left text-brand-accent group-hover:-translate-x-1 transition-transform duration-300"></i>
              <span class="font-medium tracking-wide text-gray-200 group-hover:text-white transition-colors">Back to Home</span>
          </a>`;

if (regex.test(settingsHtml)) {
    settingsHtml = settingsHtml.replace(regex, replacement);
    fs.writeFileSync('settings.html', settingsHtml);
    console.log('Successfully replaced Back to Home button in settings.html');
} else {
    console.log('Could not find the target <a> tag in settings.html');
}
