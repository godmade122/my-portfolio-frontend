// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Sticky Navbar
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

//Contact Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    // For this demo, we'll just show an alert
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// // Smooth Scrolling for Anchor Links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute('href'));
//         if (target) {
//             target.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//             // Close mobile menu if open
//             navList.classList.remove('active');
//             hamburger.classList.remove('active');
//         }
//     });
// });

// Animate sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section > .container').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});


// WhatsApp Chat Button: builds link from data attributes
(function() {
    const chat = document.getElementById('whatsapp-chat');
    if (!chat) return;
    const raw = chat.dataset.phone || '+15551234567';
    const phone = raw.replace(/\D/g, '');
    const msg = encodeURIComponent(chat.dataset.msg || 'Hi, I have a question about your services.');
    if (phone.length === 0) return;
    chat.href = `https://wa.me/${phone}?text=${msg}`;
    chat.target = '_blank';
    chat.rel = 'noopener noreferrer';
    chat.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i>';
})();


// Contact Form Submission
 const form = document.querySelector('#contactForm');

 form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim(),
    };

    try {
        const response = await fetch("https://my-portfolio-backend-5u2n.onrender.com/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.success);
        if (result.success) {
            form.reset();
        }
    } catch (err) {
        alert("Server Error");
    }
 });