/**
 * Adds smooth scrolling behavior to navigation links.
 * When a nav link is clicked, the page scrolls smoothly to the target section.
 */
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetID = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 70, // Offset for fixed header height
        behavior: 'smooth'
      });
    }
  });
});

/**
 * Initializes EmailJS for contact form submission and sets up scroll-triggered animations.
 */
window.onload = function() {
  // Initialize EmailJS with user ID
  emailjs.init('AI-1Vp40TP1dUt7Tm');

  // Setup contact form submission handler
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      // Send form data using EmailJS service and template
      emailjs.sendForm('service_n4zv64o', 'template_h9ke9iu', this)
        .then(() => {
          alert('Message sent successfully!');
          form.reset();
        }, (error) => {
          alert('Failed to send message. Please try again later.');
          console.error('EmailJS error:', error);
        });
    });
  }

  // Intersection Observer options for triggering animations
  const observerOptions = {
    threshold: 0.1
  };

  // Create Intersection Observer to add animation classes when sections enter viewport
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Add visible class to trigger CSS animation
        observer.unobserve(entry.target); // Stop observing once animation triggered
      }
    });
  }, observerOptions);

  // Define animation classes to cycle through for sections
  const animationClasses = ['fade-in', 'pop-in', 'slide-in-left', 'slide-in-right'];

  // Add animation classes and observe each section for scroll-triggered animation
  document.querySelectorAll('.section').forEach((section, index) => {
    const animationClass = animationClasses[index % animationClasses.length];
    section.classList.add(animationClass);
    observer.observe(section);
  });

  // Mobile menu toggle functionality
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mainContent = document.querySelector('main');

  if (menuToggleBtn && mainContent) {
    menuToggleBtn.addEventListener('click', () => {
      const expanded = menuToggleBtn.getAttribute('aria-expanded') === 'true' || false;
      menuToggleBtn.setAttribute('aria-expanded', !expanded);
      mainContent.classList.toggle('menu-open');
    });
  }
};
