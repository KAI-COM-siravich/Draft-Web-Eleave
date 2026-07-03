const fs = require('fs');
let html = fs.readFileSync('company-events.html', 'utf8');

html = html.replace(
    `<input type="hidden" id="holType" value="Company Event" required>\r\n                    </div>\r\n                    </div>`,
    `<input type="hidden" id="holType" value="Company Event" required>\r\n                    </div>`
);

// Fallback just in case it uses \n instead of \r\n
html = html.replace(
    `<input type="hidden" id="holType" value="Company Event" required>\n                    </div>\n                    </div>`,
    `<input type="hidden" id="holType" value="Company Event" required>\n                    </div>`
);

fs.writeFileSync('company-events.html', html);
console.log('Fixed double div.');
