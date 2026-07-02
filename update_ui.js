const fs = require('fs');

const eLeaveContent = fs.readFileSync('c:/Projects/Draft-Web-Eleave/e-leave.html', 'utf-8');

const cssMatch = eLeaveContent.match(/(\/\* --- Exact Shadcn UI Dark Mode Replica for Flatpickr --- \*\/.+?)<\/style>/s);
if (!cssMatch) {
    console.error("Could not find CSS block in e-leave.html");
    process.exit(1);
}
const perfectCss = cssMatch[1];

const filesToUpdate = [
    'c:/Projects/Draft-Web-Eleave/approvals.html',
    'c:/Projects/Draft-Web-Eleave/employees.html',
    'c:/Projects/Draft-Web-Eleave/yearly-holidays.html'
];

filesToUpdate.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace CSS block
    content = content.replace(/\s*\/\*\s*(?:Custom Dropdown|--- Modern UI).*?<\/style>/s, '\n' + perfectCss + '</style>');
    // Let's also check if it uses .flatpickr-calendar.dark and replace that whole block if it exists
    content = content.replace(/\s*\.flatpickr-calendar\.dark\s*\{.*?\.custom-options::-webkit-scrollbar-thumb:hover\s*\{\s*background:[^}]+;\s*\}/s, '\n' + perfectCss);
    
    // Just replace from .flatpickr-calendar or /* Custom Dropdown ... down to end of style
    // Wait, the safest way is to just replace everything from `/* Custom Dropdown & Flatpickr Overrides */` or `/* Custom Dropdown...` to the end of style
    // We already did a simple replace above. Let's do a more robust one:
    // This removes the old custom dropdown css completely
    
    // Since some files had `.flatpickr-calendar.dark`, let's just forcefully replace the entire block from `/* Custom Dropdown` to `</style>`
    content = content.replace(/\s*\/\*\s*Custom Dropdown.+?<\/style>/s, '\n' + perfectCss + '</style>');

    // Replace Dropdown HTML
    content = content.replace(
        /class="custom-select w-full glass text-xs font-semibold text-gray-300 py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent\/50 transition-all flex items-center justify-between"/g,
        'class="custom-select w-full glass text-sm font-normal text-gray-200 py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all cursor-pointer border border-white/10 hover:bg-white/5 shadow-sm"'
    );
    content = content.replace(
        /<span class="selected-display truncate">/g,
        '<span class="selected-display truncate block">'
    );
    content = content.replace(
        /<i class="fa-solid fa-chevron-down text-brand-accent text-\[10px\] pointer-events-none transition-transform duration-300"><\/i>/g,
        '<i class="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[12px] opacity-70 transition-transform duration-300"></i>'
    );
    
    // Replace Datepicker HTML
    content = content.replace(
        /<input type="text" id="([^"]+)" onchange="renderTable\(\)" placeholder="([^"]+)" class="w-full glass text-xs font-semibold text-gray-300 py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent\/50 transition-all date-picker cursor-pointer">\s*<i class="fa-solid fa-calendar-days text-brand-accent text-\[12px\] absolute right-4 top-1\/2 -translate-y-1\/2 pointer-events-none transition-transform duration-300"><\/i>/g,
        '<input type="text" id="$1" onchange="renderTable()" placeholder="Pick a date" class="w-full glass text-sm font-normal text-gray-200 py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all date-picker cursor-pointer border border-white/10 hover:bg-white/5 shadow-sm">\n                        <i class="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[12px] opacity-70 z-10"></i>'
    );
    
    // Update Flatpickr JS options
    content = content.replace(
        /flatpickr\("\.date-picker", {\s*dateFormat: "Y-m-d",\s*allowInput: true,\s*disableMobile: "true"(.*?)\s*}\);/s,
        `flatpickr(".date-picker", {
                dateFormat: "M j, Y",
                allowInput: false,
                disableMobile: "true",
                static: true,
                monthSelectorType: "static",
                nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>',
                prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>'
            });`
    );
    
    fs.writeFileSync(file, content, 'utf-8');
});

console.log("Updates applied to all files.");
