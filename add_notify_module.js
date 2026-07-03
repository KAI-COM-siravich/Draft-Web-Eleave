const fs = require('fs');

let settingsHtml = fs.readFileSync('settings.html', 'utf8');

// 1. Insert Card
const notifyCard = `
                <!-- Setting Card Notifications -->
                <div onclick="openSetting('notifications')" class="glass rounded-2xl p-6 transition-all-smooth hover:bg-white/5 group border border-white/5 cursor-pointer admin-only relative overflow-hidden">
                    <div class="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i class="fa-solid fa-bell text-8xl text-yellow-400"></i>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i class="fa-solid fa-bell text-yellow-400 text-xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors relative z-10">Notifications</h3>
                    <p class="text-gray-400 text-sm leading-relaxed mb-4 relative z-10">Manage Line Notify, Email alerts, and system notification rules.</p>
                    <div class="flex items-center text-yellow-400 text-sm font-medium gap-2 relative z-10">
                        Manage <i class="fa-solid fa-arrow-right text-xs"></i>
                    </div>
                    <div class="mt-4 inline-block px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] rounded uppercase font-bold tracking-wider relative z-10">Admin Only</div>
                </div>
`;
settingsHtml = settingsHtml.replace("<!-- Setting Card 4 -->", notifyCard + '\n                <!-- Setting Card 4 -->');

// 2. Insert Sidebar Nav
const notifyNav = `
                    <button onclick="switchTab('notifications')" id="nav-notifications" class="admin-only w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                        <i class="fa-solid fa-bell text-yellow-400 w-5 text-center"></i> Notifications
                    </button>
`;
settingsHtml = settingsHtml.replace('<button onclick="switchTab(\'integrations\')"', notifyNav + '                    <button onclick="switchTab(\'integrations\')"');

// 3. Insert Panel
const notifyPanel = `
                <!-- Notifications Panel -->
                <div id="panel-notifications" class="setting-panel hidden">
                    <div class="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                            <i class="fa-solid fa-bell text-yellow-400"></i> Notifications
                        </h2>
                    </div>
                    
                    <div class="space-y-6 max-w-2xl">
                        <!-- Line Notify -->
                        <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-[#00B900]/20 flex items-center justify-center">
                                        <i class="fa-brands fa-line text-[#00B900] text-xl"></i>
                                    </div>
                                    <div>
                                        <h3 class="text-white font-semibold">Line Notify</h3>
                                        <p class="text-xs text-gray-400">Send notifications to Line groups</p>
                                    </div>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" class="sr-only peer" checked>
                                    <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B900]"></div>
                                </label>
                            </div>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Line Token</label>
                                    <input type="password" value="*************************" class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#00B900] transition-colors">
                                </div>
                            </div>
                        </div>

                        <!-- Email Settings -->
                        <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <i class="fa-solid fa-envelope text-blue-400 text-xl"></i>
                                    </div>
                                    <div>
                                        <h3 class="text-white font-semibold">Email Alerts</h3>
                                        <p class="text-xs text-gray-400">Send standard email notifications</p>
                                    </div>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" class="sr-only peer" checked>
                                    <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                </label>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">SMTP Server</label>
                                    <input type="text" value="smtp.mailgun.org" class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-400 transition-colors">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Port</label>
                                    <input type="text" value="587" class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-400 transition-colors">
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex justify-end pt-2">
                            <button class="bg-yellow-400 hover:bg-yellow-500 text-brand-dark font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-[0_0_15px_rgba(250,204,21,0.3)]" onclick="showToast('Notification settings saved.', 'success')">Save Settings</button>
                        </div>
                    </div>
                </div>
`;
settingsHtml = settingsHtml.replace("<!-- 4. Integrations Panel -->", notifyPanel + '\n                <!-- 4. Integrations Panel -->');

// 4. Border color logic
const borderLogicTarget = "if(panelId === 'integrations') borderColor = 'border-orange-400';";
const borderLogicReplacement = "if(panelId === 'notifications') borderColor = 'border-yellow-400';\n                  " + borderLogicTarget;
settingsHtml = settingsHtml.replace(borderLogicTarget, borderLogicReplacement);

settingsHtml = settingsHtml.replace("'border-brand-accent', 'border-purple-400', 'border-green-400', 'border-orange-400', 'border-blue-400', 'border-pink-400'", "'border-brand-accent', 'border-purple-400', 'border-green-400', 'border-yellow-400', 'border-orange-400', 'border-blue-400', 'border-pink-400'");

fs.writeFileSync('settings.html', settingsHtml);
console.log('Notification module injected');
