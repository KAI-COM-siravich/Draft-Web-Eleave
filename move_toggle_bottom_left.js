const fs = require('fs');

let demoJs = fs.readFileSync('demo_mode.js', 'utf8');

// Replace the injectThemeToggle function in demoJs
const oldInjectFn = `function injectThemeToggle() {
    const header = document.querySelector('header');
    if (!header) return;

    if (document.getElementById('theme-toggle-btn')) return;

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle-btn';
    toggleBtn.className = 'w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center transition-all-smooth glass-hover text-brand-accent hover:text-white relative z-50 mr-2';
    toggleBtn.style.marginRight = '8px';
    toggleBtn.innerHTML = '<i class="fa-solid fa-moon text-lg md:text-xl"></i>';

    const profileContainer = header.querySelector('div.glass.rounded-full');
    if (profileContainer) {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-center gap-2 md:gap-3 relative z-50';
        profileContainer.parentNode.insertBefore(wrapper, profileContainer);
        wrapper.appendChild(toggleBtn);
        wrapper.appendChild(profileContainer);
    } else {
        header.prepend(toggleBtn);
    }

    const currentTheme = localStorage.getItem('eleave_theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        toggleBtn.innerHTML = '<i class="fa-solid fa-sun text-lg md:text-xl text-yellow-500"></i>';
    }

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('eleave_theme', isLight ? 'light' : 'dark');
        if (isLight) {
            toggleBtn.innerHTML = '<i class="fa-solid fa-sun text-lg md:text-xl text-yellow-500"></i>';
            showToast('Switched to Light Mode', 'success');
        } else {
            toggleBtn.innerHTML = '<i class="fa-solid fa-moon text-lg md:text-xl text-brand-accent"></i>';
            showToast('Switched to Dark Mode', 'success');
        }
    });
}`;

const newInjectFn = `function injectThemeToggle() {
    if (document.getElementById('theme-toggle-btn')) return;

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle-btn';
    toggleBtn.className = 'fixed bottom-6 left-6 z-50 glass w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all-smooth glass-hover text-brand-accent hover:text-white shadow-lg';
    toggleBtn.innerHTML = '<i class="fa-solid fa-moon text-lg md:text-xl"></i>';

    document.body.appendChild(toggleBtn);

    const currentTheme = localStorage.getItem('eleave_theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        toggleBtn.innerHTML = '<i class="fa-solid fa-sun text-lg md:text-xl text-yellow-500"></i>';
    }

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('eleave_theme', isLight ? 'light' : 'dark');
        if (isLight) {
            toggleBtn.innerHTML = '<i class="fa-solid fa-sun text-lg md:text-xl text-yellow-500"></i>';
            showToast('Switched to Light Mode', 'success');
        } else {
            toggleBtn.innerHTML = '<i class="fa-solid fa-moon text-lg md:text-xl text-brand-accent"></i>';
            showToast('Switched to Dark Mode', 'success');
        }
    });
}`;

demoJs = demoJs.replace(oldInjectFn, newInjectFn);

fs.writeFileSync('demo_mode.js', demoJs);
console.log('Moved theme toggle to bottom left');
