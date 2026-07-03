const fs = require('fs');
let html = fs.readFileSync('company-events.html', 'utf8');

html = html.replace('Add Holiday</h2>', 'Add Event</h2>');
html = html.replace('Holiday Date</label>', 'Event Date</label>');
html = html.replace('Holiday Name</label>', 'Event Name</label>');
html = html.replace('about this holiday..."', 'about this event..."');
html = html.replace('>Holiday Name</h2>', '>Event Name</h2>');
html = html.replace('remove this holiday record?', 'remove this event record?');
html = html.replace('<!-- Public Holidays Section -->', '<!-- Company Events Section -->');
html = html.replace('// "Add Holiday" card', '// "Add Event" card');

fs.writeFileSync('company-events.html', html);
console.log('Fixed holiday text.');
