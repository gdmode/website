document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      // Toggle the 'open' class on the clicked FAQ item
      item.classList.toggle('open');
    });
  });

  // Show the notice bar only when the navbar is at the very top
  window.addEventListener('scroll', () => {
    const noticeBar = document.querySelector('.notice-bar');
    const heroSection = document.querySelector('.hero');

    if (window.scrollY === 0) {
      noticeBar.style.display = 'block';
    } else if (heroSection && window.scrollY >= heroSection.offsetTop) {
      noticeBar.style.display = 'none';
    }
  });
});