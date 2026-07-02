const fs = require('fs');

const filePath = 'c:/Projects/Draft-Web-Eleave/e-leave.html';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Wrap the initialization logic into a global function
const oldInitLogic = `            // Init Custom Selects
            document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
                const select = wrapper.querySelector('.custom-select');
                const options = wrapper.querySelectorAll('.custom-option');
                const display = wrapper.querySelector('.selected-display');
                const hiddenInput = wrapper.querySelector('input[type="hidden"]');
                
                select.addEventListener('click', (e) => {
                    e.stopPropagation();
                    document.querySelectorAll('.custom-select.open').forEach(other => {
                        if (other !== select) other.classList.remove('open');
                    });
                    select.classList.toggle('open');
                });
                
                options.forEach(option => {
                    option.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const value = option.getAttribute('data-value');
                        // TOGGLE CLEAR LOGIC
                        if (hiddenInput.value === value && value !== "" && !wrapper.closest('form, #modalContainer, .modal')) {
                            const defaultOpt = Array.from(options).find(opt => opt.getAttribute('data-value') === '');
                            display.textContent = defaultOpt ? defaultOpt.textContent : 'All';
                            hiddenInput.value = '';
                            options.forEach(opt => opt.classList.remove('selected'));
                            if (defaultOpt) defaultOpt.classList.add('selected');
                            select.classList.remove('open');
                            if (hiddenInput.onchange) hiddenInput.onchange(new Event('change'));
                            hiddenInput.dispatchEvent(new Event('change'));
                            return;
                        }
                        
                        display.textContent = option.textContent;
                        hiddenInput.value = value;
                        
                        options.forEach(opt => opt.classList.remove('selected'));
                        option.classList.add('selected');
                        select.classList.remove('open');
                        
                        if (hiddenInput.onchange) hiddenInput.onchange(new Event('change'));
                        hiddenInput.dispatchEvent(new Event('change'));
                    });
                });
            });`;

const newInitLogic = `            // Init Custom Selects
            window.initCustomSelects = function(container = document) {
                container.querySelectorAll('.custom-select-wrapper:not(.initialized)').forEach(wrapper => {
                    wrapper.classList.add('initialized');
                    const select = wrapper.querySelector('.custom-select');
                    const options = wrapper.querySelectorAll('.custom-option');
                    const display = wrapper.querySelector('.selected-display');
                    const hiddenInput = wrapper.querySelector('input[type="hidden"]');
                    
                    if(select && !wrapper.classList.contains('disabled')) {
                        select.addEventListener('click', (e) => {
                            e.stopPropagation();
                            document.querySelectorAll('.custom-select.open').forEach(other => {
                                if (other !== select) other.classList.remove('open');
                            });
                            select.classList.toggle('open');
                        });
                    }
                    
                    if(options) {
                        options.forEach(option => {
                            option.addEventListener('click', (e) => {
                                e.stopPropagation();
                                const value = option.getAttribute('data-value');
                                // TOGGLE CLEAR LOGIC
                                if (hiddenInput.value === value && value !== "" && !wrapper.closest('form, #modalContainer, .modal')) {
                                    const defaultOpt = Array.from(options).find(opt => opt.getAttribute('data-value') === '');
                                    display.textContent = defaultOpt ? defaultOpt.textContent : 'All';
                                    hiddenInput.value = '';
                                    options.forEach(opt => opt.classList.remove('selected'));
                                    if (defaultOpt) defaultOpt.classList.add('selected');
                                    select.classList.remove('open');
                                    if (hiddenInput.onchange) hiddenInput.onchange(new Event('change'));
                                    hiddenInput.dispatchEvent(new Event('change'));
                                    return;
                                }
                                
                                display.textContent = option.textContent;
                                hiddenInput.value = value;
                                
                                options.forEach(opt => opt.classList.remove('selected'));
                                option.classList.add('selected');
                                select.classList.remove('open');
                                
                                if (hiddenInput.onchange) hiddenInput.onchange(new Event('change'));
                                hiddenInput.dispatchEvent(new Event('change'));
                            });
                        });
                    }
                });
            };
            window.initCustomSelects();`;
            
content = content.replace(oldInitLogic, newInitLogic);

// 2. Replace native <select> with custom-select in openModal for Create
const oldCreateDropdown = `<div class="relative">
                            <select class="w-full glass text-sm font-normal text-gray-200 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent appearance-none cursor-pointer">
                                <option value="" disabled selected class="bg-[#040833] text-gray-400">Select Leave Type</option>
                                <option value="Annual Leave" class="bg-[#040833] text-white">Annual Leave</option>
                                <option value="Sick Leave" class="bg-[#040833] text-white">Sick Leave</option>
                                <option value="Personal Leave" class="bg-[#040833] text-white">Personal Leave</option>
                            </select>
                            <i class="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[12px] opacity-70"></i>
                        </div>`;

const newCreateDropdown = `<div class="relative custom-select-wrapper z-[100]">
                            <div class="custom-select w-full glass text-sm font-normal text-gray-200 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent cursor-pointer relative">
                                <span class="selected-display truncate block text-gray-400">Select Leave Type</span>
                                <i class="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[12px] opacity-70 transition-transform duration-300"></i>
                            </div>
                            <input type="hidden" id="modalLeaveType" value="">
                            <div class="custom-options">
                                <div class="custom-option" data-value="Annual Leave">Annual Leave</div>
                                <div class="custom-option" data-value="Sick Leave">Sick Leave</div>
                                <div class="custom-option" data-value="Personal Leave">Personal Leave</div>
                            </div>
                        </div>`;
content = content.replace(oldCreateDropdown, newCreateDropdown);

// 3. Replace native <select> with custom-select in openModal for Edit
const oldEditDropdown = `<div class="relative">
                            <select class="w-full glass text-sm font-normal text-gray-200 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent appearance-none cursor-pointer" disabled>
                                <option value="\${req.type}" selected class="bg-[#040833] text-white">\${req.type}</option>
                            </select>
                            <i class="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-[12px] opacity-70"></i>
                        </div>`;
const newEditDropdown = `<div class="relative custom-select-wrapper disabled z-[100]">
                            <div class="w-full glass text-sm font-normal text-gray-400 py-3 px-4 rounded-xl outline-none border border-white/5 bg-white/5 relative">
                                <span class="selected-display truncate block">\${req.type}</span>
                                <i class="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-[12px] opacity-70 transition-transform duration-300"></i>
                            </div>
                            <input type="hidden" id="modalLeaveType" value="\${req.type}">
                        </div>`;
content = content.replace(oldEditDropdown, newEditDropdown);

// 4. Replace native <select> with custom-select in openModal for View
const oldViewDropdown = `<div class="relative">
                            <select class="w-full glass text-sm font-normal text-gray-400 py-3 px-4 rounded-xl outline-none border border-white/5 bg-white/5 appearance-none cursor-not-allowed" disabled>
                                <option value="\${req.type}" selected class="bg-[#040833] text-white">\${req.type}</option>
                            </select>
                        </div>`;
const newViewDropdown = `<div class="relative custom-select-wrapper disabled z-[100]">
                            <div class="w-full glass text-sm font-normal text-gray-400 py-3 px-4 rounded-xl outline-none border border-white/5 bg-white/5 relative">
                                <span class="selected-display truncate block">\${req.type}</span>
                            </div>
                        </div>`;
content = content.replace(oldViewDropdown, newViewDropdown);

// 5. Inject window.initCustomSelects(container) in the setTimeout
const oldSetTimeout = `            setTimeout(() => {
                // Initialize separate flatpickr instances since there are two inputs now (Start and End)
                flatpickr(".date-picker-modal", {`;
const newSetTimeout = `            setTimeout(() => {
                if(window.initCustomSelects) window.initCustomSelects(document.getElementById('modalContainer'));
                
                // Initialize separate flatpickr instances since there are two inputs now (Start and End)
                flatpickr(".date-picker-modal", {`;
content = content.replace(oldSetTimeout, newSetTimeout);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Updated dropdowns in modal forms.");
