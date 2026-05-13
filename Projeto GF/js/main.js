// main.js

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.getElementById('primary-navigation');
  const navLinks = nav.querySelectorAll('a');

  if (!hamburger || !nav) {
    return;
  }

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768 && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const heroVideo = document.getElementById('hero-video');
  const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  let currentIndex = carouselItems.findIndex(item => item.classList.contains('active'));

  const setActiveSlide = index => {
    if (index < 0) {
      index = carouselItems.length - 1;
    } else if (index >= carouselItems.length) {
      index = 0;
    }

    carouselItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === index);
    });

    const videoId = carouselItems[index].dataset.videoId;
    if (heroVideo && videoId) {
      heroVideo.src = `https://www.youtube.com/embed/${videoId}?cc_load_policy=1&cc_lang_pref=pt`;
    }

    currentIndex = index;
  };

  carouselItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      setActiveSlide(index);
    });
  });

  prevButton?.addEventListener('click', () => setActiveSlide(currentIndex - 1));
  nextButton?.addEventListener('click', () => setActiveSlide(currentIndex + 1));
});
