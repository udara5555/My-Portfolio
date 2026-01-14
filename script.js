// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when link is clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section, header');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // 100px offset to trigger highlight slightly before section hits top
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });

    // Glass Nav Scrolled Effect (Optional: add extra blur/opacity on scroll)
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(5, 5, 5, 0.9)';
    } else {
        nav.style.background = 'rgba(5, 5, 5, 0.7)';
    }
});

// Scroll Animations (Fade In Up)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.fade-in-up');
animatedElements.forEach(el => observer.observe(el));

// Typing Effect for the Hero Section (Simple implementation)
// Note: CSS simple typing is often better, but for specific word cycling JS is good.
// Currently the HTML has a static gradient text. We can add a simple cursor blink if needed,
// but the current design is clean.

// Video Modal Logic
const modal = document.getElementById('video-modal');
const videoPlayer = document.getElementById('demo-video');
const videoSource = videoPlayer.querySelector('source');
const playButtons = document.querySelectorAll('.play-demo-btn');
const closeBtn = document.querySelector('.close-modal');

playButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const videoFile = btn.getAttribute('data-video');

        if (videoFile) {
            // Update video source
            videoSource.src = videoFile;
            videoPlayer.load(); // Reload video with new source

            // Show modal
            modal.style.display = 'flex';
            // slight delay to allow display flex to apply before opacity transition
            setTimeout(() => {
                modal.classList.add('show');
                videoPlayer.play();
            }, 10);
        }
    });
});

closeBtn.addEventListener('click', () => {
    closeModal();
});

// Close when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('show');
    videoPlayer.pause();
    setTimeout(() => {
        modal.style.display = 'none';
        videoSource.src = ""; // Reset source
    }, 500); // Wait for transition
}
