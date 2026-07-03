const fs = require('fs');
let html = fs.readFileSync('company-events.html', 'utf8');

// 1. Page Title
html = html.replace(/<title>.*?<\/title>/, '<title>Company Events - E-Leave</title>');
html = html.replace(/<h1[^>]*>Yearly Holidays<\/h1>/, '<h1 class="text-5xl md:text-6xl font-black text-white drop-shadow-lg">Company Events</h1>');

// 2. Section Header
html = html.replace(
    /Public Holidays\s*<\/h2>/,
    'Company Events\n        </h2>'
).replace(
    /bg-brand-accent\/20 flex items-center justify-center text-brand-accent/,
    'bg-purple-500/20 flex items-center justify-center text-purple-400'
).replace(
    /<i class="fa-solid fa-calendar-check"><\/i>/,
    '<i class="fa-solid fa-users"></i>'
);

// 3. Grid id & Filter logic
html = html.replace(/holidays-grid/g, 'events-grid');
html = html.replace(/h\.type === 'Public Holiday' \|\| h\.type === 'Long Weekend' \|\| h\.type === 'Special Observance'/g, "h.type === 'Company Event'");
// If it's yearly-holidays.html, the filter is: h => getYear(h.date) === selectedYear
// Let's enforce that for company events we filter by type Company Event:
html = html.replace(
    /const filteredHolidays = holidays\s*\.filter\(h => getYear\(h\.date\) === selectedYear\)/,
    `const filteredHolidays = holidays\n                .filter(h => getYear(h.date) === selectedYear && h.type === 'Company Event')`
);

// 4. Modal Titles
html = html.replace(
    /document\.getElementById\('modalTitle'\)\.textContent = id \? 'Edit Holiday Record' : 'Add New Holiday';/,
    `document.getElementById('modalTitle').textContent = id ? 'Edit Event' : 'Add New Event';`
);

// 5. Add Event Text on Card
html = html.replace(
    /Add Holiday<\/h3>/,
    'Add Event</h3>'
);

// 6. Holiday Type dropdown to hidden Company Event type
html = html.replace(
    /<div class="relative custom-select-wrapper">[\s\S]*?<label class="block text-\[11px\] font-bold text-gray-400 uppercase tracking-wider mb-2">Holiday Type<\/label>[\s\S]*?<input type="hidden" id="holType" value="Public Holiday" required>[\s\S]*?<\/div>\s*<\/div>/,
    `<div class="relative custom-select-wrapper" style="display: none;">
                        <label class="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Event Type</label>
                        <input type="hidden" id="holType" value="Company Event" required>
                    </div>`
);

// 7. Add Location Field and Event Name placeholder
html = html.replace(
    /id="holName"([^>]*)placeholder="e.g. New Year's Day"/,
    'id="holName"$1placeholder="e.g. Annual Townhall"'
);
html = html.replace(
    /<div class="md:col-span-2">\s*<label class="block text-\[11px\] font-bold text-gray-400 uppercase tracking-wider mb-2">Description \/ Notes<\/label>/,
    `<div class="md:col-span-2">
                        <label class="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Location / Google Maps URL</label>
                        <input type="text" id="holLocation" class="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none p-3 transition-all" placeholder="e.g. https://maps.app.goo.gl/... or 'Main Hall'">
                    </div>

                    <div class="md:col-span-2">
                        <label class="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Description / Notes</label>`
);

// 8. Save Button Text
html = html.replace(
    /Save Holiday Record<\/button>/,
    'Save Event</button>'
);

// 9. View Details Location Field
html = html.replace(
    /<span id="viewDepts"([^>]*)>\s*<i class="fa-solid fa-users text-brand-accent"><\/i> <span>--<\/span>\s*<\/span>\s*<\/div>\s*<\/div>/,
    `<span id="viewDepts"$1>
                                <i class="fa-solid fa-users text-brand-accent"></i> <span>--</span>
                            </span>
                        </div>
                        <div class="col-span-2">
                            <span class="block text-[10px] text-gray-400 uppercase tracking-widest mb-1">Location</span>
                            <div id="viewLocation" class="text-sm font-semibold text-white flex items-center gap-2 mt-1">
                                <i class="fa-solid fa-map-location-dot text-brand-accent"></i> <span class="text-gray-500">Not specified</span>
                            </div>
                        </div>
                    </div>`
);

html = html.replace(
    /Edit Holiday\s*<\/button>/,
    'Edit Event\n                    </button>'
);

// 10. Card Hover Action Google Map Icon
html = html.replace(
    /<!-- Hover Action Buttons -->\s*<div class="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">/,
    `<!-- Hover Action Buttons -->
                        <div class="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            \${hol.location && hol.location.startsWith('http') ? \`<a href="\${hol.location}" target="_blank" onclick="event.stopPropagation();" class="w-7 h-7 rounded-full bg-brand-accent/20 hover:bg-brand-accent/50 text-brand-accent hover:text-white flex items-center justify-center transition-colors backdrop-blur-md border border-brand-accent/30" title="Google Maps"><i class="fa-solid fa-map-location-dot text-[10px]"></i></a>\` : ''}`
);

// 11. JS logic (holLocation)
// openModal reset
html = html.replace(
    /document\.getElementById\('holId'\)\.value = '';/,
    `document.getElementById('holId').value = '';\n                document.getElementById('holLocation').value = '';`
);
// openModal bind
html = html.replace(
    /document\.getElementById\('holNotes'\)\.value = hol\.notes \|\| '';/,
    `document.getElementById('holNotes').value = hol.notes || '';\n                document.getElementById('holLocation').value = hol.location || '';`
);
// openViewModal render
html = html.replace(
    /document\.getElementById\('viewNotes'\)\.textContent = hol\.notes/,
    `let locHtml = '<span class="text-gray-500">Not specified</span>';
            if (hol.location) {
                if (hol.location.startsWith('http')) {
                    locHtml = \`<a href="\${hol.location}" target="_blank" class="text-brand-accent hover:underline flex items-center gap-1.5"><i class="fa-solid fa-map-location-dot"></i> View on Google Maps</a>\`;
                } else {
                    locHtml = \`<i class="fa-solid fa-map-location-dot text-brand-accent"></i> <span>\${hol.location}</span>\`;
                }
            }
            document.getElementById('viewLocation').innerHTML = locHtml;

            document.getElementById('viewNotes').textContent = hol.notes`
);
// saveHoliday get & set
html = html.replace(
    /const notes = document\.getElementById\('holNotes'\)\.value;/,
    `const notes = document.getElementById('holNotes').value;\n            const location = document.getElementById('holLocation').value;`
);
html = html.replace(
    /holidays\[index\] = { \.\.\.holidays\[index\], date, name, type, status, affectedDepts, notes };/,
    `holidays[index] = { ...holidays[index], date, name, type, status, affectedDepts, notes, location };`
);
html = html.replace(
    /holidays\.push\({ id: newId, date, name, type, status, affectedDepts, notes }\);/,
    `holidays.push({ id: newId, date, name, type, status, affectedDepts, notes, location });`
);

fs.writeFileSync('company-events.html', html);
console.log('company-events.html regenerated via robust JS script.');
