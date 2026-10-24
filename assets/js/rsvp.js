/* Static demo only: validate locally and open thank-you.html.
   No RSVP data is transmitted or saved. Add a real backend for registrations. */
(() => {
  'use strict';

  const form = document.querySelector('#rsvp-form');
  if (!form) return;

  const feedback = document.querySelector('#form-feedback');
  const nameField = form.querySelector('#guest-name');
  const companyField = form.querySelector('#guest-company');
  const whatsappField = form.querySelector('#guest-whatsapp');

  function error(message, field) {
    feedback.textContent = message;
    feedback.hidden = false;
    if (field) field.focus();
  }

  form.addEventListener('input', () => { feedback.hidden = true; });
  form.addEventListener('change', () => { feedback.hidden = true; });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    feedback.hidden = true;

    if (!form.reportValidity()) return;
    if (!nameField.value.trim()) {
      error('Please enter your name.', nameField);
      return;
    }
    if (!companyField.value.trim()) {
      error('Please enter your company.', companyField);
      return;
    }

    const phone = whatsappField.value.trim();
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 8 || digits.length > 15 || !/^[+\d\s()\-]+$/.test(phone)) {
      error('Enter a valid WhatsApp number with 8–15 digits.', whatsappField);
      return;
    }

    // Front-end only: navigate without sending personal data or using query strings.
    window.location.assign('./thank-you.html');
  });
})();
