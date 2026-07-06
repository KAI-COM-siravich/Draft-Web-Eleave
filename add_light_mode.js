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
body.light-theme .bg-emerald-500\\\\/20 {
    background-color: #d1fae5 !important;
}
body.light-theme .bg-yellow-500\\\\/20 {
    background-color: #fef3c7 !important;
}
body.light-theme .bg-orange-500\\\\/20 {
    background-color: #ffedd5 !important;
}
body.light-theme .bg-purple-500\\\\/20 {
    background-color: #f3e8ff !important;
}
body.light-theme .bg-blue-500\\\\/20 {
    background-color: #dbeafe !important;
}
body.light-theme .bg-red-500\\\\/20 {
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
body.light-theme #viewModalContent .bg-\\\\[\\\\#040833\\\\]\\\\/90,
body.light-theme #viewModalContent .bg-black\\\\/20,
body.light-theme #modalActionButtons {
    background-color: #f9fafb !important;
    border-color: rgba(0, 0, 0, 0.08) !important;
}

/* Toggle Switch bg */
body.light-theme .bg-black\\\\/40 {
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
body.light-theme .bg-\\\\[\\\\#040833\\\\] .text-white,
body.light-theme .bg-\\\\[\\\\#040833\\\\] span,
body.light-theme #viewAvatar,
body.light-theme #cp-logo-badge {
    color: #ffffff !important;
}

/* --- Flatpickr Light Mode (Shadcn Style) --- */
body.light-theme .flatpickr-calendar {
    background: #ffffff !important;
    border: 1px solid #e2e8f0 !important; /* สีขอบเทาอ่อน */
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
}
body.light-theme .flatpickr-months .flatpickr-month,
body.light-theme .flatpickr-current-month {
    color: #0f172a !important;
    fill: #0f172a !important;
}
body.light-theme .flatpickr-current-month input.cur-year {
    color: #0f172a !important; /* แก้เลขปีให้เป็นสีดำ */
}
body.light-theme .flatpickr-prev-month, 
body.light-theme .flatpickr-next-month {
    color: #0f172a !important; /* แก้สีลูกศร */
    border-color: #e2e8f0 !important;
}
body.light-theme .flatpickr-prev-month:hover, 
body.light-theme .flatpickr-next-month:hover {
    background: #f1f5f9 !important; /* พื้นหลังลูกศรตอน Hover */
    color: #0f172a !important;
}
body.light-theme span.flatpickr-weekday {
    color: #64748b !important; /* สีชื่อวัน จ.-อา. */
}
body.light-theme .flatpickr-day {
    color: #0f172a !important;
}
body.light-theme .flatpickr-day:hover {
    background: #f1f5f9 !important; /* สีพื้นหลังตอน Hover วันที่ */
    color: #0f172a !important;
}
body.light-theme .flatpickr-day.selected {
    background: #0284c7 !important; /* สีแบรนด์ตอนเลือกวันที่ */
    color: #ffffff !important;
}
body.light-theme .flatpickr-day.today {
    background: #f1f5f9 !important;
    color: #0f172a !important;
}
body.light-theme .flatpickr-day.prevMonthDay, 
body.light-theme .flatpickr-day.nextMonthDay {
    color: #94a3b8 !important; /* สีของวันที่เดือนก่อน/หน้าให้จางลง */
}
body.light-theme .bg-brand-dark\\\\/60 {
    background-color: rgba(255, 255, 255, 0.6) !important;
    border-color: rgba(0, 0, 0, 0.08) !important;
}
body.light-theme .border-brand-accent {
    border-color: #0284c7 !important;
}/* 1. แก้ปัญหา Custom Dropdown ที่ยังเป็นสีมืด */
body.light-theme .custom-options {
    background: #ffffff !important;
    border-color: rgba(0, 0, 0, 0.1) !important;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
}
body.light-theme .custom-option {
    color: #1f2937 !important;
}
body.light-theme .custom-option:hover, 
body.light-theme .custom-option.selected {
    background: rgba(0, 0, 0, 0.05) !important;
    color: #0284c7 !important;
}

/* 2. บังคับ Specificity ให้ Input และ Custom Select ชนะคลาส .glass */
body.light-theme input.glass, 
body.light-theme select.glass, 
body.light-theme textarea.glass,
body.light-theme .custom-select.glass {
    background-color: #ffffff !important;
    border-color: rgba(0, 0, 0, 0.15) !important;
    color: #111827 !important;
}
/* สไตล์สำหรับช่องที่ถูก Disabled (View/Edit Modal) */
body.light-theme input:disabled, 
body.light-theme textarea:disabled,
body.light-theme .custom-select.disabled {
    background-color: #f3f4f6 !important;
    color: #6b7280 !important;
    cursor: not-allowed !important;
}

/* 3. แก้กล่อง Icon Datepicker ที่ Hardcode สี bg-[#0a1254] เอาไว้ */
body.light-theme .bg-\\[\\#0a1254\\] {
    background-color: #f3f4f6 !important;
    border-color: rgba(0, 0, 0, 0.1) !important;
}
body.light-theme .bg-\\[\\#0a1254\\] i {
    color: #0284c7 !important; /* เปลี่ยนสีไอคอนปฏิทินให้เข้ากับธีมสว่าง */
}

/* 4. แก้กรอบ Radio Button และเส้นประล้อมรอบ Attachments ให้มองเห็นชัดขึ้น */
body.light-theme .border-white\\/30 {
    border-color: rgba(0, 0, 0, 0.3) !important;
}
body.light-theme .border-dashed {
    border-color: rgba(0, 0, 0, 0.25) !important;
}
\`;
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

    const modalHTML = \`
        <div id="guideOverlay" class="fixed inset-0 z-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 bg-black/60 backdrop-blur-sm p-4">
            <div id="guideContainer" class="modal-glass w-full max-w-md rounded-[2.5rem] p-6 md:p-8 transform scale-95 opacity-0 transition-all duration-300 shadow-2xl relative border border-white/10 overflow-hidden">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-bold text-white flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center border \${currentGuide.color}">
                            <i class="fa-solid fa-circle-info"></i>
                        </div>
                        Page Guide
                    </h2>
                    <button type="button" id="closeGuideBtn" class="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                
                <div class="space-y-4 mb-2">
                    <h3 class="text-lg font-bold text-white mb-2 border-b border-white/5 pb-2">\${currentGuide.title}</h3>
                    <ul class="space-y-3.5 text-gray-300 text-sm leading-relaxed">
                        \${currentGuide.steps.map(step => \`
                            <li class="flex gap-3 items-start">
                                <span class="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 flex-shrink-0"></span>
                                <span>\${step}</span>
                            </li>
                        \`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    \`;

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
`;

demoJs += '\n' + lightModeStylesAndLogic;

fs.writeFileSync('demo_mode.js', demoJs);
console.log('Light Mode support successfully appended to demo_mode.js');
