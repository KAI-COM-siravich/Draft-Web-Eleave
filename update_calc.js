const fs = require('fs');
const file = 'c:/Projects/Draft-Web-Eleave/e-leave.html';
let content = fs.readFileSync(file, 'utf-8');

// Add IDs and onchange events to inputs in the create modal HTML
content = content.replace(
    /<input type="radio" name="duration" value="All Day" class="hidden peer" checked>/,
    '<input type="radio" name="duration" value="All Day" class="hidden peer duration-radio" checked onchange="calculateLeaveDays()">'
);
content = content.replace(
    /<input type="radio" name="duration" value="Morning" class="hidden peer">/,
    '<input type="radio" name="duration" value="Morning" class="hidden peer duration-radio" onchange="calculateLeaveDays()">'
);
content = content.replace(
    /<input type="radio" name="duration" value="Afternoon" class="hidden peer">/,
    '<input type="radio" name="duration" value="Afternoon" class="hidden peer duration-radio" onchange="calculateLeaveDays()">'
);

content = content.replace(
    /<input type="text" placeholder="Pls Select" class="w-full glass text-sm font-normal text-gray-200 py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent\/50 transition-all border border-white\/10 bg-transparent placeholder-gray-500 date-picker-modal cursor-pointer">/,
    '<input type="text" id="leaveStartDate" placeholder="Pls Select" class="w-full glass text-sm font-normal text-gray-200 py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent placeholder-gray-500 date-picker-modal cursor-pointer">'
);

// We need to replace the second one for End Date
content = content.replace(
    /<input type="text" placeholder="Pls Select" class="w-full glass text-sm font-normal text-gray-200 py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent\/50 transition-all border border-white\/10 bg-transparent placeholder-gray-500 date-picker-modal cursor-pointer">/,
    '<input type="text" id="leaveEndDate" placeholder="Pls Select" class="w-full glass text-sm font-normal text-gray-200 py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all border border-white/10 bg-transparent placeholder-gray-500 date-picker-modal cursor-pointer">'
);

// Update Number Of Leave Days to have ID and be readonly
content = content.replace(
    /<input type="number" step="0.5" value="0.5" class="w-full glass text-sm font-normal text-gray-200 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent\/50 transition-all border border-white\/10 bg-transparent">/,
    '<input type="number" step="0.5" id="leaveDaysNum" value="0" readonly class="w-full glass text-sm font-bold text-white py-3 px-4 rounded-xl outline-none border border-white/5 bg-white/5 cursor-not-allowed">'
);

// Update Flatpickr Initialization inside openModal to trigger onChange
const oldFlatpickr = `                flatpickr(".date-picker-modal", {
                    dateFormat: "M j, Y",
                    disableMobile: "true",
                    static: true,
                    monthSelectorType: "static",
                    nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>',
                    prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>'
                });`;

const newFlatpickr = `                flatpickr(".date-picker-modal", {
                    dateFormat: "M j, Y",
                    disableMobile: "true",
                    static: true,
                    monthSelectorType: "static",
                    nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>',
                    prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>',
                    onChange: function(selectedDates, dateStr, instance) {
                        calculateLeaveDays();
                    }
                });`;

content = content.replace(oldFlatpickr, newFlatpickr);


// Add the calculateLeaveDays function to the script
const jsCode = `
    const companyHolidays = [
        "2025-01-01", // New Year
        "2025-04-13", "2025-04-14", "2025-04-15", // Songkran
        "2025-05-01", // Labor Day
        "2025-10-23", // Chulalongkorn Day
        "2025-12-05", // Father's Day
        "2025-12-31"  // New Year's Eve
    ];

    function calculateLeaveDays() {
        const startInput = document.getElementById('leaveStartDate');
        const endInput = document.getElementById('leaveEndDate');
        const daysInput = document.getElementById('leaveDaysNum');
        
        if (!startInput || !endInput || !daysInput) return;
        
        const startStr = startInput.value;
        const endStr = endInput.value;
        
        if (!startStr || !endStr) {
            daysInput.value = "0";
            return;
        }

        const start = new Date(startStr);
        const end = new Date(endStr);
        
        if (end < start) {
            daysInput.value = "0";
            return;
        }

        // Get selected duration
        let durationMultiplier = 1;
        const selectedDuration = document.querySelector('.duration-radio:checked')?.value;
        if (selectedDuration === 'Morning' || selectedDuration === 'Afternoon') {
            durationMultiplier = 0.5;
        }

        let validDays = 0;
        let currentDate = new Date(start);

        while (currentDate <= end) {
            const dayOfWeek = currentDate.getDay();
            // Skip weekends (0 = Sunday, 6 = Saturday)
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                // Format date as YYYY-MM-DD
                const yyyy = currentDate.getFullYear();
                const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
                const dd = String(currentDate.getDate()).padStart(2, '0');
                const formattedDate = \`\${yyyy}-\${mm}-\${dd}\`;
                
                // Skip company holidays
                if (!companyHolidays.includes(formattedDate)) {
                    validDays++;
                }
            }
            // Move to next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        const totalDays = validDays * durationMultiplier;
        daysInput.value = totalDays;
    }
`;

if (!content.includes('function calculateLeaveDays()')) {
    content = content.replace('// Close modal on outside click', jsCode + '\n    // Close modal on outside click');
}

fs.writeFileSync(file, content, 'utf-8');
console.log("Updated Logic.");
