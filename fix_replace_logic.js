const fs = require('fs');
let demoJs = fs.readFileSync('demo_mode.js', 'utf8');

// Find the index of "// --- Company Profile Logic ---"
const startIndex = demoJs.indexOf('// --- Company Profile Logic ---');

if (startIndex !== -1) {
    demoJs = demoJs.substring(0, startIndex);
}

const newLogic = `
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
                preview.innerHTML = \`<img src="\${profile.logo}" class="w-full h-full object-cover rounded-xl">\`;
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

// Call on load
document.addEventListener('DOMContentLoaded', loadCompanyProfile);
`;

fs.writeFileSync('demo_mode.js', demoJs + newLogic);
console.log("Successfully replaced demo_mode.js logic.");
