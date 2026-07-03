const fs = require('fs');

// --- 1. Modify settings.html ---
let settingsHtml = fs.readFileSync('settings.html', 'utf8');

// Insert Card
const cardHtml = `
                <!-- Setting Card 0: Company Profile -->
                <div onclick="openSetting('company-profile')" class="glass rounded-2xl p-6 transition-all-smooth hover:bg-white/5 group border border-white/5 cursor-pointer relative overflow-hidden">
                    <div class="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i class="fa-solid fa-building text-8xl text-brand-accent"></i>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-brand-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i class="fa-solid fa-building text-brand-accent text-xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-white mb-2 group-hover:text-brand-accent transition-colors relative z-10">Company Profile</h3>
                    <p class="text-gray-400 text-sm leading-relaxed mb-4 relative z-10">Configure your company name, logo, and tagline.</p>
                    <div class="flex items-center text-brand-accent text-sm font-medium gap-2 relative z-10">
                        Manage <i class="fa-solid fa-arrow-right text-xs"></i>
                    </div>
                </div>
`;
settingsHtml = settingsHtml.replace('<!-- Setting Card 1 -->', cardHtml + '\n                <!-- Setting Card 1 -->');

// Insert Sidebar Nav
const navHtml = `
                    <button onclick="switchTab('company-profile')" id="nav-company-profile" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                        <i class="fa-solid fa-building text-brand-accent w-5 text-center"></i> Company Profile
                    </button>`;
settingsHtml = settingsHtml.replace('<nav class="space-y-1">', '<nav class="space-y-1">\n' + navHtml);

// Insert Panel
const panelHtml = `
                <!-- 0. Company Profile Panel -->
                <div id="panel-company-profile" class="setting-panel hidden">
                    <div class="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                            <i class="fa-solid fa-building text-brand-accent"></i> Company Profile
                        </h2>
                    </div>
                    
                    <div class="max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-6">
                        <form id="form-company-profile" onsubmit="saveCompanyProfile(event)" class="space-y-5">
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-1">Company Logo (Text)</label>
                                <input type="text" id="cp-input-logo" class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="e.g. NC" value="NC">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                                <input type="text" id="cp-input-name" class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="e.g. net cube" value="net cube">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-1">Tagline</label>
                                <input type="text" id="cp-input-tagline" class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="e.g. Innovation and Excellence" value="Innovation and Excellence">
                            </div>
                            <div class="pt-4 border-t border-white/10">
                                <button type="submit" class="bg-brand-accent hover:bg-brand-secondary text-brand-dark hover:text-white transition-colors py-2.5 px-6 rounded-xl font-semibold shadow-[0_0_15px_rgba(0,210,255,0.3)]">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
`;
settingsHtml = settingsHtml.replace('<!-- 1. Leave Types Panel -->', panelHtml + '\n                <!-- 1. Leave Types Panel -->');

// Switch case in settings.html script for the new panel tab coloring
// function switchTab(panelId) { ...
// It uses classList.add border-<color> based on panelId.
const borderSwitchReplace = `switch(panelId) {
                case 'company-profile': activeNav.classList.add('bg-white/10', 'text-white', 'border-l-4', 'border-brand-accent'); break;`;
settingsHtml = settingsHtml.replace('switch(panelId) {', borderSwitchReplace);

fs.writeFileSync('settings.html', settingsHtml);

// --- 2. Modify index.html ---
let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
    '<div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-accent to-brand-secondary rounded-xl flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-[0_0_20px_rgba(0,210,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,210,255,0.6)] transition-all duration-300 transform group-hover:scale-105">',
    '<div id="cp-logo-badge" class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-accent to-brand-secondary rounded-xl flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-[0_0_20px_rgba(0,210,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,210,255,0.6)] transition-all duration-300 transform group-hover:scale-105">'
);
indexHtml = indexHtml.replace(
    '<span class="font-bold text-xl md:text-2xl tracking-wide text-white">net cube</span>',
    '<span id="cp-company-name" class="font-bold text-xl md:text-2xl tracking-wide text-white">net cube</span>'
);
indexHtml = indexHtml.replace(
    '<span class="text-[8px] md:text-[10px] text-brand-accent font-medium tracking-wider uppercase mt-1">Innovation and Excellence</span>',
    '<span id="cp-company-tagline" class="text-[8px] md:text-[10px] text-brand-accent font-medium tracking-wider uppercase mt-1">Innovation and Excellence</span>'
);
indexHtml = indexHtml.replace(
    '<span class="absolute top-4 md:top-5 text-[8px] md:text-[9px] font-bold tracking-widest text-gray-500">NET CUBE</span>',
    '<span id="cp-main-logo-text" class="absolute top-4 md:top-5 text-[8px] md:text-[9px] font-bold tracking-widest text-gray-500 uppercase">NET CUBE</span>'
);

fs.writeFileSync('index.html', indexHtml);

// --- 3. Modify demo_mode.js to include global script ---
let demoJs = fs.readFileSync('demo_mode.js', 'utf8');

const companyScript = `
// --- Company Profile Logic ---
function loadCompanyProfile() {
    const profile = JSON.parse(localStorage.getItem('eleave_company_profile'));
    if (profile) {
        const els = {
            badge: document.getElementById('cp-logo-badge'),
            name: document.getElementById('cp-company-name'),
            tagline: document.getElementById('cp-company-tagline'),
            mainText: document.getElementById('cp-main-logo-text'),
            
            // Setting inputs
            inputLogo: document.getElementById('cp-input-logo'),
            inputName: document.getElementById('cp-input-name'),
            inputTagline: document.getElementById('cp-input-tagline')
        };
        
        if (els.badge) els.badge.innerHTML = profile.logo;
        if (els.name) els.name.innerHTML = profile.name;
        if (els.tagline) els.tagline.innerHTML = profile.tagline;
        if (els.mainText) els.mainText.innerHTML = profile.name.toUpperCase();
        
        if (els.inputLogo) els.inputLogo.value = profile.logo;
        if (els.inputName) els.inputName.value = profile.name;
        if (els.inputTagline) els.inputTagline.value = profile.tagline;
    }
}

function saveCompanyProfile(e) {
    if(e) e.preventDefault();
    const logo = document.getElementById('cp-input-logo').value || 'NC';
    const name = document.getElementById('cp-input-name').value || 'net cube';
    const tagline = document.getElementById('cp-input-tagline').value || 'Innovation and Excellence';
    
    localStorage.setItem('eleave_company_profile', JSON.stringify({ logo, name, tagline }));
    loadCompanyProfile();
    
    // Show quick alert
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Saved!';
    btn.classList.add('bg-green-500', 'text-white');
    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('bg-green-500', 'text-white');
    }, 2000);
}

// Call on load
document.addEventListener('DOMContentLoaded', loadCompanyProfile);
`;

if (!demoJs.includes('loadCompanyProfile')) {
    fs.writeFileSync('demo_mode.js', demoJs + '\n' + companyScript);
}

console.log('Successfully injected company profile settings.');
