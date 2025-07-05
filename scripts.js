document.querySelectorAll('.lang-selector').forEach(selector => {
  const currentLang = selector.querySelector('#currentLang');
  const dropdown = selector.querySelector('.lang-dropdown');

  function detectLang(path) {
    if (path.startsWith('/pl/')) return 'pl';
    if (path.startsWith('/cn/')) return 'cn';
    return 'en';
  }

  function updateLangDisplay(lang) {
    const flags = {
      en: '/assets/flags/en_flag.png',
      pl: '/assets/flags/pl_flag.png',
      cn: '/assets/flags/cn_flag.png'
    };
    const label = lang.toUpperCase();
    currentLang.innerHTML = `<img src="${flags[lang]}" alt="${label}" style="width:20px; height:14px; vertical-align:middle; margin-right:6px;"> ${label}`;
    document.documentElement.lang = lang;

    dropdown.querySelectorAll('div[data-lang]').forEach(item => {
      item.style.display = item.getAttribute('data-lang') === lang ? 'none' : 'block';
    });
  }

  const currentPath = window.location.pathname;
  const actualLang = detectLang(currentPath);
  let savedLang = localStorage.getItem('selectedLang') || actualLang;

  // Redirect to match savedLang if mismatch on initial load
  if (savedLang !== actualLang) {
    const parts = currentPath.split('/');
    const filename = parts.pop() || 'index.html';
    const redirectPath = (savedLang === 'en') ? `/${filename}` : `/${savedLang}/${filename}`;
    window.location.href = redirectPath;
    return;
  }

  // Apply language display
  localStorage.setItem('selectedLang', savedLang);
  updateLangDisplay(savedLang);

  // Dropdown toggle
  currentLang.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', () => {
    dropdown.style.display = 'none';
  });

  // On language change
  dropdown.querySelectorAll('div[data-lang]').forEach(item => {
    item.addEventListener('click', () => {
      const selectedLang = item.getAttribute('data-lang');
      if (selectedLang === savedLang) return;

      localStorage.setItem('selectedLang', selectedLang);
      updateLangDisplay(selectedLang);

      const parts = window.location.pathname.split('/');
      const filename = parts.pop() || 'index.html';
      const redirectPath = (selectedLang === 'en') ? `/${filename}` : `/${selectedLang}/${filename}`;
      window.location.href = redirectPath;
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
