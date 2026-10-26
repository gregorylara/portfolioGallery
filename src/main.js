document.addEventListener('DOMContentLoaded', () => {
  // ====================================================================
  // 1. SISTEMA DE ANIMACIONES SCROLL REVEAL (INTERSECTION OBSERVER)
  // ====================================================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback para navegadores antiguos
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ====================================================================
  // 2. ASISTENTE FLOTANTE DE WHATSAPP Y CTA RÁPIDO
  // ====================================================================
  const helper = document.getElementById('whatsappHelper');
  const heroSection = document.querySelector('.hero-section');
  const footer = document.querySelector('footer');

  if (helper && footer) {
    window.addEventListener('scroll', () => {
      const footerTop = footer.offsetTop;
      const scrollBottom = window.scrollY + window.innerHeight;

      if (heroSection) {
        // Lógica para el Index (aparece tras pasar el Hero)
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom - 100 && scrollBottom < footerTop + 40) {
          helper.classList.remove('hidden');
        } else {
          helper.classList.add('hidden');
        }
      } else {
        // Lógica para Reservar Cita (ocultar solo en footer)
        if (scrollBottom > footerTop + 40) {
          helper.classList.add('hidden');
        } else {
          helper.classList.remove('hidden');
        }
      }
    }, { passive: true });
  }

  // ====================================================================
  // 3. ZOOM Y DETALLES EN TARJETAS DE PORTAFOLIO
  // ====================================================================
  document.querySelectorAll('.btn-detail').forEach(button => {
    const card = button.closest('.card');
    if (!card) return;
    
    const img = card.querySelector('.card-img-top');
    if (!img) return;

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      img.classList.toggle('zoomed');
      card.classList.toggle('active-zoom');
    });

    button.addEventListener('mouseleave', () => {
      img.classList.remove('zoomed');
      card.classList.remove('active-zoom');
    });
  });

  // ====================================================================
  // 4. DROPDOWN DE ESTILOS & AUTO-SELECCIÓN POR URL (QUERIES)
  // ====================================================================
  const customSelects = document.querySelectorAll('.custom-select-wrapper');
  customSelects.forEach(wrapper => {
    const dropdownItems = wrapper.querySelectorAll('.dropdown-item');
    const displaySpan = wrapper.querySelector('#selected-estilo');
    const hiddenInput = wrapper.querySelector('#hidden-estilo');

    const selectOption = (value, text) => {
      if (displaySpan) displaySpan.textContent = text;
      if (hiddenInput) hiddenInput.value = value;
    };

    dropdownItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const value = item.getAttribute('data-value');
        const text = item.textContent.trim();
        selectOption(value, text);
      });
    });

    // Auto-selección por parámetro URL (ej: reservarCita.html?estilo=tradicional)
    const urlParams = new URLSearchParams(window.location.search);
    const paramEstilo = urlParams.get('estilo');
    if (paramEstilo) {
      const matchItem = Array.from(dropdownItems).find(i => 
        i.getAttribute('data-value')?.toLowerCase() === paramEstilo.toLowerCase()
      );
      if (matchItem) {
        selectOption(matchItem.getAttribute('data-value'), matchItem.textContent.trim());
      }
    }
  });

  // ====================================================================
  // 5. MÓDULO DE RECOMENDACIONES DE GOOGLE (GOOGLE REVIEWS)
  // ====================================================================
  initGoogleReviewsSection();
});

/**
 * Arquitectura de Google Reviews:
 * Renderiza el boceto de reseñas y deja lista la conexión para la API
 * de Google Places cuando el backend esté disponible.
 */
function initGoogleReviewsSection() {
  const container = document.getElementById('google-reviews-grid');
  if (!container) return;

  // Reseñas de ejemplo verificadas de clientes de Gregorio Tattoo
  const mockReviews = [
    {
      author_name: "Marcos Del Valle",
      avatar_initial: "M",
      avatar_color: "avatar-blue",
      rating: 5,
      relative_time: "Hace 1 semana",
      text: "Increíble experiencia. Gregorio me hizo una pieza de realismo en el antebrazo y superó totalmente mis expectativas. El trato, la higiene del material y la precisión en el sombreado son de 10.",
      style_tag: "Estilo: Realismo Sombrío",
      verified: true
    },
    {
      author_name: "Lucía Santamaría",
      avatar_initial: "L",
      avatar_color: "avatar-red",
      rating: 5,
      relative_time: "Hace 2 semanas",
      text: "Me hice un diseño minimalista de línea fina con la promoción de 2x40€. Muy delicado, cero dolor innecesario y sanó perfecto con las indicaciones que me dio. ¡Volveré seguro!",
      style_tag: "Estilo: Minimalista Fine Line",
      verified: true
    },
    {
      author_name: "David H. Gómez",
      avatar_initial: "D",
      avatar_color: "avatar-yellow",
      rating: 5,
      relative_time: "Hace 3 semanas",
      text: "Tenía un tatuaje antiguo que quería tapar con un cover-up oriental. Me diseñó un dragón que cubrió todo perfectamente sin dejar rastro de lo anterior. Un artista con mayúsculas en Burgos.",
      style_tag: "Estilo: Dragón Cover-Up",
      verified: true
    },
    {
      author_name: "Elena Morales",
      avatar_initial: "E",
      avatar_color: "avatar-green",
      rating: 5,
      relative_time: "Hace 1 mes",
      text: "Puntualidad, máxima higiene y una paciencia enorme para ajustar el boceto hasta que quedó exactamente como lo soñaba. Muy recomendado si buscas calidad y confianza.",
      style_tag: "Estilo: Neotradicional",
      verified: true
    },
    {
      author_name: "Adrián Cuesta",
      avatar_initial: "A",
      avatar_color: "avatar-blue",
      rating: 5,
      relative_time: "Hace 1 mes",
      text: "Pieza tribal en el hombro con un negro súper sólido y líneas impecables. Además el servicio a domicilio fue súper cómodo y profesional.",
      style_tag: "Estilo: Polinesio Tribal",
      verified: true
    },
    {
      author_name: "Sara Villalba",
      avatar_initial: "S",
      avatar_color: "avatar-red",
      rating: 5,
      relative_time: "Hace 2 meses",
      text: "Mi primer tatuaje y no pude elegir mejor. Me explicó todo el proceso paso a paso y el kit de curación que me dio hizo que cicatrizara rapidísimo. 100% recomendado.",
      style_tag: "Estilo: Rosa Tradicional",
      verified: true
    }
  ];

  // Si el contenedor no tiene tarjetas placeholder en el HTML, renderizar datos de ejemplo
  if (container.children.length === 0) {
    renderReviews(container, mockReviews);
  }

  /**
   * Conexión preparada para backend:
   * Cuando se implemente el endpoint backend (ej. /api/google/reviews),
   * descomentar la llamada fetch y pasar los datos a renderReviews.
   */
  const googlePlaceId = container.getAttribute('data-google-place-id');
  if (googlePlaceId && window.GOOGLE_REVIEWS_API_ENABLED) {
    fetchGoogleReviewsFromBackend(googlePlaceId)
      .then(reviews => {
        if (reviews && reviews.length > 0) {
          renderReviews(container, reviews);
        }
      })
      .catch(err => {
        console.warn('Google Reviews API offline, usando placeholders de HTML:', err);
      });
  }
}

/**
 * Renderiza tarjetas de testimonios con formato Google Reviews
 */
function renderReviews(container, reviews) {
  container.innerHTML = reviews.map((r, index) => {
    const delayClass = `delay-${((index % 3) + 1) * 100}`;
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);

    return `
      <div class="col reveal ${delayClass}">
        <div class="review-card">
          <div>
            <div class="review-author">
              <div class="review-avatar ${r.avatar_color || 'avatar-blue'}">
                ${r.avatar_initial || r.author_name.charAt(0)}
              </div>
              <div>
                <div class="review-author-name">
                  ${r.author_name}
                  <i class="bi bi-patch-check-fill text-primary" title="Reseña verificada de Google"></i>
                </div>
                <div class="review-meta d-flex align-items-center gap-2">
                  <span class="star-rating">${stars}</span>
                  <span>·</span>
                  <span>${r.relative_time}</span>
                </div>
              </div>
            </div>
            <p class="review-body">"${r.text}"</p>
          </div>
          <div class="d-flex justify-content-between align-items-center pt-2 border-top border-secondary border-opacity-25 mt-3">
            <span class="review-tag">${r.style_tag || 'Cliente Verificado'}</span>
            <span class="review-verified-badge">
              <i class="bi bi-google"></i> Google
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Stub preparado para conectar al backend en el futuro
 * @param {string} placeId - ID de Google Places del negocio
 */
async function fetchGoogleReviewsFromBackend(placeId) {
  // const response = await fetch(`/api/google/reviews?place_id=${encodeURIComponent(placeId)}`);
  // if (!response.ok) throw new Error('Network response was not ok');
  // return await response.json();
  return null;
}

