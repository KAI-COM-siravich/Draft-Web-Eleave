const fs = require('fs');

let settingsHtml = fs.readFileSync('settings.html', 'utf8');

// 1. Insert Card
const authCard = `
                <!-- Setting Card Authentication -->
                <div onclick="openSetting('authentication')" class="glass rounded-2xl p-6 transition-all-smooth hover:bg-white/5 group border border-white/5 cursor-pointer admin-only relative overflow-hidden">
                    <div class="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i class="fa-solid fa-fingerprint text-8xl text-indigo-400"></i>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i class="fa-solid fa-fingerprint text-indigo-400 text-xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors relative z-10">Authentication</h3>
                    <p class="text-gray-400 text-sm leading-relaxed mb-4 relative z-10">Configure Single Sign-On (SSO), LDAP, and Two-Factor Authentication.</p>
                    <div class="flex items-center text-indigo-400 text-sm font-medium gap-2 relative z-10">
                        Manage <i class="fa-solid fa-arrow-right text-xs"></i>
                    </div>
                    <div class="mt-4 inline-block px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] rounded uppercase font-bold tracking-wider relative z-10">Admin Only</div>
                </div>
`;
settingsHtml = settingsHtml.replace("<!-- Setting Card 5 -->", authCard + '\n                <!-- Setting Card 5 -->');

// 2. Insert Sidebar Nav
const authNav = `
                    <button onclick="switchTab('authentication')" id="nav-authentication" class="admin-only w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                        <i class="fa-solid fa-fingerprint text-indigo-400 w-5 text-center"></i> Authentication
                    </button>
`;
settingsHtml = settingsHtml.replace('<button onclick="switchTab(\'security\')"', authNav + '                    <button onclick="switchTab(\'security\')"');

// 3. Insert Panel
const authPanel = `
                <!-- Authentication Panel -->
                <div id="panel-authentication" class="setting-panel hidden">
                    <div class="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                            <i class="fa-solid fa-fingerprint text-indigo-400"></i> Authentication
                        </h2>
                    </div>
                    
                    <div class="space-y-6 w-full">
                        <!-- SSO Providers -->
                        <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 class="text-lg font-semibold text-white mb-4">Single Sign-On (SSO)</h3>
                            <div class="space-y-4">
                                <div class="flex items-center justify-between p-4 bg-brand-dark/50 border border-white/5 rounded-xl">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                            <i class="fa-brands fa-google text-white text-xl"></i>
                                        </div>
                                        <div>
                                            <h4 class="text-white font-medium">Google Workspace</h4>
                                            <p class="text-xs text-gray-400">Allow users to log in with their Google accounts</p>
                                        </div>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" class="sr-only peer" checked>
                                        <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                    </label>
                                </div>
                                <div class="flex items-center justify-between p-4 bg-brand-dark/50 border border-white/5 rounded-xl">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                            <i class="fa-brands fa-microsoft text-white text-xl"></i>
                                        </div>
                                        <div>
                                            <h4 class="text-white font-medium">Microsoft Entra ID</h4>
                                            <p class="text-xs text-gray-400">Allow users to log in with Microsoft 365</p>
                                        </div>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" class="sr-only peer">
                                        <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- 2FA Settings -->
                        <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                        <i class="fa-solid fa-shield-halved text-indigo-400 text-xl"></i>
                                    </div>
                                    <div>
                                        <h3 class="text-white font-semibold">Two-Factor Authentication (2FA)</h3>
                                        <p class="text-xs text-gray-400">Require 2FA for all administrator accounts</p>
                                    </div>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" class="sr-only peer" checked>
                                    <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                </label>
                            </div>
                        </div>
                        
                        <div class="flex justify-end pt-2">
                            <button class="bg-indigo-400 hover:bg-indigo-500 text-brand-dark font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-[0_0_15px_rgba(129,140,248,0.3)]" onclick="showToast('Authentication settings saved.', 'success')">Save Settings</button>
                        </div>
                    </div>
                </div>
`;
settingsHtml = settingsHtml.replace("<!-- 5. Security Panel -->", authPanel + '\n                <!-- 5. Security Panel -->');

// 4. Border color logic
const borderLogicTarget = "if(panelId === 'security') borderColor = 'border-blue-400';";
const borderLogicReplacement = "if(panelId === 'authentication') borderColor = 'border-indigo-400';\n                  " + borderLogicTarget;
settingsHtml = settingsHtml.replace(borderLogicTarget, borderLogicReplacement);

settingsHtml = settingsHtml.replace("'border-pink-400'", "'border-indigo-400', 'border-pink-400'");

fs.writeFileSync('settings.html', settingsHtml);
console.log('Authentication module injected');
