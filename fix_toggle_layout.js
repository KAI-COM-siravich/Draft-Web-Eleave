const fs = require('fs');

let demoJs = fs.readFileSync('demo_mode.js', 'utf8');

// Replace the DOM insertion logic in demoJs
const oldInsertion = `    const profileContainer = header.querySelector('div.glass.rounded-full');
    if (profileContainer) {
        profileContainer.parentNode.insertBefore(toggleBtn, profileContainer);
    } else {
        header.prepend(toggleBtn);
    }`;

const newInsertion = `    const profileContainer = header.querySelector('div.glass.rounded-full');
    if (profileContainer) {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-center gap-2 md:gap-3 relative z-50';
        profileContainer.parentNode.insertBefore(wrapper, profileContainer);
        wrapper.appendChild(toggleBtn);
        wrapper.appendChild(profileContainer);
    } else {
        header.prepend(toggleBtn);
    }`;

demoJs = demoJs.replace(oldInsertion, newInsertion);

fs.writeFileSync('demo_mode.js', demoJs);
console.log('Fixed theme toggle button layout grouping');
