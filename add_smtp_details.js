const fs = require('fs');

let settingsHtml = fs.readFileSync('settings.html', 'utf8');

const oldEmailGrid = `<div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">SMTP Server</label>
                                    <input type="text" value="smtp.mailgun.org" class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-400 transition-colors">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Port</label>
                                    <input type="text" value="587" class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-400 transition-colors">
                                </div>
                            </div>`;

const newEmailGrid = `<div class="space-y-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">SMTP Server</label>
                                        <input type="text" value="smtp.mailgun.org" class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Port</label>
                                        <input type="text" value="587" class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors">
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Username</label>
                                        <input type="text" value="postmaster@yourdomain.com" class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Password</label>
                                        <input type="password" value="****************" class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors">
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Sender Email (From)</label>
                                        <input type="text" value="no-reply@yourdomain.com" class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Encryption</label>
                                        <select class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors appearance-none">
                                            <option value="tls" selected>TLS</option>
                                            <option value="ssl">SSL</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                            </div>`;

settingsHtml = settingsHtml.replace(oldEmailGrid, newEmailGrid);

fs.writeFileSync('settings.html', settingsHtml);
console.log('Added detailed SMTP fields');
