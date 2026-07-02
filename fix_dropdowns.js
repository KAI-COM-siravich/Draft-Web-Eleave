const fs = require('fs');

const files = fs.readdirSync('c:/Projects/Draft-Web-Eleave').filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = 'c:/Projects/Draft-Web-Eleave/' + file;
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Fix the broken CSS selector
    content = content.replace(/\.custom-options\.open\s*\{/g, '.custom-select.open ~ .custom-options {');
    
    // Now let's try to update the dropdown design as intended
    // The previous CSS had: background: #020817; /* Shadcn slate-950 */
    const oldDropdownCss = `        .custom-options {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin-top: 4px;
            background: #020817; /* Shadcn slate-950 */
            border: 1px solid #1e293b; /* Shadcn slate-800 */
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            z-index: 50;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            max-height: 250px;
            overflow-y: auto;
            padding: 0.25rem;
        }`;

    const newDropdownCss = `        .custom-options {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin-top: 8px;
            background: #040833; /* Darker to match brand */
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(16px);
            z-index: 50;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            max-height: 250px;
            overflow-y: auto;
            padding: 0.25rem;
        }`;

    content = content.replace(oldDropdownCss, newDropdownCss);
    
    const oldDropdownHover = `        .custom-option:hover, .custom-option.selected {
            background: #1e293b; /* bg-accent */
            color: #f8fafc; /* text-accent-foreground */
        }`;

    const newDropdownHover = `        .custom-option:hover, .custom-option.selected {
            background: rgba(255, 255, 255, 0.08);
            color: #00d2ff;
        }`;

    content = content.replace(oldDropdownHover, newDropdownHover);
    
    fs.writeFileSync(filePath, content, 'utf-8');
});

console.log("Fixed dropdown CSS selectors and updated dropdown styles.");
