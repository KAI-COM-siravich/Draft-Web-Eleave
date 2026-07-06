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
                <a href="overtime.html" class="text-xs text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-1.5"><i class="fa-solid fa-business-time w-4"></i> Overtime</a>
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

    // Inject global CSS for role-based admin-only elements
    const adminStyle = document.createElement('style');
    adminStyle.id = 'admin-role-styles';
    adminStyle.textContent = `
        /* Hide admin-only elements when not hr/admin */
        body[data-role="employee"] .admin-only,
        body[data-role="manager"] .admin-only {
            display: none !important;
        }
    `;
    document.head.appendChild(adminStyle);

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
        // Set body data-role so CSS .admin-only rules work instantly
        document.body.dataset.role = role;
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
        
        // Update Approvals Link visibility and grid layout
        const approvalsCard = document.getElementById('approvals-card');
        const approvalsLink = document.querySelector('a[href="approvals.html"].glass');
        const demoApprovalsLink = document.getElementById('demo-link-approvals');
        const actionGrid = document.getElementById('action-cards-grid');

        const showApprovals = role !== 'employee';

        if (approvalsCard) approvalsCard.style.display = showApprovals ? 'block' : 'none';
        if (approvalsLink) approvalsLink.style.display = showApprovals ? 'block' : 'none';
        if (demoApprovalsLink) demoApprovalsLink.style.display = showApprovals ? 'flex' : 'none';

        // Adjust grid: 2-col (centered) for Employee, 3-col for Manager/HR/Admin
        if (actionGrid) {
            if (showApprovals) {
                actionGrid.className = 'grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-[950px]';
            } else {
                actionGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-[640px]';
            }
        }

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


























// --- Light Mode Theme Overrides ---
const style = document.createElement('style');
style.id = 'theme-overrides';
style.textContent = `
body.light-theme {
    background-color: #f3f4f6 !important;
    color: #1f2937 !important;
}
body.light-theme .bg-brand-dark {
    background-color: #f3f4f6 !important;
}
body.light-theme .bg-brand-dark\\/50 {
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
body.light-theme .border-white\\/5,
body.light-theme .border-white\\/10 {
    border-color: rgba(0, 0, 0, 0.08) !important;
}
body.light-theme .bg-white\\/5 {
    background-color: rgba(0, 0, 0, 0.03) !important;
}
body.light-theme .hover\\:bg-white\\/5:hover {
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

/* Accent colors overrides for light background */
body.light-theme .text-purple-400,
body.light-theme .text-purple-300 {
    color: #6d28d9 !important;
}
body.light-theme .text-emerald-400,
body.light-theme .text-emerald-300 {
    color: #047857 !important;
}
body.light-theme .text-pink-400,
body.light-theme .text-pink-300 {
    color: #be185d !important;
}
body.light-theme .text-orange-400,
body.light-theme .text-orange-300 {
    color: #c2410c !important;
}
body.light-theme .text-yellow-400,
body.light-theme .text-yellow-300 {
    color: #b45309 !important;
}
body.light-theme .text-blue-400,
body.light-theme .text-blue-300 {
    color: #1d4ed8 !important;
}

/* Status Badges */
body.light-theme .bg-emerald-500\\/20 {
    background-color: #d1fae5 !important;
}
body.light-theme .bg-yellow-500\\/20 {
    background-color: #fef3c7 !important;
}
body.light-theme .bg-orange-500\\/20 {
    background-color: #ffedd5 !important;
}
body.light-theme .bg-purple-500\\/20 {
    background-color: #f3e8ff !important;
}
body.light-theme .bg-blue-500\\/20 {
    background-color: #dbeafe !important;
}
body.light-theme .bg-red-500\\/20 {
    background-color: #fee2e2 !important;
}

/* Modals & Detail Sidebars */
body.light-theme .modal-glass,
body.light-theme #modalContainer,
body.light-theme #modalContent,
body.light-theme #viewModalContent,
body.light-theme #viewModalContent > div,
body.light-theme [id*="modal"] .glass,
body.light-theme [id*="Modal"] .glass,
body.light-theme .modal-content,
body.light-theme [class*="modal"] {
    background: #ffffff !important;
    background-color: #ffffff !important;
    border-color: rgba(0, 0, 0, 0.1) !important;
    color: #1f2937 !important;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1) !important;
}
body.light-theme #viewModalHeader,
body.light-theme #viewModalContent .bg-\\[\\#040833\\]\\/90,
body.light-theme #viewModalContent .bg-black\\/20,
body.light-theme #modalActionButtons {
    background-color: #f9fafb !important;
    border-color: rgba(0, 0, 0, 0.08) !important;
}

/* Toggle Switch bg */
body.light-theme .bg-black\\/40 {
    background-color: rgba(0, 0, 0, 0.06) !important;
}

/* Solid brand gradients for glass action buttons in light mode */
body.light-theme button.glass[class*="bg-gradient"],
body.light-theme a.glass[class*="bg-gradient"],
body.light-theme button[class*="bg-gradient-to-r"].glass,
body.light-theme a[class*="bg-gradient-to-r"].glass {
    background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%) !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
    box-shadow: 0 4px 15px rgba(58, 123, 213, 0.2) !important;
}
body.light-theme button.glass[class*="bg-gradient"] span,
body.light-theme a.glass[class*="bg-gradient"] span,
body.light-theme button.glass[class*="bg-gradient"] i,
body.light-theme a.glass[class*="bg-gradient"] i {
    color: #ffffff !important;
}
body.light-theme button.glass[class*="bg-gradient"]:hover,
body.light-theme a.glass[class*="bg-gradient"]:hover {
    background: linear-gradient(135deg, #00bce6 0%, #2f6cb8 100%) !important;
    box-shadow: 0 6px 20px rgba(58, 123, 213, 0.35) !important;
    transform: translateY(-2px) scale(1.02) !important;
}


/* Keep white text inside badges/avatars/gradients */
body.light-theme .bg-gradient-to-br .text-white,
body.light-theme .bg-gradient-to-br i,
body.light-theme .bg-gradient-to-br span,
body.light-theme .bg-gradient-to-r .text-white,
body.light-theme .bg-gradient-to-r i,
body.light-theme .bg-gradient-to-r span,
body.light-theme .bg-purple-500 .text-white,
body.light-theme .bg-purple-500 span,
body.light-theme .bg-emerald-500 .text-white,
body.light-theme .bg-emerald-500 span,
body.light-theme .bg-blue-500 .text-white,
body.light-theme .bg-blue-500 span,
body.light-theme .bg-red-500 .text-white,
body.light-theme .bg-red-500 span,
body.light-theme .bg-orange-500 .text-white,
body.light-theme .bg-orange-500 span,
body.light-theme .bg-\\[\\#040833\\] .text-white,
body.light-theme .bg-\\[\\#040833\\] span,
body.light-theme #viewAvatar,
body.light-theme #cp-logo-badge {
    color: #ffffff !important;
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
body.light-theme .bg-brand-dark\\/60 {
    background-color: rgba(255, 255, 255, 0.6) !important;
    border-color: rgba(0, 0, 0, 0.08) !important;
}
body.light-theme .border-brand-accent {
    border-color: #0284c7 !important;
}
`;
document.head.appendChild(style);

function injectThemeToggle() {
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
            if (typeof showToast === 'function') showToast('Switched to Light Mode', 'success');
        } else {
            toggleBtn.innerHTML = '<i class="fa-solid fa-moon text-lg md:text-xl text-brand-accent"></i>';
            if (typeof showToast === 'function') showToast('Switched to Dark Mode', 'success');
        }
    });
}

function injectPageGuide() {
    if (document.getElementById('page-guide-btn')) return;

    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    const guides = {
        'index.html': {
            title: 'Home Dashboard (Overview)',
            color: 'text-brand-accent bg-brand-accent/10 border-brand-accent/20',
            steps: [
                '<strong>Select Role:</strong> Click "Demo Mode" (bottom-right) to switch roles (Employee, Manager, HR, Admin) and test different page permissions.',
                '<strong>Quick Actions:</strong> Click "E-Leave" to request leave, or "Approvals" to review team requests.',
                '<strong>Bottom Dock:</strong> Use the floating dock at the bottom to access Settings, Holidays, Events, Employee Directory, or the main Guide.'
            ]
        },
        'overtime.html': {
            title: 'Overtime (OT) Guide',
            icon: 'fa-business-time',
            steps: [
                {
                    title: 'Submit OT Requests',
                    desc: 'Log extra hours by setting OT Date, start/end times, and description. Compensation auto-calculates.'
                },
                {
                    title: 'Compensatory Leave',
                    desc: 'Approved OT hours build your Comp Balance, convertible directly into leave days.'
                }
            ]
        },
        'overtime.html': {
            title: 'Overtime (OT) Guide',
            icon: 'fa-business-time',
            steps: [
                {
                    title: 'Submit OT Requests',
                    desc: 'Log extra hours by setting OT Date, start/end times, and description. Compensation auto-calculates.'
                },
                {
                    title: 'Compensatory Leave',
                    desc: 'Approved OT hours build your Comp Balance, convertible directly into leave days.'
                }
            ]
        },
        'e-leave.html': {
            title: 'My Leave & Requests',
            color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
            steps: [
                '<strong>Check Balances:</strong> View remaining Annual, Sick, and Personal leave days in the progress cards at the top.',
                '<strong>Create Request:</strong> Click the "+ Create Request" button. Fill the form; the system automatically skips weekends and holidays.',
                '<strong>OT Requests:</strong> Submit Overtime (OT) hours for work done outside normal hours. Approved OT hours can be tracked or converted to compensatory leave.',
                '<strong>Manage History:</strong> Search past requests. You can edit/cancel requests that are still in "Pending" status.',
                '<strong>View Details:</strong> Click the arrow (>) on any request to view its full details and attachments.'
            ]
        },
        'approvals.html': {
            title: 'Leave Approvals (Manager)',
            color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
            steps: [
                '<strong>Dashboard Stats:</strong> View total pending actions, approved requests today, and team activity logs.',
                '<strong>Overlap Warning:</strong> The system automatically warns you if other team members are off during the requested period.',
                '<strong>Review Request:</strong> Click the arrow (>) on a pending request to open the review modal, add comments, and Approve/Reject (works for both leaves and OT requests).',
                '<strong>Filters:</strong> Search team requests by name, date range, status, or leave type.'
            ]
        },
        'yearly-holidays.html': {
            title: 'Yearly Holidays Calendar',
            color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
            steps: [
                '<strong>Holiday List:</strong> View all official company holidays listed by year.',
                '<strong>Auto Calculations:</strong> These dates are automatically excluded when the system calculates requested leave days.',
                '<strong>Admin Management:</strong> Users with HR or Admin roles can add, edit, or delete holiday entries.'
            ]
        },
        'company-events.html': {
            title: 'Company Events Calendar',
            color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
            steps: [
                '<strong>Events Tracking:</strong> Monitor scheduled company gatherings, workshops, and internal activities.',
                '<strong>Leave Rules:</strong> Company events are working days. Requesting leave on an event day consumes your quota.',
                '<strong>Admin Management:</strong> HR and Admins can create and manage events from this calendar view.'
            ]
        },
        'employees.html': {
            title: 'Employee Directory',
            color: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
            steps: [
                '<strong>Search Colleagues:</strong> Browse employee cards, search by name, or filter by department/role.',
                '<strong>Onboard Staff:</strong> HR/Admins can click "Onboard Employee" to add records, join dates, and initial leave quotas.',
                '<strong>Edit Records:</strong> Admins can hover over card elements to access quick edit and delete options.'
            ]
        },
        'settings.html': {
            title: 'System Settings',
            color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
            steps: [
                '<strong>Preferences:</strong> Customize system theme and view organization profile metadata.',
                '<strong>Leave Rules:</strong> Configure settings, quotas, and rollover policies for each leave type.',
                '<strong>OT & Work Rules:</strong> Configure overtime multipliers, compensation options, and company working hours.',
                '<strong>Admin Tools:</strong> Configure integrations (SMTP, Line Notify), security session limits, and inspect audit logs.'
            ]
        },
        'guide.html': {
            title: 'Comprehensive User Guide',
            color: 'text-brand-accent bg-brand-accent/10 border-brand-accent/20',
            steps: [
                '<strong>Interactive Accordions:</strong> Click on any module title to expand and read full setup details.',
                '<strong>OT & Compensatory Policies:</strong> Learn how to calculate OT hours, request weekend shifts, and convert them to compensatory leave.',
                '<strong>Search Tips:</strong> Use this guide to quickly understand role roles, quota rules, and admin setup steps.'
            ]
        }
    };

    const currentGuide = guides[page] || guides['index.html'];

    const guideBtn = document.createElement('button');
    guideBtn.id = 'page-guide-btn';
    guideBtn.className = 'fixed bottom-6 left-20 md:left-22 z-50 glass w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all-smooth glass-hover text-brand-accent hover:text-white shadow-lg';
    guideBtn.innerHTML = '<i class="fa-solid fa-circle-question text-lg md:text-xl"></i>';
    guideBtn.title = 'Page Guide';
    document.body.appendChild(guideBtn);

    const modalHTML = `
        <div id="guideOverlay" class="fixed inset-0 z-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 bg-black/60 backdrop-blur-sm p-4">
            <div id="guideContainer" class="modal-glass w-full max-w-md rounded-[2.5rem] p-6 md:p-8 transform scale-95 opacity-0 transition-all duration-300 shadow-2xl relative border border-white/10 overflow-hidden">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-bold text-white flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center border ${currentGuide.color}">
                            <i class="fa-solid fa-circle-info"></i>
                        </div>
                        Page Guide
                    </h2>
                    <button type="button" id="closeGuideBtn" class="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                
                <div class="space-y-4 mb-2">
                    <h3 class="text-lg font-bold text-white mb-2 border-b border-white/5 pb-2">${currentGuide.title}</h3>
                    <ul class="space-y-3.5 text-gray-300 text-sm leading-relaxed">
                        ${currentGuide.steps.map(step => `
                            <li class="flex gap-3 items-start">
                                <span class="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 flex-shrink-0"></span>
                                <span>${step}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const overlay = document.getElementById('guideOverlay');
    const container = document.getElementById('guideContainer');
    const closeBtn = document.getElementById('closeGuideBtn');

    function openGuide() {
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            container.classList.remove('scale-95', 'opacity-0');
            container.classList.add('scale-100', 'opacity-100');
        }, 50);
    }

    function closeGuide() {
        container.classList.remove('scale-100', 'opacity-100');
        container.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            overlay.classList.add('opacity-0', 'pointer-events-none');
        }, 300);
    }

    guideBtn.addEventListener('click', openGuide);
    closeBtn.addEventListener('click', closeGuide);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeGuide();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    injectThemeToggle();
    injectPageGuide();
});
