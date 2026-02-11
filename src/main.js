document.addEventListener('DOMContentLoaded', () => {
  // --- Lógica del Asistente de WhatsApp ---
  const helper = document.getElementById('whatsappHelper');
  const heroSection = document.querySelector('.hero-section');
  const footer = document.querySelector('footer');

  if (helper && footer) {
    window.addEventListener('scroll', () => {
      const footerTop = footer.offsetTop;
      const scrollBottom = window.scrollY + window.innerHeight;

      if (heroSection) {
        // Lógica para el Index (basada en el Hero)
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom - 100 && scrollBottom < footerTop + 40) {
          helper.classList.remove('hidden');
        } else {
          helper.classList.add('hidden');
        }
      } else {
        // Lógica para Reservar Cita (solo ocultar en footer)
        if (scrollBottom > footerTop + 40) {
          helper.classList.add('hidden');
        } else {
          helper.classList.remove('hidden');
        }
      }
    });
  }

  // --- Lógica de Zoom en las Cards de Portafolio ---
  document.querySelectorAll('.btn-detail').forEach(button => {
    const card = button.closest('.card');
    if (!card) return;
    
    const img = card.querySelector('.card-img-top');
    if (!img) return;

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      img.classList.add('zoomed');
      card.classList.add('active-zoom');
    });

    button.addEventListener('mouseleave', () => {
      img.classList.remove('zoomed');
      card.classList.remove('active-zoom');
    });
  });

  // --- Lógica de Selector Personalizado (Dropdown) ---
  const customSelects = document.querySelectorAll('.custom-select-wrapper');
  customSelects.forEach(wrapper => {
    const dropdownItems = wrapper.querySelectorAll('.dropdown-item');
    const displaySpan = wrapper.querySelector('#selected-estilo');
    const hiddenInput = wrapper.querySelector('#hidden-estilo');

    dropdownItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const value = item.getAttribute('data-value');
        const text = item.textContent;

        // Actualizar UI
        if (displaySpan) displaySpan.textContent = text;
        if (hiddenInput) hiddenInput.value = value;
      });
    });
  });
});
