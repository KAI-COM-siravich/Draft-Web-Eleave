const fs = require('fs');

let settingsHtml = fs.readFileSync('settings.html', 'utf8');

const oldButton = `<a href="index.html" class="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group no-underline">
              <div class="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-white/10 transition-all">
                  <i class="fa-solid fa-arrow-left text-brand-accent"></i>
              </div>
              <span class="font-medium tracking-wide">Back to Home</span>
          </a>`;

const newButton = `<a href="index.html" class="flex items-center gap-3 glass rounded-full px-5 py-3 transition-all-smooth glass-hover group no-underline">
              <i class="fa-solid fa-arrow-left text-brand-accent group-hover:-translate-x-1 transition-transform duration-300"></i>
              <span class="font-medium tracking-wide text-gray-200 group-hover:text-white transition-colors">Back to Home</span>
          </a>`;

settingsHtml = settingsHtml.replace(oldButton, newButton);

fs.writeFileSync('settings.html', settingsHtml);
console.log('Fixed Back to Home button in settings.html');
