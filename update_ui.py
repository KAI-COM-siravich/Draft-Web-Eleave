import re
import glob

with open('c:/Projects/Draft-Web-Eleave/e-leave.html', 'r', encoding='utf-8') as f:
    eleave = f.read()

match = re.search(r'(/\* --- Exact Shadcn UI Dark Mode Replica for Flatpickr --- \*/.*?)</style>', eleave, re.DOTALL)
if not match:
    print("Could not find CSS block in e-leave.html")
    exit(1)
perfect_css = match.group(1)

files_to_update = ['c:/Projects/Draft-Web-Eleave/approvals.html', 'c:/Projects/Draft-Web-Eleave/employees.html', 'c:/Projects/Draft-Web-Eleave/yearly-holidays.html']

for file in files_to_update:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace CSS block
    content = re.sub(r'        /\* Custom Dropdown.*?</style>', perfect_css + '</style>', content, flags=re.DOTALL)
    
    # Replace Dropdown HTML
    content = re.sub(
        r'class="custom-select w-full glass text-xs font-semibold text-gray-300 py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all flex items-center justify-between"',
        'class="custom-select w-full glass text-sm font-normal text-gray-200 py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all cursor-pointer border border-white/10 hover:bg-white/5 shadow-sm"',
        content
    )
    content = re.sub(
        r'<span class="selected-display truncate">',
        '<span class="selected-display truncate block">',
        content
    )
    content = re.sub(
        r'<i class="fa-solid fa-chevron-down text-brand-accent text-\[10px\] pointer-events-none transition-transform duration-300"></i>',
        '<i class="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[12px] opacity-70 transition-transform duration-300"></i>',
        content
    )
    
    # Replace Datepicker HTML (note: the HTML in other files might still have the calendar icon on the right, or it might be slightly different. Let's make it robust.)
    content = re.sub(
        r'<input type="text" id="([^"]+)" onchange="renderTable\(\)" placeholder="([^"]+)" class="w-full glass text-xs font-semibold text-gray-300 py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all date-picker cursor-pointer">\s*<i class="fa-solid fa-calendar-days text-brand-accent text-\[12px\] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300"></i>',
        r'<input type="text" id="\1" onchange="renderTable()" placeholder="Pick a date" class="w-full glass text-sm font-normal text-gray-200 py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all date-picker cursor-pointer border border-white/10 hover:bg-white/5 shadow-sm">\n                        <i class="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[12px] opacity-70 z-10"></i>',
        content
    )
    
    # Update Flatpickr JS options
    content = re.sub(
        r'flatpickr\("\.date-picker", {\s*dateFormat: "Y-m-d",\s*allowInput: true,\s*disableMobile: "true"\s*}\);',
        r'''flatpickr(".date-picker", {
                dateFormat: "M j, Y",
                allowInput: false,
                disableMobile: "true",
                static: true,
                monthSelectorType: "static",
                nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>',
                prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>'
            });''',
        content, flags=re.DOTALL
    )
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updates applied to all files.")
