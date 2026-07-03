const fs = require('fs');

let demoJs = fs.readFileSync('demo_mode.js', 'utf8');

const lightModeStylesAndLogic = `
// --- Light Mode Theme Overrides ---
const style = document.createElement('style');
style.id = 'theme-overrides';
style.textContent = \`
body.light-theme {
    background-color: #f3f4f6 !important;
    color: #1f2937 !important;
}
body.light-theme .bg-brand-dark {
    background-color: #f3f4f6 !important;
}
body.light-theme .bg-brand-dark\\\\/50 {
    background-color: #ffffff !important;
}
body.light-theme .bg-mesh {
    background: radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.08), transparent 60%), 
                radial-gradient(circle at 10% 20%, rgba(168, 85, 247, 0.08), transparent 50%) !important;
    background-color: #f3f4f6 !important;
}
body.light-theme .glass {
    background: rgba(255, 255, 255, 0.7) !important;
    border-color: rgba(0, 0, 0, 0.08) !important;
    backdrop-filter: blur(16px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03) !important;
}
body.light-theme .glass-hover:hover {
    background: rgba(255, 255, 255, 0.9) !important;
    border-color: rgba(0, 0, 0, 0.12) !important;
}
body.light-theme .text-white {
    color: #111827 !important;
}
body.light-theme .text-gray-200 {
    color: #1f2937 !important;
}
body.light-theme .text-gray-300 {
    color: #374151 !important;
}
body.light-theme .text-gray-400 {
    color: #4b5563 !important;
}
body.light-theme .text-brand-accent {
    color: #0284c7 !important;
}
body.light-theme .border-white\\\\/5,
body.light-theme .border-white\\\\/10 {
    border-color: rgba(0, 0, 0, 0.08) !important;
}
body.light-theme .bg-white\\\\/5 {
    background-color: rgba(0, 0, 0, 0.03) !important;
}
body.light-theme .hover\\\\:bg-white\\\\/5:hover {
    background-color: rgba(0, 0, 0, 0.05) !important;
}
body.light-theme input, 
body.light-theme select, 
body.light-theme textarea {
    background-color: #ffffff !important;
    border-color: rgba(0, 0, 0, 0.15) !important;
    color: #111827 !important;
}
body.light-theme input::placeholder, 
body.light-theme textarea::placeholder {
    color: #9ca3af !important;
}
body.light-theme .text-green-400 {
    color: #166534 !important;
}
body.light-theme .bg-green-500\\\\/20 {
    background-color: #dcfce7 !important;
}
body.light-theme .text-red-400 {
    color: #991b1b !important;
}
body.light-theme .bg-red-500\\\\/20 {
    background-color: #fee2e2 !important;
}
body.light-theme .text-yellow-400 {
    color: #854d0e !important;
}
body.light-theme .bg-yellow-500\\\\/20 {
    background-color: #fef9c3 !important;
}
body.light-theme .text-blue-400 {
    color: #1e40af !important;
}
body.light-theme .bg-blue-500\\\\/20 {
    background-color: #dbeafe !important;
}
body.light-theme .bg-gray-900\\\\/80 {
    background-color: rgba(0, 0, 0, 0.4) !important;
}
body.light-theme .flatpickr-calendar {
    background: #ffffff !important;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
    border: 1px solid rgba(0,0,0,0.1) !important;
}
body.light-theme .flatpickr-day {
    color: #1f2937 !important;
}
body.light-theme .flatpickr-day.selected {
    background: #0284c7 !important;
    color: #ffffff !important;
}
body.light-theme .flatpickr-months .flatpickr-month {
    color: #1f2937 !important;
    fill: #1f2937 !important;
}
body.light-theme .flatpickr-current-month select {
    color: #1f2937 !important;
}
body.light-theme .flatpickr-weekday {
    color: #4b5563 !important;
}
body.light-theme .bg-brand-dark\\\\/60 {
    background-color: rgba(255, 255, 255, 0.6) !important;
    border-color: rgba(0, 0, 0, 0.08) !important;
}
body.light-theme .border-brand-accent {
    border-color: #0284c7 !important;
}
\`;
document.head.appendChild(style);

function injectThemeToggle() {
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
        profileContainer.parentNode.insertBefore(toggleBtn, profileContainer);
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
}

document.addEventListener('DOMContentLoaded', injectThemeToggle);
`;

demoJs += '\n' + lightModeStylesAndLogic;

fs.writeFileSync('demo_mode.js', demoJs);
console.log('Light Mode support successfully appended to demo_mode.js');
