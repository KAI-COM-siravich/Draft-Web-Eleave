const fs = require('fs');

const file = 'c:/Projects/Draft-Web-Eleave/e-leave.html';
let content = fs.readFileSync(file, 'utf-8');

// 1. Create Button
content = content.replace(
    /<button class="glass px-8 py-4 rounded-2xl flex items-center justify-center gap-3 glass-hover bg-gradient-to-r from-brand-accent\/20 to-brand-secondary\/20 border-brand-accent\/30 hover:border-brand-accent shadow-\[0_0_20px_rgba\(0,210,255,0\.2\)\] hover:shadow-\[0_0_30px_rgba\(0,210,255,0\.4\)\] transition-all transform hover:scale-105">/,
    '<button onclick="openModal(\'create\')" class="glass px-8 py-4 rounded-2xl flex items-center justify-center gap-3 glass-hover bg-gradient-to-r from-brand-accent/20 to-brand-secondary/20 border-brand-accent/30 hover:border-brand-accent shadow-[0_0_20px_rgba(0,210,255,0.2)] hover:shadow-[0_0_30px_rgba(0,210,255,0.4)] transition-all transform hover:scale-105">'
);

// 2. Edit Button
content = content.replace(
    /<button class="w-7 h-7 rounded-full bg-white\/10 hover:bg-white\/20 text-white flex items-center justify-center transition-colors shadow-inner" title="Edit">/,
    '<button onclick="openModal(\'edit\', ${req.id})" class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shadow-inner" title="Edit">'
);

// 3. Cancel Button
content = content.replace(
    /<button class="w-7 h-7 rounded-full bg-red-500\/20 hover:bg-red-500\/40 text-red-400 flex items-center justify-center transition-colors shadow-inner" title="Cancel Request">/,
    '<button onclick="openModal(\'delete\', ${req.id})" class="w-7 h-7 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 flex items-center justify-center transition-colors shadow-inner" title="Cancel Request">'
);

// 4. View Button
content = content.replace(
    /<button class="text-gray-400 hover:text-white hover:bg-white\/10 w-7 h-7 rounded-full flex items-center justify-center transition-colors p-1" title="View Details">/,
    '<button onclick="openModal(\'view\', ${req.id})" class="text-gray-400 hover:text-white hover:bg-white/10 w-7 h-7 rounded-full flex items-center justify-center transition-colors p-1" title="View Details">'
);

const modalHTML = `
    <!-- Modal Overlay -->
    <div id="modalOverlay" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden opacity-0 transition-opacity duration-300 flex items-center justify-center p-4">
        <!-- Modal Content -->
        <div id="modalContainer" class="bg-[#0a1254]/95 border border-white/10 glass rounded-3xl p-6 md:p-8 max-w-md w-full transform scale-95 opacity-0 transition-all duration-300 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] relative overflow-hidden">
            <div class="absolute -right-20 -top-20 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none"></div>
            <div class="absolute -left-20 -bottom-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="relative z-10">
                <div class="flex justify-between items-center mb-6">
                    <h3 id="modalTitle" class="text-2xl font-bold text-white">Modal Title</h3>
                    <button onclick="closeModal()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                
                <div id="modalBody" class="text-gray-300 text-sm mb-8">
                    <!-- Dynamic Content -->
                </div>
                
                <div id="modalActions" class="flex justify-end gap-3 mt-6 pt-6 border-t border-white/10">
                    <!-- Dynamic Buttons -->
                </div>
            </div>
        </div>
    </div>

    <script>
    function openModal(action, id = null) {
        const overlay = document.getElementById('modalOverlay');
        const container = document.getElementById('modalContainer');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');
        const actions = document.getElementById('modalActions');
        
        // Find the request if ID provided
        const req = id ? requestsData.find(r => r.id === id) : null;
        
        if (action === 'create') {
            title.innerHTML = 'Create Leave Request';
            body.innerHTML = \`
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Leave Type</label>
                        <div class="relative">
                            <select class="w-full glass text-sm font-normal text-gray-200 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent appearance-none">
                                <option value="Annual Leave" class="bg-[#040833] text-white">Annual Leave</option>
                                <option value="Sick Leave" class="bg-[#040833] text-white">Sick Leave</option>
                                <option value="Personal Leave" class="bg-[#040833] text-white">Personal Leave</option>
                            </select>
                            <i class="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[12px] opacity-70"></i>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Dates</label>
                        <input type="text" placeholder="Select date range" class="w-full glass text-sm font-normal text-gray-200 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent placeholder-gray-500 date-picker-modal">
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Reason</label>
                        <input type="text" placeholder="E.g., Medical appointment" class="w-full glass text-sm font-normal text-gray-200 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent placeholder-gray-500">
                    </div>
                </div>
            \`;
            actions.innerHTML = \`
                <button onclick="closeModal()" class="px-5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-bold">Cancel</button>
                <button onclick="saveModal()" class="px-5 py-2.5 rounded-xl bg-brand-accent text-brand-dark font-bold text-sm hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,210,255,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">Submit Request</button>
            \`;
            
            setTimeout(() => {
                flatpickr(".date-picker-modal", {
                    mode: "range",
                    dateFormat: "M j, Y",
                    disableMobile: "true",
                    static: true,
                    monthSelectorType: "static",
                    nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>',
                    prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>'
                });
            }, 100);
            
        } else if (action === 'edit' && req) {
            title.innerHTML = 'Edit Leave Request';
            body.innerHTML = \`
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Leave Type</label>
                        <input type="text" value="\${req.type}" disabled class="w-full glass text-sm font-normal text-gray-400 py-3 px-4 rounded-xl outline-none border border-white/5 bg-white/5 cursor-not-allowed">
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Reason</label>
                        <input type="text" value="\${req.reason}" class="w-full glass text-sm font-normal text-gray-200 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent">
                    </div>
                </div>
            \`;
            actions.innerHTML = \`
                <button onclick="closeModal()" class="px-5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-bold">Cancel</button>
                <button onclick="saveModal()" class="px-5 py-2.5 rounded-xl bg-brand-accent text-brand-dark font-bold text-sm hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,210,255,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">Save Changes</button>
            \`;
        } else if (action === 'view' && req) {
            title.innerHTML = 'Leave Details';
            body.innerHTML = \`
                <div class="flex flex-col gap-4">
                    <div class="flex items-center gap-4 mb-2">
                        <div class="w-12 h-12 rounded-xl bg-\${req.color}-500/20 text-\${req.color}-400 flex items-center justify-center text-xl">
                            <i class="fa-solid \${req.icon}"></i>
                        </div>
                        <div>
                            <h4 class="text-white font-bold text-lg">\${req.type}</h4>
                            <span class="inline-flex items-center gap-1.5 border px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider \${statusStyleMap[req.status]} mt-1">
                                \${statusIconMap[req.status]} \${req.status}
                            </span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="glass p-3 rounded-xl border border-white/5">
                            <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Date</p>
                            <p class="text-sm text-gray-200 font-medium">\${req.dateStr}</p>
                        </div>
                        <div class="glass p-3 rounded-xl border border-white/5">
                            <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Duration</p>
                            <p class="text-sm text-gray-200 font-medium">\${req.days} Day(s)</p>
                        </div>
                    </div>
                    <div class="glass p-3 rounded-xl border border-white/5">
                        <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Reason</p>
                        <p class="text-sm text-gray-200 font-medium">\${req.reason}</p>
                    </div>
                </div>
            \`;
            actions.innerHTML = \`
                <button onclick="closeModal()" class="px-5 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-colors w-full border border-white/10">Close</button>
            \`;
        } else if (action === 'delete' && req) {
            title.innerHTML = 'Cancel Request?';
            body.innerHTML = \`
                <div class="text-center py-4">
                    <div class="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-3xl mx-auto mb-4 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <p class="text-gray-300 text-sm">Are you sure you want to cancel your <strong class="text-white">\${req.type}</strong> request for <strong class="text-white">\${req.dateStr}</strong>? This action cannot be undone.</p>
                </div>
            \`;
            actions.innerHTML = \`
                <button onclick="closeModal()" class="px-5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-bold w-1/2">Keep it</button>
                <button onclick="saveModal()" class="px-5 py-2.5 rounded-xl bg-red-500/80 text-white font-bold text-sm hover:bg-red-500 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)] w-1/2">Yes, Cancel</button>
            \`;
        }
    
        overlay.classList.remove('hidden');
        // small delay for transition
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
            container.classList.remove('scale-95', 'opacity-0');
        }, 10);
    }
    
    function closeModal() {
        const overlay = document.getElementById('modalOverlay');
        const container = document.getElementById('modalContainer');
        
        overlay.classList.add('opacity-0');
        container.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
    }
    
    function saveModal() {
        const btn = document.querySelector('#modalActions button:last-child');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
        btn.disabled = true;
        
        setTimeout(() => {
            closeModal();
            setTimeout(() => renderTable(), 300); // refresh table effect
        }, 800);
    }
    
    // Close modal on outside click
    document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
        if (e.target === document.getElementById('modalOverlay')) {
            closeModal();
        }
    });
    </script>
`;

if (!content.includes('id="modalOverlay"')) {
    content = content.replace('</body>', modalHTML + '\n</body>');
}

fs.writeFileSync(file, content, 'utf-8');
console.log("Modals added to e-leave.html");
