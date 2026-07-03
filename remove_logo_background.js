const fs = require('fs');

let demoJs = fs.readFileSync('demo_mode.js', 'utf8');

// Fix badge logic
const oldBadgeLogic = `if (profile.logo && profile.logo.startsWith('data:image')) {
                els.badge.innerHTML = \`<img src="\${profile.logo}" class="w-full h-full object-cover rounded-xl" alt="Logo">\`;
            } else {
                els.badge.innerHTML = profile.logo || 'NC';
            }`;

const newBadgeLogic = `if (profile.logo && profile.logo.startsWith('data:image')) {
                els.badge.innerHTML = \`<img src="\${profile.logo}" class="w-full h-full object-contain" alt="Logo">\`;
                els.badge.style.background = 'transparent';
                els.badge.style.boxShadow = 'none';
            } else {
                els.badge.innerHTML = profile.logo || 'NC';
                els.badge.style.background = '';
                els.badge.style.boxShadow = '';
            }`;

demoJs = demoJs.replace(oldBadgeLogic, newBadgeLogic);

// Fix preview logic
const oldPreviewLogic = `if (profile.logo && profile.logo.startsWith('data:image')) {
                preview.innerHTML = \`<img src="\${profile.logo}" class="w-full h-full object-cover rounded-xl">\`;
            } else {`;

const newPreviewLogic = `if (profile.logo && profile.logo.startsWith('data:image')) {
                preview.innerHTML = \`<img src="\${profile.logo}" class="w-full h-full object-contain">\`;
            } else {`;

demoJs = demoJs.replace(oldPreviewLogic, newPreviewLogic);

fs.writeFileSync('demo_mode.js', demoJs);
console.log('Removed logo background styling when image is present');
