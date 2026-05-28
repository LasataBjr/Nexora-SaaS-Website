// ─── Navbar scroll effect ───────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

// ─── Mobile menu ────────────────────────────────────────────
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = menuBtn.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

// ─── Chart Tab Toggle ───────────────────────────────────────
  document.querySelectorAll('.ct').forEach(tab => {
    tab.addEventListener('click', function () {
      this.closest('.chart-tabs').querySelectorAll('.ct') // Find all tabs in the same chart-tabs container
      .forEach(t => t.classList.remove('active')); // Remove active from all tabs

      this.classList.add('active');

      // Animate bars with random variation for demo
      animateBars();
    });
  });

  function animateBars() {
    document.querySelectorAll('.bar:not(.bar-active)').forEach(bar => { // Only animate bars that are not active (for demo purposes)
      const h = Math.random() * 60 + 30; // Random height between 30% and 90% for demo
      bar.style.height = h + '%'; // Animate height change with a slight delay for staggered effect
    });
  }


//  ────────────── Billing Toggle  ──────────────

  const billingToggle = document.getElementById('billingToggle');
  const billMonthly = document.getElementById('billMonthly');
  const billAnnual = document.getElementById('billAnnual');
  let isAnnual = false;

  billingToggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    billingToggle.classList.toggle('on', isAnnual); // Visual toggle state if true then on is added otherwise removed
    billMonthly.classList.toggle('active', !isAnnual);  // Highlight active billing cycle for monthly
    billAnnual.classList.toggle('active', isAnnual); // Highlight active billing cycle for annual

    document.querySelectorAll('.price-amount').forEach(el => {  // Update all price amounts based on selected billing cycle
      const monthly = el.dataset.monthly;
      const annual = el.dataset.annual;
      const val = isAnnual ? annual : monthly;
      el.textContent = isNaN(val) ? val : `$${val}`; // If val is not a number (like "Custom") display as is, otherwise format as price with $
    });
  });

  billMonthly.addEventListener('click', () => {
    if (isAnnual) billingToggle.click();
  });

  billAnnual.addEventListener('click', () => {
    if (!isAnnual) billingToggle.click();
  });


//  ────────────── FAQ Accordion ──────────────

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));

  // Open clicked (if it was closed)
  if (!isOpen) item.classList.add('open');
}

// ─── Scroll Reveal ──────────────────────────────────────────
  const revealEls = document.querySelectorAll(
    '.feature-card, .pricing-card, .testi-card, .kpi-card, .dash-chart-card, .activity-table-wrap'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });

// ─── Dashboard Preview Tab Switching (Hero) ─────────────────
  document.querySelectorAll('.dp-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      this.closest('.dp-topbar').querySelectorAll('.dp-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

// ─── Live "tick" counter animation on KPI values ─────────────
  function animateCount(el, target, prefix = '', suffix = '') {
    const isNumber = !isNaN(target.replace(/[,$%]/g, ''));
    if (!isNumber) return;
    const numTarget = parseFloat(target.replace(/[,$]/g, ''));
    const isFloat = target.includes('.');
    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = numTarget * ease;
      const formatted = isFloat
        ? current.toFixed(1)
        : Math.floor(current).toLocaleString();

      el.textContent = prefix + formatted + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Trigger counters when dashboard comes into view
  const kpiSection = document.querySelector('.kpi-grid');
  if (kpiSection) {
    const kpiObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const values = [
          ['284921', '$', ''],
          ['48301', '', ''],
          ['6.38', '', '%'],
          ['2.4', '', '%']
        ];
        document.querySelectorAll('.kpi-value').forEach((el, i) => {
          if (values[i]) animateCount(el, values[i][0], values[i][1], values[i][2]);
        });
        kpiObserver.disconnect();
      }
    }, { threshold: 0.3 });
    kpiObserver.observe(kpiSection);
  }

// ─── Subtle bar hover highlight in hero chart ───────────────
  document.querySelectorAll('.bar-wrap').forEach(wrap => {
    wrap.addEventListener('mouseenter', () => {
      wrap.querySelector('.bar').style.opacity = '0.8';
    });
    wrap.addEventListener('mouseleave', () => {
      wrap.querySelector('.bar').style.opacity = '';
    });
  });

  console.log('Nexora JS loaded');