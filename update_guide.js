const fs = require('fs');

const filePath = 'c:/Projects/Draft-Web-Eleave/guide.html';
let content = fs.readFileSync(filePath, 'utf-8');

const newGuideContent = `        <!-- Accordion List -->
        <div class="flex flex-col gap-4" id="guideList">
            
            <!-- Item 1: Home Dashboard -->
            <div class="glass rounded-2xl overflow-hidden glass-hover guide-item">
                <button onclick="toggleAccordion(this)" class="w-full flex items-center justify-between p-6 text-left focus:outline-none group">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent">
                            <i class="fa-solid fa-house"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white group-hover:text-brand-accent transition-colors guide-title">Home Dashboard (Overview)</h3>
                    </div>
                    <i class="fa-solid fa-chevron-down text-gray-500 transition-transform duration-300 chevron"></i>
                </button>
                <div class="accordion-content bg-black/20 border-t border-white/5">
                    <div class="p-6 pt-4 text-gray-300 text-sm leading-relaxed">
                        <p class="mb-3">The <strong>Home Dashboard</strong> is the central hub of the E-Leave system. From here, you can navigate to all other modules:</p>
                        <ul class="list-disc pl-5 space-y-2 text-brand-accent/90 font-medium">
                            <li><span class="text-gray-300 font-normal"><strong>Role Selection:</strong> Use the Demo Role Switcher at the bottom to preview the system as an Employee, Manager, HR, or Admin.</span></li>
                            <li><span class="text-gray-300 font-normal"><strong>Quick Actions:</strong> Click the "Leave Management" card to request leave, or "Manager Approvals" if you have a team.</span></li>
                            <li><span class="text-gray-300 font-normal"><strong>Bottom Dock:</strong> Navigate quickly to Settings, Directory, Holidays, or this Guide using the glassmorphism dock at the bottom of the screen.</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Item 2: My Leave -->
            <div class="glass rounded-2xl overflow-hidden glass-hover guide-item">
                <button onclick="toggleAccordion(this)" class="w-full flex items-center justify-between p-6 text-left focus:outline-none group">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                            <i class="fa-solid fa-plane-departure"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white group-hover:text-purple-400 transition-colors guide-title">My Leave & Requests</h3>
                    </div>
                    <i class="fa-solid fa-chevron-down text-gray-500 transition-transform duration-300 chevron"></i>
                </button>
                <div class="accordion-content bg-black/20 border-t border-white/5">
                    <div class="p-6 pt-4 text-gray-300 text-sm leading-relaxed">
                        <p class="mb-3">The <strong>My Leave</strong> page allows you to manage your personal time off:</p>
                        <ol class="list-decimal pl-5 space-y-2 text-purple-400/90 font-medium">
                            <li><span class="text-gray-300 font-normal"><strong>Check Balances:</strong> View your remaining Annual, Sick, and Personal leave days at the top of the page.</span></li>
                            <li><span class="text-gray-300 font-normal"><strong>Create Request:</strong> Click the "+ Create Request" button, fill out the form, select dates (system automatically skips weekends and holidays), and click Save.</span></li>
                            <li><span class="text-gray-300 font-normal"><strong>Manage History:</strong> Use the filters to find past requests. You can edit or cancel requests that are still in "Pending" status.</span></li>
                            <li><span class="text-gray-300 font-normal"><strong>View Details:</strong> Click the arrow icon on any Approved or Rejected request to view its full details and attachments.</span></li>
                        </ol>
                    </div>
                </div>
            </div>

            <!-- Item 3: Manager Approvals -->
            <div class="glass rounded-2xl overflow-hidden glass-hover guide-item">
                <button onclick="toggleAccordion(this)" class="w-full flex items-center justify-between p-6 text-left focus:outline-none group">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                            <i class="fa-solid fa-check-double"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white group-hover:text-orange-400 transition-colors guide-title">Manager Approvals</h3>
                    </div>
                    <i class="fa-solid fa-chevron-down text-gray-500 transition-transform duration-300 chevron"></i>
                </button>
                <div class="accordion-content bg-black/20 border-t border-white/5">
                    <div class="p-6 pt-4 text-gray-300 text-sm leading-relaxed">
                        <p class="mb-3">The <strong>Manager Approvals</strong> page is dedicated to Team Leads and Managers:</p>
                        <ul class="list-disc pl-5 space-y-2 text-orange-400/90 font-medium">
                            <li><span class="text-gray-300 font-normal"><strong>Pending Actions:</strong> Review incoming requests from your subordinates.</span></li>
                            <li><span class="text-gray-300 font-normal"><strong>Approve/Reject:</strong> Click on a pending request to open the review modal. You can leave comments before approving or rejecting the request.</span></li>
                            <li><span class="text-gray-300 font-normal"><strong>Team History:</strong> Filter through all past requests from your team by Department, Status, or Leave Type to monitor team availability.</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Item 4: Yearly Holidays -->
            <div class="glass rounded-2xl overflow-hidden glass-hover guide-item">
                <button onclick="toggleAccordion(this)" class="w-full flex items-center justify-between p-6 text-left focus:outline-none group">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <i class="fa-regular fa-calendar-check"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors guide-title">Yearly Holidays</h3>
                    </div>
                    <i class="fa-solid fa-chevron-down text-gray-500 transition-transform duration-300 chevron"></i>
                </button>
                <div class="accordion-content bg-black/20 border-t border-white/5">
                    <div class="p-6 pt-4 text-gray-300 text-sm leading-relaxed">
                        <p class="mb-3">The <strong>Yearly Holidays</strong> page outlines all official company holidays:</p>
                        <ul class="list-disc pl-5 space-y-2 text-emerald-400/90 font-medium">
                            <li><span class="text-gray-300 font-normal"><strong>Filter by Year & Location:</strong> Easily find holidays relevant to your specific branch or region.</span></li>
                            <li><span class="text-gray-300 font-normal"><strong>Automated Calculations:</strong> These holidays are automatically excluded when you request a leave that spans across these dates.</span></li>
                            <li><span class="text-gray-300 font-normal"><strong>Admin Controls:</strong> HR and Admins can add, edit, or delete upcoming holidays from this page.</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- Item 5: Employee Directory -->
            <div class="glass rounded-2xl overflow-hidden glass-hover guide-item">
                <button onclick="toggleAccordion(this)" class="w-full flex items-center justify-between p-6 text-left focus:outline-none group">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white group-hover:text-pink-400 transition-colors guide-title">Employee Directory</h3>
                    </div>
                    <i class="fa-solid fa-chevron-down text-gray-500 transition-transform duration-300 chevron"></i>
                </button>
                <div class="accordion-content bg-black/20 border-t border-white/5">
                    <div class="p-6 pt-4 text-gray-300 text-sm leading-relaxed">
                        <p class="mb-3">The <strong>Directory</strong> is where you can find contact details for your colleagues:</p>
                        <ul class="list-disc pl-5 space-y-2 text-pink-400/90 font-medium">
                            <li><span class="text-gray-300 font-normal"><strong>Search Colleagues:</strong> Search by name, email, or filter by Department/Role.</span></li>
                            <li><span class="text-gray-300 font-normal"><strong>HR Management:</strong> HR personnel can use the "Onboard Employee" button to add new staff, assign leave quotas, and set managers.</span></li>
                            <li><span class="text-gray-300 font-normal"><strong>Edit Records:</strong> Admins can hover over an employee card to access quick edit and delete tools.</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Item 6: Settings -->
            <div class="glass rounded-2xl overflow-hidden glass-hover guide-item">
                <button onclick="toggleAccordion(this)" class="w-full flex items-center justify-between p-6 text-left focus:outline-none group">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <i class="fa-solid fa-gear"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors guide-title">System Settings</h3>
                    </div>
                    <i class="fa-solid fa-chevron-down text-gray-500 transition-transform duration-300 chevron"></i>
                </button>
                <div class="accordion-content bg-black/20 border-t border-white/5">
                    <div class="p-6 pt-4 text-gray-300 text-sm leading-relaxed">
                        <p class="mb-3">The <strong>Settings</strong> page allows you to personalize your E-Leave experience:</p>
                        <ul class="list-disc pl-5 space-y-2 text-blue-400/90 font-medium">
                            <li><span class="text-gray-300 font-normal"><strong>General Preferences:</strong> Change display language and time zone settings.</span></li>
                            <li><span class="text-gray-300 font-normal"><strong>Notifications:</strong> Enable or disable Email, In-App, and Line Notify alerts for leave approvals.</span></li>
                            <li><span class="text-gray-300 font-normal"><strong>Appearance:</strong> Toggle between Dark Mode and Light Mode themes.</span></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>`;

content = content.replace(/<!-- Accordion List -->[\s\S]*?(?=<div class="mt-12 text-center">)/, newGuideContent + '\n\n        ');
fs.writeFileSync(filePath, content, 'utf-8');
console.log('Guide updated successfully.');
