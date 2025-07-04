// Language Selector Dropdown Functionality with Persistence & Redirect
document.querySelectorAll('.lang-selector').forEach(selector => {
  const currentLang = selector.querySelector('#currentLang');
  const dropdown = selector.querySelector('.lang-dropdown');

  // Normalize path: treat '/' or '' as '/index.html' for consistency
  function normalizePath(path) {
    return (path === '' || path === '/') ? '/index.html' : path;
  }

  // Detect language by path prefix
  function detectLang(path) {
    return path.startsWith('/pl/') ? 'pl' : 'en';
  }

  // Update language display in selector and <html lang>
  function updateLangDisplay(lang) {
    if (lang === 'en') {
      currentLang.innerHTML = `<img src="/assets/flags/us_flag.png" alt="US" style="width:20px; height:14px; vertical-align:middle; margin-right:6px;"> EN`;
    } else {
      currentLang.innerHTML = `<img src="/assets/flags/pl_flag.png" alt="PL" style="width:20px; height:14px; vertical-align:middle; margin-right:6px;"> PL`;
    }
    document.documentElement.lang = lang;
  }

  // Rewrite nav links based on current language to avoid relative path issues
  function rewriteNavLinks(lang) {
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (lang === 'pl') {
        if (!href.startsWith('/pl/') && !href.startsWith('http') && !href.startsWith('#')) {
          link.setAttribute('href', '/pl/' + href);
        }
      } else {
        if (href.startsWith('/pl/')) {
          link.setAttribute('href', href.replace(/^\/pl\//, '/'));
        }
      }
    });
  }

  // Get current path and language info
  let currentPath = normalizePath(window.location.pathname);
  let actualLang = detectLang(currentPath);
  let savedLang = localStorage.getItem('selectedLang');

  // Fix mismatch between savedLang and actualLang by redirecting if necessary
  if (!savedLang) {
    // No savedLang yet, save current detected language
    localStorage.setItem('selectedLang', actualLang);
    savedLang = actualLang;
  } else if (savedLang !== actualLang) {
    // Redirect to keep URL and savedLang in sync
    if (savedLang === 'pl' && !currentPath.startsWith('/pl/')) {
      window.location.href = '/pl' + currentPath;
      return;
    } else if (savedLang === 'en' && currentPath.startsWith('/pl/')) {
      const newPath = currentPath.replace(/^\/pl/, '') || '/index.html';
      window.location.href = newPath;
      return;
    }
  }

  // Initial display update and nav link rewrite
  updateLangDisplay(savedLang);
  rewriteNavLinks(savedLang);

  // Toggle dropdown visibility on currentLang click
  currentLang.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });

  // Close dropdown if clicking outside
  document.addEventListener('click', () => {
    dropdown.style.display = 'none';
  });

  // Handle language selection clicks
  dropdown.querySelectorAll('div[data-lang]').forEach(item => {
    item.addEventListener('click', () => {
      const selectedLang = item.getAttribute('data-lang');

      if (selectedLang === savedLang) {
        dropdown.style.display = 'none';
        return;
      }

      localStorage.setItem('selectedLang', selectedLang);
      updateLangDisplay(selectedLang);
      rewriteNavLinks(selectedLang);
      dropdown.style.display = 'none';

      const path = normalizePath(window.location.pathname);

      if (selectedLang === 'pl') {
        if (path.startsWith('/pl/')) return;

        if (path === '/index.html') {
          window.location.href = '/pl/index.html';
          return;
        }
        window.location.href = '/pl' + path;
      } else {
        if (!path.startsWith('/pl/')) return;

        const newPath = path.replace(/^\/pl/, '') || '/index.html';
        window.location.href = newPath;
      }
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
