<script>
// --- Responsive Nav Menu ---
const menuList = document.getElementById("menuList");
menuList.style.height = "0px";
menuList.style.paddingTop = "0px";
menuList.style.display = "block";
menuList.style.position = "fixed";
menuList.style.borderRadius = "20px";

function toggleMenu() {
  if (menuList.style.height === "0px") {
    menuList.style.height = "auto";
    menuList.style.paddingTop = "20px";
  } else {
    menuList.style.height = "0px";
    menuList.style.paddingTop = "0px";
  }
}

// --- Scroll Progress Bar ---
window.onscroll = updateProgressBar;
function updateProgressBar() {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const percent = (scrollTop / scrollHeight) * 100;
  document.getElementById("progressBar").style.width = percent + "%";
}

// --- Scroll-to-Top Button with Circular Progress ---
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('scrollToTopBtn');
  const circle = btn.querySelector('circle');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;

  function updateCircle() {
    const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (document.documentElement.scrollTop / scrollTotal) * 100;
    const offset = circumference - (scrolled / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    btn.classList.toggle('show', window.scrollY > 300);
  }

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', updateCircle);
  updateCircle(); // initial
});

// --- Theme Toggle Dark/Light ---
function toggleTheme() {
  const toggle = document.getElementById("theme-toggle");
  document.body.classList.toggle("dark-mode", toggle.checked);
  localStorage.setItem("theme", toggle.checked ? "dark" : "light");
}

window.onload = () => {
  const saved = localStorage.getItem("theme");
  const toggle = document.getElementById("theme-toggle");
  if (saved === "dark") {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
  }
};

// --- Sidebar Toggle ---
function toggleSidebar() {
  const sidebar = document.querySelector('.social-sidebar');
  const arrow = document.querySelector('.toggle-arrow');
  const isHidden = sidebar.style.display === "none";
  sidebar.style.display = isHidden ? "block" : "none";
  arrow.style.display = isHidden ? "none" : "block";
}

// --- Listing Search (Filter Akiya Listings) ---
function performSearch() {
  const term = document.getElementById("search-input").value.trim().toLowerCase();
  document.querySelectorAll(".listing").forEach(listing => {
    const title = listing.querySelector(".listing-title").innerText.toLowerCase();
    listing.style.display = title.includes(term) ? "block" : "none";
  });
}

// --- Contact Form Handling ---
function saveFormData() {
  const nm = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const msg = document.getElementById('message').value;
  const stored = JSON.parse(localStorage.getItem('contacts') || '[]');
  stored.push({ nm, email, msg, time: new Date() });
  localStorage.setItem('contacts', JSON.stringify(stored));
}

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  saveFormData();
  alert('Thanks for reaching out! We’ll get back soon.');
  e.target.reset();
});

// --- Visitor Counter ---
function incrementVisitorCount() {
  const count = parseInt(localStorage.getItem('visitCount') || '0') + 1;
  localStorage.setItem('visitCount', count);
  document.querySelector('.visitor-counter').textContent = count;
}
document.addEventListener('DOMContentLoaded', incrementVisitorCount);

// --- FAQ Toggle ---
document.querySelectorAll('.faq input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', () => {
    const ans = cb.nextElementSibling.nextElementSibling;
    ans.style.maxHeight = cb.checked ? ans.scrollHeight + 'px' : '0px';
  });
});

// --- Testimonials Slider (SwiperJS) ---
function initTestimonials() {
  new Swiper('.swiper', {
    autoHeight: true,
    loop: true,
    pagination: { el: '.swiper-pagination' },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
  });
}
document.addEventListener('DOMContentLoaded', initTestimonials);

// --- Register Service Worker for PWA ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.error('SW registration failed:', err));
  });
}
</script>
