import glob
import re

html_files = glob.glob('*.html')

toggle_script = """
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
                                // For range mode, if it's already selected and we click it, clear it.
                                setTimeout(() => { fp.clear(); }, 10);
                            }
                        }
                    });
                }
            }
        }, true); // use capturing phase to intercept before flatpickr does its own thing
    });
    </script>
</body>
"""

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Inject toggle script before </body> if not exists
    if '<!-- Global Toggle Clear Script -->' not in content:
        content = content.replace('</body>', toggle_script)

    # Replace custom-select logic
    old_select_logic = """                        const value = option.getAttribute('data-value');
                        display.textContent = option.textContent;
                        hiddenInput.value = value;
                        
                        options.forEach(opt => opt.classList.remove('selected'));
                        option.classList.add('selected');
                        select.classList.remove('open');
                        
                        if (hiddenInput.onchange) hiddenInput.onchange(new Event('change'));
                        hiddenInput.dispatchEvent(new Event('change'));"""
    
    new_select_logic = """                        const value = option.getAttribute('data-value');
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
                        hiddenInput.dispatchEvent(new Event('change'));"""
    
    content = content.replace(old_select_logic, new_select_logic)
    
    # Also refine dropdown UI CSS slightly
    old_dropdown_css = """        .custom-options {
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
        }"""
    
    new_dropdown_css = """        .custom-options {
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
        }"""
        
    old_dropdown_hover = """        .custom-option:hover {
            background: #1e293b;
        }"""
        
    new_dropdown_hover = """        .custom-option:hover {
            background: rgba(255, 255, 255, 0.08);
            color: #00d2ff;
        }"""

    content = content.replace(old_dropdown_css, new_dropdown_css)
    content = content.replace(old_dropdown_hover, new_dropdown_hover)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Injected global toggle clear script and updated dropdown CSS in all HTML files.")
