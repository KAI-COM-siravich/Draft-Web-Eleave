const fs = require('fs');
let demoJs = fs.readFileSync('demo_mode.js', 'utf8');

// Fix saveCompanyProfile
demoJs = demoJs.replace(
    "const tagline = document.getElementById('cp-input-tagline').value || 'Innovation and Excellence';",
    "const tagline = document.getElementById('cp-input-tagline').value;"
);

// Fix loadCompanyProfile
const oldLoadTagline = "if (els.tagline) els.tagline.innerHTML = profile.tagline;";
const newLoadTagline = `if (els.tagline) {
            els.tagline.innerHTML = profile.tagline || '';
            els.tagline.style.display = profile.tagline ? '' : 'none';
        }`;

demoJs = demoJs.replace(oldLoadTagline, newLoadTagline);

const oldInputTagline = "if (els.inputTagline) els.inputTagline.value = profile.tagline;";
const newInputTagline = "if (els.inputTagline) els.inputTagline.value = profile.tagline || '';";

demoJs = demoJs.replace(oldInputTagline, newInputTagline);

fs.writeFileSync('demo_mode.js', demoJs);
console.log("Fixed tagline to be optional.");
