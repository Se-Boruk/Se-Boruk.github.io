// Enhanced Language Toggle for PL/EN
document.getElementById('langToggle').addEventListener('click', () => {
    const currentLang = document.documentElement.lang;
    if (currentLang === 'en') {
      document.documentElement.lang = 'pl';
      const h1 = document.querySelector('h1');
      if (h1) h1.textContent = 'Witaj na moim portfolio';
      const introP = document.querySelector('#intro p');
      if (introP) introP.textContent = 'To jest krótki opis o mnie.';
    } else {
      document.documentElement.lang = 'en';
      const h1 = document.querySelector('h1');
      if (h1) h1.textContent = 'Website in Development';
      const introP = document.querySelector('#intro p');
      if (introP) introP.textContent = 'Welcome! This portfolio is currently under construction. Stay tuned for updates and exciting projects.';
    }
  });
  