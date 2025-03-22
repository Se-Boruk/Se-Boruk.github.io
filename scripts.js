// Language Selector Dropdown Functionality with Persistence
document.querySelectorAll('.lang-selector').forEach(selector => {
    const currentLang = selector.querySelector('#currentLang');
    const dropdown = selector.querySelector('.lang-dropdown');
    
    // Load saved language from localStorage if available
    const savedLang = localStorage.getItem('selectedLang');
    if (savedLang) {
        if (savedLang === 'en') {
            currentLang.innerHTML = '🇺🇸 ENG';
        } else {
            currentLang.innerHTML = '🇵🇱 PL';
        }
        document.documentElement.lang = savedLang;
    }
    
    currentLang.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    dropdown.querySelectorAll('div').forEach(item => {
        item.addEventListener('click', () => {
            const selectedLang = item.getAttribute('data-lang');
            if(selectedLang === 'en'){
                currentLang.innerHTML = '🇺🇸 ENG';
            } else {
                currentLang.innerHTML = '🇵🇱 PL';
            }
            dropdown.style.display = 'none';
            document.documentElement.lang = selectedLang;
            localStorage.setItem('selectedLang', selectedLang);
        });
    });
});
// Hide dropdown when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.lang-dropdown').forEach(dropdown => {
        dropdown.style.display = 'none';
    });
});

// Brand Name Click: Redirect to Home
document.getElementById('brandName').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "index.html";
});

// Update Active Link in Sidebar on Projects Page (Click Only)
document.querySelectorAll('aside.toc ul li a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('aside.toc ul li a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});
