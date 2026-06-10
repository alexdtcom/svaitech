// === БУРГЕР-МЕНЮ ===
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const menuLinks = document.querySelectorAll('.nav-links a');

  // Открытие/закрытие меню
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Закрытие меню при клике на ссылку
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Закрытие меню при клике вне его
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
      burger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

  // === АКТИВНАЯ ССЫЛКА ПРИ СКРОЛЛЕ ===
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLink.style.color = 'var(--accent)';
        } else {
          navLink.style.color = '';
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // === АНИМАЦИИ ПРИ СКРОЛЛЕ (Intersection Observer) ===
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Анимация только один раз
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animateElements.forEach(el => observer.observe(el));

  // === МОДАЛЬНОЕ ОКНО БРОНИРОВАНИЯ ===
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  const bookingButtons = document.querySelectorAll('[data-modal="booking"]');
  const bookingForm = document.querySelector('.booking-form');

  function openModal() {
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  bookingButtons.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    // Закрытие по клику на оверлей
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // === ОБРАБОТКА ФОРМЫ БРОНИРОВАНИЯ ===
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(bookingForm);
      const data = Object.fromEntries(formData);

      // Валидация
      if (!data.name || !data.phone || !data.date || !data.time) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return;
      }

      // Здесь можно отправить данные на сервер
      console.log('Бронирование:', data);

      // Показываем подтверждение
      alert('Спасибо! Мы свяжемся с вами для подтверждения брони.');
      bookingForm.reset();
      closeModal();
    });
  }
});