const fs = require('fs');

const file = 'c:/Projects/Draft-Web-Eleave/e-leave.html';
let content = fs.readFileSync(file, 'utf-8');

// The replacement for Create action
const createReplacement = `
        if (action === 'create') {
            container.classList.remove('max-w-md');
            container.classList.add('max-w-4xl'); // 4xl is better for 2 columns
            
            title.innerHTML = 'Create Leave Request';
            body.innerHTML = \`
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Role -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</label>
                        <p class="text-white font-medium text-sm">Developer Engineer</p>
                    </div>
                    
                    <!-- Department -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Department</label>
                        <p class="text-white font-medium text-sm">Engineer</p>
                    </div>

                    <!-- Leave Type -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1"><span class="text-red-500">*</span> Leave Type</label>
                        <div class="relative">
                            <select class="w-full glass text-sm font-normal text-gray-200 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent appearance-none cursor-pointer">
                                <option value="" disabled selected class="bg-[#040833] text-gray-400">Select Leave Type</option>
                                <option value="Annual Leave" class="bg-[#040833] text-white">Annual Leave</option>
                                <option value="Sick Leave" class="bg-[#040833] text-white">Sick Leave</option>
                                <option value="Personal Leave" class="bg-[#040833] text-white">Personal Leave</option>
                            </select>
                            <i class="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[12px] opacity-70"></i>
                        </div>
                    </div>

                    <!-- Manager's Email -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Manager's Email</label>
                        <p class="text-white font-medium text-sm">Netcube AutoSync</p>
                    </div>

                    <!-- Duration Radios -->
                    <div class="flex flex-col gap-3 md:col-span-2 mt-2">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1"><span class="text-red-500">*</span> Duration</label>
                        <div class="flex items-center gap-6">
                            <label class="flex items-center gap-2 cursor-pointer group">
                                <input type="radio" name="duration" value="All Day" class="hidden peer" checked>
                                <div class="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center group-hover:border-brand-accent peer-checked:border-brand-accent transition-colors relative">
                                    <div class="w-2 h-2 rounded-full bg-brand-accent opacity-0 peer-checked:opacity-100 transition-opacity absolute inset-0 m-auto"></div>
                                </div>
                                <span class="text-sm text-gray-200 group-hover:text-white peer-checked:text-white transition-colors font-medium">All Day</span>
                            </label>
                            
                            <label class="flex items-center gap-2 cursor-pointer group">
                                <input type="radio" name="duration" value="Morning" class="hidden peer">
                                <div class="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center group-hover:border-brand-accent peer-checked:border-brand-accent transition-colors relative">
                                    <div class="w-2 h-2 rounded-full bg-brand-accent opacity-0 peer-checked:opacity-100 transition-opacity absolute inset-0 m-auto"></div>
                                </div>
                                <span class="text-sm text-gray-200 group-hover:text-white peer-checked:text-white transition-colors font-medium">Morning</span>
                            </label>
                            
                            <label class="flex items-center gap-2 cursor-pointer group">
                                <input type="radio" name="duration" value="Afternoon" class="hidden peer">
                                <div class="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center group-hover:border-brand-accent peer-checked:border-brand-accent transition-colors relative">
                                    <div class="w-2 h-2 rounded-full bg-brand-accent opacity-0 peer-checked:opacity-100 transition-opacity absolute inset-0 m-auto"></div>
                                </div>
                                <span class="text-sm text-gray-200 group-hover:text-white peer-checked:text-white transition-colors font-medium">Afternoon</span>
                            </label>
                        </div>
                    </div>

                    <!-- Start Date -->
                    <div class="flex flex-col gap-1.5 mt-2">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1"><span class="text-red-500">*</span> Leave Start Date</label>
                        <div class="relative">
                            <input type="text" placeholder="Pls Select" class="w-full glass text-sm font-normal text-gray-200 py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent placeholder-gray-500 date-picker-modal cursor-pointer">
                            <div class="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0a1254] border border-brand-accent/30 rounded-md p-1.5 pointer-events-none">
                                <i class="fa-solid fa-calendar-day text-brand-accent text-[12px]"></i>
                            </div>
                        </div>
                    </div>

                    <!-- End Date -->
                    <div class="flex flex-col gap-1.5 mt-2">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1"><span class="text-red-500">*</span> Leave End Date</label>
                        <div class="relative">
                            <input type="text" placeholder="Pls Select" class="w-full glass text-sm font-normal text-gray-200 py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent placeholder-gray-500 date-picker-modal cursor-pointer">
                            <div class="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0a1254] border border-brand-accent/30 rounded-md p-1.5 pointer-events-none">
                                <i class="fa-solid fa-calendar-day text-brand-accent text-[12px]"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Number Of Leave Days -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1"><span class="text-red-500">*</span> Number Of Leave Days</label>
                        <input type="number" step="0.5" value="0.5" class="w-full glass text-sm font-normal text-gray-200 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent">
                    </div>

                    <div class="hidden md:block"></div>

                    <!-- Reason -->
                    <div class="flex flex-col gap-1.5 md:col-span-1">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1"><span class="text-red-500">*</span> Reason</label>
                        <textarea rows="4" class="w-full h-full glass text-sm font-normal text-gray-200 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent resize-none"></textarea>
                    </div>

                    <!-- Attachments -->
                    <div class="flex flex-col gap-1.5 md:col-span-1">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Attachments</label>
                        <div class="w-full h-full min-h-[104px] glass rounded-xl border border-white/10 border-dashed flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-white/5 transition-colors">
                            <p class="text-sm text-gray-400 mb-2">There is nothing attached.</p>
                            <div class="flex items-center gap-2 text-brand-accent text-sm font-medium hover:text-brand-secondary transition-colors">
                                <i class="fa-solid fa-paperclip"></i>
                                <span>Attach file</span>
                            </div>
                        </div>
                    </div>
                </div>
            \`;
            actions.innerHTML = \`
                <button onclick="closeModal()" class="px-8 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors text-sm font-bold">CANCEL</button>
                <button onclick="saveModal()" class="px-8 py-3 rounded-xl bg-brand-accent text-brand-dark font-bold text-sm hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,210,255,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">SAVE</button>
            \`;
            
            setTimeout(() => {
                // Initialize separate flatpickr instances since there are two inputs now (Start and End)
                flatpickr(".date-picker-modal", {
                    dateFormat: "M j, Y",
                    disableMobile: "true",
                    static: true,
                    monthSelectorType: "static",
                    nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>',
                    prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>'
                });
            }, 100);
            
        } else if`;

content = content.replace(/if\s*\(action === 'create'\)\s*\{[\s\S]*?\} else if/, createReplacement);

// We need to also add class resets for the other actions to ensure the modal shrinks back
content = content.replace(
    /(action === 'edit' && req\) {)/,
    "$1\n            container.classList.remove('max-w-4xl');\n            container.classList.add('max-w-md');"
);
content = content.replace(
    /(action === 'view' && req\) {)/,
    "$1\n            container.classList.remove('max-w-4xl');\n            container.classList.add('max-w-md');"
);
content = content.replace(
    /(action === 'delete' && req\) {)/,
    "$1\n            container.classList.remove('max-w-4xl');\n            container.classList.add('max-w-md');"
);

fs.writeFileSync(file, content, 'utf-8');
console.log("Updated Create Modal.");
