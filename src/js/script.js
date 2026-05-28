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