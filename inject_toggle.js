const fs = require('fs');

const files = fs.readdirSync('c:/Projects/Draft-Web-Eleave').filter(f => f.endsWith('.html'));

const toggleScript = `
    <!-- Global Toggle Clear Script -->
    <script>
    document.addEventListener('DOMContentLoaded', () => {
        // 1. Radio Buttons Toggle
        document.body.addEventListener('mousedown', (e) => {
            if (e.target.matches('input[type="radio"]')) {
                const radio = e.target;
                if (!radio.closest('form, #modalContainer, .modal')) {
                    radio.dataset.wasChecked = radio.checked;
                }
            }
        });
        
        document.body.addEventListener('click', (e) => {
            if (e.target.matches('input[type="radio"]')) {
                const radio = e.target;
                if (!radio.closest('form, #modalContainer, .modal')) {
                    if (radio.dataset.wasChecked === 'true') {
                        radio.checked = false;
                        radio.dataset.wasChecked = 'false';
                        radio.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }
            }
        });

        // 2. Flatpickr Click to Clear
        document.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('flatpickr-day') && (e.target.classList.contains('selected') || e.target.classList.contains('startRange') || e.target.classList.contains('endRange'))) {
                const openCalendar = e.target.closest('.flatpickr-calendar');
                if (openCalendar) {
                    document.querySelectorAll('.flatpickr-input, .date-picker, .date-picker-modal').forEach(input => {
                        const fp = input._flatpickr;
                        if (fp && fp.calendarContainer === openCalendar) {
                            if (!input.closest('form, #modalContainer, .modal')) {
                                setTimeout(() => { fp.clear(); }, 10);
                            }
                        }
                    });
                }
            }
        }, true);
    });
    </script>
</body>
`;

const oldSelectLogic = `                        const value = option.getAttribute('data-value');
                        display.textContent = option.textContent;
                        hiddenInput.value = value;
                        
                        options.forEach(opt => opt.classList.remove('selected'));
                        option.classList.add('selected');
                        select.classList.remove('open');
                        
                        if (hiddenInput.onchange) hiddenInput.onchange(new Event('change'));
                        hiddenInput.dispatchEvent(new Event('change'));`;

const newSelectLogic = `                        const value = option.getAttribute('data-value');
                        // TOGGLE CLEAR LOGIC
                        if (hiddenInput.value === value && value !== "" && !wrapper.closest('form, #modalContainer, .modal')) {
                            const defaultOpt = Array.from(options).find(opt => opt.getAttribute('data-value') === '');
                            display.textContent = defaultOpt ? defaultOpt.textContent : 'All';
                            hiddenInput.value = '';
                            options.forEach(opt => opt.classList.remove('selected'));
                            if (defaultOpt) defaultOpt.classList.add('selected');
                            select.classList.remove('open');
                            if (hiddenInput.onchange) hiddenInput.onchange(new Event('change'));
                            hiddenInput.dispatchEvent(new Event('change'));
                            return;
                        }
                        
                        display.textContent = option.textContent;
                        hiddenInput.value = value;
                        
                        options.forEach(opt => opt.classList.remove('selected'));
                        option.classList.add('selected');
                        select.classList.remove('open');
                        
                        if (hiddenInput.onchange) hiddenInput.onchange(new Event('change'));
                        hiddenInput.dispatchEvent(new Event('change'));`;

const oldDropdownCss = `        .custom-options {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin-top: 4px;
            background: #020817; /* Shadcn Dark */
            border: 1px solid #1e293b;
            border-radius: 12px;
            overflow: hidden;
            z-index: 50;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s ease;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
        }`;

const newDropdownCss = `        .custom-options {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin-top: 8px;
            background: #040833; /* Darker to match brand */
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            overflow: hidden;
            z-index: 50;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(16px);
        }`;

const oldDropdownHover = `        .custom-option:hover {
            background: #1e293b;
        }`;

const newDropdownHover = `        .custom-option:hover {
            background: rgba(255, 255, 255, 0.08);
            color: #00d2ff;
        }`;

files.forEach(file => {
    const filePath = 'c:/Projects/Draft-Web-Eleave/' + file;
    let content = fs.readFileSync(filePath, 'utf-8');
    
    if (!content.includes('<!-- Global Toggle Clear Script -->')) {
        content = content.replace('</body>', toggleScript);
    }
    
    content = content.replace(oldSelectLogic, newSelectLogic);
    content = content.replace(oldDropdownCss, newDropdownCss);
    content = content.replace(oldDropdownHover, newDropdownHover);
    
    fs.writeFileSync(filePath, content, 'utf-8');
});

console.log("Injected global toggle clear script and updated dropdown CSS in all HTML files.");
