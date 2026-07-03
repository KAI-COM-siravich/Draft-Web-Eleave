const fs = require('fs');

// 1. settings.html
let settingsHtml = fs.readFileSync('settings.html', 'utf8');

settingsHtml = settingsHtml.replace(/Company Profile/g, 'Company Information');
settingsHtml = settingsHtml.replace('max-w-2xl bg-white/5', 'w-full bg-white/5');

const oldLogoInput = `<div>
                                <label class="block text-sm font-medium text-gray-300 mb-1">Company Logo (Text)</label>
                                <input type="text" id="cp-input-logo" class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="e.g. NC" value="NC">
                            </div>`;
const newLogoInput = `<div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Company Logo (Image)</label>
                                <div class="flex items-center gap-4">
                                    <div id="cp-logo-preview" class="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                                        <span class="text-gray-500 text-[10px] uppercase font-bold tracking-wider">None</span>
                                    </div>
                                    <input type="file" id="cp-input-logo" accept="image/*" class="w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all focus:outline-none">
                                </div>
                            </div>`;
settingsHtml = settingsHtml.replace(oldLogoInput, newLogoInput);

fs.writeFileSync('settings.html', settingsHtml);

// 2. demo_mode.js
let demoJs = fs.readFileSync('demo_mode.js', 'utf8');

// We need to replace the entire loadCompanyProfile and saveCompanyProfile functions
const newLogic = `
function loadCompanyProfile() {
    const profile = JSON.parse(localStorage.getItem('eleave_company_profile'));
    if (profile) {
        const els = {
            badge: document.getElementById('cp-logo-badge'),
            name: document.getElementById('cp-company-name'),
            tagline: document.getElementById('cp-company-tagline'),
            mainText: document.getElementById('cp-main-logo-text'),
            
            // Setting inputs
            inputName: document.getElementById('cp-input-name'),
            inputTagline: document.getElementById('cp-input-tagline')
        };
        
        if (els.badge) {
            if (profile.logo && profile.logo.startsWith('data:image')) {
                els.badge.innerHTML = \`<img src="\${profile.logo}" class="w-full h-full object-cover rounded-xl" alt="Logo">\`;
            } else {
                els.badge.innerHTML = profile.logo || 'NC';
            }
        }
        
        const preview = document.getElementById('cp-logo-preview');
        if (preview) {
            if (profile.logo && profile.logo.startsWith('data:image')) {
                preview.innerHTML = \`<img src="\${profile.logo}" class="w-full h-full object-cover">\`;
            } else {
                preview.innerHTML = '<span class="text-gray-500 text-[10px] uppercase font-bold tracking-wider">None</span>';
            }
        }
        
        if (els.name) els.name.innerHTML = profile.name;
        if (els.tagline) els.tagline.innerHTML = profile.tagline;
        if (els.mainText) els.mainText.innerHTML = profile.name.toUpperCase();
        
        if (els.inputName) els.inputName.value = profile.name;
        if (els.inputTagline) els.inputTagline.value = profile.tagline;
    }
}

function saveCompanyProfile(e) {
    if(e) e.preventDefault();
    const name = document.getElementById('cp-input-name').value || 'net cube';
    const tagline = document.getElementById('cp-input-tagline').value || 'Innovation and Excellence';
    const fileInput = document.getElementById('cp-input-logo');
    
    const saveAndShowAlert = (logoData) => {
        const currentProfile = JSON.parse(localStorage.getItem('eleave_company_profile')) || {};
        const logo = logoData || currentProfile.logo || 'NC';
        localStorage.setItem('eleave_company_profile', JSON.stringify({ logo, name, tagline }));
        loadCompanyProfile();
        
        if(e) {
            const btn = e.target.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Saved!';
            btn.classList.add('bg-green-500', 'text-white');
            btn.classList.remove('bg-brand-accent', 'text-brand-dark');
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('bg-green-500', 'text-white');
                btn.classList.add('bg-brand-accent', 'text-brand-dark');
            }, 2000);
        }
    };
    
    if (fileInput && fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
            saveAndShowAlert(event.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        saveAndShowAlert(null);
    }
}
`;

// Regex replace the old functions
demoJs = demoJs.replace(/function loadCompanyProfile\(\) \{[\s\S]*?function saveCompanyProfile\(e\) \{[\s\S]*?\}\s*\}/, newLogic.trim());

fs.writeFileSync('demo_mode.js', demoJs);

console.log('Modified company info logic.');
