const fs = require('fs');
const file = 'c:/Projects/Draft-Web-Eleave/e-leave.html';
let content = fs.readFileSync(file, 'utf-8');

// Replace Edit Modal
const editReplacement = `        } else if (action === 'edit' && req) {
            container.classList.remove('max-w-md');
            container.classList.add('max-w-4xl');
            title.innerHTML = 'Edit Leave Request';
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
                            <select class="w-full glass text-sm font-normal text-gray-200 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent appearance-none cursor-pointer" disabled>
                                <option value="\${req.type}" selected class="bg-[#040833] text-white">\${req.type}</option>
                            </select>
                            <i class="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-[12px] opacity-70"></i>
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
                            <label class="flex items-center gap-2 cursor-pointer group opacity-50 cursor-not-allowed">
                                <input type="radio" name="duration_edit" value="All Day" class="hidden peer" checked disabled>
                                <div class="w-4 h-4 rounded-full border border-brand-accent flex items-center justify-center relative">
                                    <div class="w-2 h-2 rounded-full bg-brand-accent transition-opacity"></div>
                                </div>
                                <span class="text-sm text-white transition-colors font-medium">All Day</span>
                            </label>
                        </div>
                    </div>

                    <!-- Start Date -->
                    <div class="flex flex-col gap-1.5 mt-2">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1"><span class="text-red-500">*</span> Leave Start Date</label>
                        <div class="relative">
                            <input type="text" value="\${req.dateStr}" disabled class="w-full glass text-sm font-normal text-gray-500 py-3 pl-4 pr-10 rounded-xl outline-none border border-white/5 bg-white/5 cursor-not-allowed">
                            <div class="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0a1254] border border-white/10 rounded-md p-1.5 pointer-events-none">
                                <i class="fa-solid fa-calendar-day text-gray-500 text-[12px]"></i>
                            </div>
                        </div>
                    </div>

                    <!-- End Date -->
                    <div class="flex flex-col gap-1.5 mt-2">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1"><span class="text-red-500">*</span> Leave End Date</label>
                        <div class="relative">
                            <input type="text" value="\${req.dateStr}" disabled class="w-full glass text-sm font-normal text-gray-500 py-3 pl-4 pr-10 rounded-xl outline-none border border-white/5 bg-white/5 cursor-not-allowed">
                            <div class="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0a1254] border border-white/10 rounded-md p-1.5 pointer-events-none">
                                <i class="fa-solid fa-calendar-day text-gray-500 text-[12px]"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Number Of Leave Days -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1"><span class="text-red-500">*</span> Number Of Leave Days</label>
                        <input type="text" value="\${req.days}" disabled class="w-full glass text-sm font-bold text-gray-500 py-3 px-4 rounded-xl outline-none border border-white/5 bg-white/5 cursor-not-allowed">
                    </div>

                    <div class="hidden md:block"></div>

                    <!-- Reason -->
                    <div class="flex flex-col gap-1.5 md:col-span-1">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1"><span class="text-red-500">*</span> Reason</label>
                        <textarea rows="4" class="w-full h-full glass text-sm font-normal text-gray-200 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent resize-none">\${req.reason}</textarea>
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
                <button onclick="saveModal()" class="px-8 py-3 rounded-xl bg-brand-accent text-brand-dark font-bold text-sm hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,210,255,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">SAVE CHANGES</button>
            \`;`;

// Replace View Modal
const viewReplacement = `        } else if (action === 'view' && req) {
            container.classList.remove('max-w-md');
            container.classList.add('max-w-4xl');
            title.innerHTML = 'Leave Details';
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
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Leave Type</label>
                        <div class="relative">
                            <select class="w-full glass text-sm font-normal text-gray-400 py-3 px-4 rounded-xl outline-none border border-white/5 bg-white/5 appearance-none cursor-not-allowed" disabled>
                                <option value="\${req.type}" selected class="bg-[#040833] text-white">\${req.type}</option>
                            </select>
                        </div>
                    </div>

                    <!-- Manager's Email -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Manager's Email</label>
                        <p class="text-white font-medium text-sm">Netcube AutoSync</p>
                    </div>

                    <!-- Status -->
                    <div class="flex flex-col gap-1.5 md:col-span-2 mt-2">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</label>
                        <div>
                            <span class="inline-flex items-center gap-1.5 border px-3 py-1 rounded text-xs font-bold uppercase tracking-wider \${statusStyleMap[req.status]} mt-1">
                                \${statusIconMap[req.status]} \${req.status}
                            </span>
                        </div>
                    </div>

                    <!-- Start Date -->
                    <div class="flex flex-col gap-1.5 mt-2">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Leave Start Date</label>
                        <div class="relative">
                            <input type="text" value="\${req.dateStr}" disabled class="w-full glass text-sm font-normal text-gray-400 py-3 pl-4 pr-10 rounded-xl outline-none border border-white/5 bg-white/5 cursor-not-allowed">
                            <div class="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0a1254] border border-white/10 rounded-md p-1.5 pointer-events-none">
                                <i class="fa-solid fa-calendar-day text-gray-500 text-[12px]"></i>
                            </div>
                        </div>
                    </div>

                    <!-- End Date -->
                    <div class="flex flex-col gap-1.5 mt-2">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Leave End Date</label>
                        <div class="relative">
                            <input type="text" value="\${req.dateStr}" disabled class="w-full glass text-sm font-normal text-gray-400 py-3 pl-4 pr-10 rounded-xl outline-none border border-white/5 bg-white/5 cursor-not-allowed">
                            <div class="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0a1254] border border-white/10 rounded-md p-1.5 pointer-events-none">
                                <i class="fa-solid fa-calendar-day text-gray-500 text-[12px]"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Number Of Leave Days -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Number Of Leave Days</label>
                        <input type="text" value="\${req.days}" disabled class="w-full glass text-sm font-bold text-gray-400 py-3 px-4 rounded-xl outline-none border border-white/5 bg-white/5 cursor-not-allowed">
                    </div>

                    <div class="hidden md:block"></div>

                    <!-- Reason -->
                    <div class="flex flex-col gap-1.5 md:col-span-1">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Reason</label>
                        <textarea rows="4" disabled class="w-full h-full glass text-sm font-normal text-gray-400 py-3 px-4 rounded-xl outline-none border border-white/5 bg-white/5 resize-none cursor-not-allowed">\${req.reason}</textarea>
                    </div>

                    <!-- Attachments -->
                    <div class="flex flex-col gap-1.5 md:col-span-1">
                        <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Attachments</label>
                        <div class="w-full h-full min-h-[104px] glass rounded-xl border border-white/5 border-dashed flex flex-col items-center justify-center p-4 text-center cursor-not-allowed bg-white/5">
                            <p class="text-sm text-gray-500 mb-2">There is nothing attached.</p>
                            <div class="flex items-center gap-2 text-gray-500 text-sm font-medium">
                                <i class="fa-solid fa-paperclip"></i>
                                <span>No file</span>
                            </div>
                        </div>
                    </div>
                </div>
            \`;
            actions.innerHTML = \`
                <button onclick="closeModal()" class="px-8 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-colors border border-white/10">CLOSE</button>
            \`;`;

const editRegex = /} else if \(action === 'edit' && req\) \{[\s\S]*?(?=} else if \(action === 'view' && req\))/;
const viewRegex = /} else if \(action === 'view' && req\) \{[\s\S]*?(?=} else if \(action === 'delete' && req\))/;

content = content.replace(editRegex, editReplacement + '\n        ');
content = content.replace(viewRegex, viewReplacement + '\n        ');

fs.writeFileSync(file, content, 'utf-8');
console.log('e-leave.html modals updated.');
