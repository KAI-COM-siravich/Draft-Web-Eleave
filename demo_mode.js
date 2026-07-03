const demoHTML = `
    <!-- Demo Mode Toggle Button -->
    <button id="demoToggleBtn" class="fixed bottom-6 right-6 z-50 glass px-4 py-3 rounded-full flex items-center gap-2 text-white glass-hover transition-all-smooth group shadow-2xl">
        <i class="fa-solid fa-wand-magic-sparkles text-brand-accent group-hover:rotate-12 transition-transform"></i>
        <span class="font-medium text-sm">Demo Mode</span>
    </button>

    <!-- Demo Mode Panel -->
    <div id="demoPanel" class="fixed bottom-20 right-6 z-50 w-80 glass rounded-2xl p-5 transform translate-y-4 opacity-0 pointer-events-none transition-all duration-300 shadow-2xl border border-white/10">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-white font-semibold flex items-center gap-2">
                <i class="fa-solid fa-user-astronaut text-brand-accent"></i>
                Select Role
            </h3>
            <button id="closeDemoBtn" class="text-gray-400 hover:text-white transition-colors">
                <i class="fa-solid fa-times"></i>
            </button>
        </div>
        
        <div class="space-y-2 mb-5">
            <label class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/10">
                <input type="radio" name="demo-role" value="employee" class="text-brand-accent focus:ring-brand-accent bg-brand-dark border-gray-600">
                <span class="text-gray-200 text-sm">Employee</span>
            </label>
            <label class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/10">
                <input type="radio" name="demo-role" value="manager" class="text-brand-accent focus:ring-brand-accent bg-brand-dark border-gray-600">
                <span class="text-gray-200 text-sm">Manager</span>
            </label>
            <label class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/10">
                <input type="radio" name="demo-role" value="hr" class="text-brand-accent focus:ring-brand-accent bg-brand-dark border-gray-600">
                <span class="text-gray-200 text-sm">HR</span>
            </label>
            <label class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/10">
                <input type="radio" name="demo-role" value="admin" class="text-brand-accent focus:ring-brand-accent bg-brand-dark border-gray-600">
                <span class="text-gray-200 text-sm">System Admin</span>
            </label>
        </div>

        <div class="border-t border-white/10 pt-4">
            <h4 class="text-gray-300 text-xs font-semibold mb-3 uppercase tracking-wider">Quick Links</h4>
            <div class="grid grid-cols-2 gap-3">
                <a href="index.html" class="text-xs text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-1.5"><i class="fa-solid fa-house w-4"></i> Home</a>
                <a href="e-leave.html" class="text-xs text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-1.5"><i class="fa-solid fa-calendar-day w-4"></i> E-Leave</a>
                <a id="demo-link-approvals" href="approvals.html" class="text-xs text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-1.5"><i class="fa-regular fa-circle-check w-4"></i> Approvals</a>
                <a href="yearly-holidays.html" class="text-xs text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-1.5"><i class="fa-regular fa-calendar w-4"></i> Holidays</a>
                <a href="company-events.html" class="text-xs text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-1.5"><i class="fa-solid fa-users w-4"></i> Events</a>
                <a href="employees.html" class="text-xs text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-1.5"><i class="fa-solid fa-user-group w-4"></i> Employees</a>
                <a href="guide.html" class="text-xs text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-1.5"><i class="fa-solid fa-info w-4"></i> Guide</a>
                <a id="demo-link-settings" href="settings.html" class="text-xs text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-1.5"><i class="fa-solid fa-gear w-4"></i> Settings</a>
            </div>
        </div>
    </div>
`;

document.addEventListener('DOMContentLoaded', () => {
    // Inject HTML to body
    document.body.insertAdjacentHTML('beforeend', demoHTML);

    const demoToggleBtn = document.getElementById('demoToggleBtn');
    const demoPanel = document.getElementById('demoPanel');
    const closeDemoBtn = document.getElementById('closeDemoBtn');
    const roleRadios = document.querySelectorAll('input[name="demo-role"]');

    function toggleDemoPanel() {
        if (demoPanel.classList.contains('opacity-0')) {
            demoPanel.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
            demoPanel.classList.add('opacity-100', 'translate-y-0');
        } else {
            demoPanel.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
            demoPanel.classList.remove('opacity-100', 'translate-y-0');
        }
    }

    demoToggleBtn.addEventListener('click', toggleDemoPanel);
    closeDemoBtn.addEventListener('click', toggleDemoPanel);

    // Load saved role
    const savedRole = localStorage.getItem('demoRole') || 'employee';
    const activeRadio = document.querySelector(`input[name="demo-role"][value="${savedRole}"]`);
    if(activeRadio) activeRadio.checked = true;

    // Apply role effects
    function applyRole(role) {
        localStorage.setItem('demoRole', role);
        const profileName = document.getElementById('profile-name');
        if (profileName) {
            const roleNames = {
                'employee': 'John Doe (Employee)',
                'manager': 'Sarah Smith (Manager)',
                'hr': 'Mike Johnson (HR)',
                'admin': 'Admin System'
            };
            profileName.textContent = roleNames[role] || 'Netcube AutoSync';
        }
        
        // Update Approvals Link
        const approvalsLink = document.querySelector('a[href="approvals.html"].glass');
        const demoApprovalsLink = document.getElementById('demo-link-approvals');
        if (approvalsLink) approvalsLink.style.display = role === 'employee' ? 'none' : 'block';
        if (demoApprovalsLink) demoApprovalsLink.style.display = role === 'employee' ? 'none' : 'flex';

        // Hide/show Settings link in footer and quick links
        const settingsLink = document.getElementById('settings-link');
        const settingsDivider = document.getElementById('settings-divider');
        const demoSettingsLink = document.getElementById('demo-link-settings');
        
        if (settingsLink && settingsDivider) {
            if (role === 'hr' || role === 'admin') {
                settingsLink.style.display = '';
                settingsDivider.style.display = '';
            } else {
                settingsLink.style.display = 'none';
                settingsDivider.style.display = 'none';
            }
        }
        if (demoSettingsLink) {
            if (role === 'hr' || role === 'admin') {
                demoSettingsLink.style.display = 'flex';
            } else {
                demoSettingsLink.style.display = 'none';
            }
        }

        // Add custom event so other scripts can listen to role changes
        document.dispatchEvent(new CustomEvent('roleChanged', { detail: { role } }));
    }
    
    applyRole(savedRole);

    roleRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            applyRole(e.target.value);
            // Reload page dynamically or just let scripts listen to event
            // For now, let's just reload the page to apply any hard page-level logic if needed
            // Actually, we don't need to reload. The dispatchEvent is enough if pages hook it up.
        });
    });
});



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
                els.badge.innerHTML = `<img src="${profile.logo}" class="w-full h-full object-contain" alt="Logo">`;
                els.badge.style.background = 'transparent';
                els.badge.style.boxShadow = 'none';
            } else {
                els.badge.innerHTML = profile.logo || 'NC';
                els.badge.style.background = '';
                els.badge.style.boxShadow = '';
            }
        }
        
        const preview = document.getElementById('cp-logo-preview');
        if (preview) {
            if (profile.logo && profile.logo.startsWith('data:image')) {
                preview.innerHTML = `<img src="${profile.logo}" class="w-full h-full object-contain">`;
            } else {
                preview.innerHTML = '<span class="text-gray-500 text-[10px] uppercase font-bold tracking-wider">None</span>';
            }
        }
        
        if (els.name) els.name.innerHTML = profile.name;
        if (els.tagline) {
            els.tagline.innerHTML = profile.tagline || '';
            els.tagline.style.display = profile.tagline ? '' : 'none';
        }
        
        
        if (els.inputName) els.inputName.value = profile.name;
        if (els.inputTagline) els.inputTagline.value = profile.tagline || '';
    }
}

function saveCompanyProfile(e) {
    if(e) e.preventDefault();
    const name = document.getElementById('cp-input-name').value || 'net cube';
    const tagline = document.getElementById('cp-input-tagline').value;
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
