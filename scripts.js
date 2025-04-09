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


document.addEventListener("DOMContentLoaded", function(){
  const copyIcons = document.querySelectorAll('.copy-icon');
  copyIcons.forEach(function(icon){
    // Store the original copy icon HTML so we can revert back
    const originalIconHTML = icon.innerHTML;
    
    icon.addEventListener('click', function(){
      const textToCopy = icon.getAttribute('data-copy');
      // Use the Clipboard API to copy text
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            // Replace the icon with the checkmark SVG
            icon.innerHTML = '<svg class="copy-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.5-1.5L9 16.2z"/></svg>';
            // Revert back after 1.5 seconds
            setTimeout(() => {
              icon.innerHTML = originalIconHTML;
            }, 1500);
          })
          .catch(err => {
            console.error('Error copying text: ', err);
          });
      } else {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.style.position = 'absolute';
        tempInput.style.left = '-9999px';
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        icon.innerHTML = '<svg class="copy-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.5-1.5L9 16.2z"/></svg>';
        setTimeout(() => {
          icon.innerHTML = originalIconHTML;
        }, 1500);
      }
    });
  });
});
