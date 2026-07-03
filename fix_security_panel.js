const fs = require('fs');

let settingsHtml = fs.readFileSync('settings.html', 'utf8');

const regex = /<div id="panel-security" class="setting-panel hidden">[\s\S]*?<!-- 6\. System Logs Panel -->/;

const newSecurityPanel = `<div id="panel-security" class="setting-panel hidden">
                    <div class="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                            <i class="fa-solid fa-shield-halved text-blue-400"></i> Security Settings
                        </h2>
                    </div>

                    <div class="space-y-6 w-full">
                        <!-- Access Control -->
                        <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 class="text-lg font-semibold text-white mb-4">Access Control</h3>
                            <div class="space-y-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm font-medium text-gray-200">Session Timeout</p>
                                        <p class="text-xs text-gray-400">Automatically logout after inactivity.</p>
                                    </div>
                                    <select onchange="showToast('Session Timeout updated.', 'success')" class="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-blue-400 transition-colors">
                                        <option>15 Minutes</option>
                                        <option selected>30 Minutes</option>
                                        <option>1 Hour</option>
                                        <option>Never</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- API Keys -->
                        <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <h3 class="text-lg font-semibold text-white">API Keys</h3>
                                    <p class="text-xs text-gray-400">Active API keys for external applications.</p>
                                </div>
                                <button onclick="generateApiKey()" class="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 text-sm font-medium px-4 py-2 rounded-xl transition-colors border border-blue-500/30">
                                    <i class="fa-solid fa-plus mr-1"></i> Generate New Key
                                </button>
                            </div>
                            
                            <div id="api-keys-list" class="space-y-3">
                                <!-- Rendered via JS -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 6. System Logs Panel -->`;

if (regex.test(settingsHtml)) {
    settingsHtml = settingsHtml.replace(regex, newSecurityPanel);
    fs.writeFileSync('settings.html', settingsHtml);
    console.log('Fixed Security Panel successfully');
} else {
    console.log('Could not find Security Panel');
}
