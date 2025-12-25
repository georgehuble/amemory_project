import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { preloadTL } from "/assets/main.js";

gsap.registerPlugin(ScrollTrigger);

let isMobile = window.innerWidth < 768;

// Navbar scroll handling
const navbar = document.querySelector("header");
let lastScrollY = window.scrollY;
function handleScroll() {
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (window.scrollY > lastScrollY) {
    navbar.classList.add("scroll-down");
  } else if (window.scrollY < lastScrollY) {
    navbar.classList.remove("scroll-down");
  }

  lastScrollY = window.scrollY;
}

window.addEventListener("scroll", handleScroll);

// Hero Section Animations
window.onload = function () {
  preloadTL.play();
  preloadTL.eventCallback("onComplete", function () {
    initHeroAnimations();
  });
};

function initHeroAnimations() {
  const heroTl = gsap.timeline();

  // Animate memorial info (name and dates)
  heroTl.fromTo(
    ".memorial-info",
    {
      opacity: 0,
      x: -100,
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
    }
  );

  // Animate portrait
  heroTl.fromTo(
    ".memorial-portrait",
    {
      opacity: 0,
      x: 100,
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
    },
    "<0.2"
  );
}

// Biography Section Animation
gsap.fromTo(
  ".bio-text",
  {
    opacity: 0,
    y: 50,
  },
  {
    scrollTrigger: {
      trigger: ".biography-section",
      start: "top 70%",
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
  }
);

gsap.fromTo(
  ".bio-image",
  {
    opacity: 0,
    scale: 0.9,
  },
  {
    scrollTrigger: {
      trigger: ".biography-section",
      start: "top 70%",
    },
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "power3.out",
  }
);

// Letter Section Animation
gsap.fromTo(
  ".letter-title",
  {
    opacity: 0,
    y: 30,
  },
  {
    scrollTrigger: {
      trigger: ".letter-section",
      start: "top 70%",
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
  }
);

gsap.fromTo(
  ".letter-content",
  {
    opacity: 0,
    y: 50,
  },
  {
    scrollTrigger: {
      trigger: ".letter-section",
      start: "top 70%",
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.2,
  }
);

// Photos Section Animation
gsap.fromTo(
  ".photos-title",
  {
    opacity: 0,
    y: 30,
  },
  {
    scrollTrigger: {
      trigger: ".photos-section",
      start: "top 70%",
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
  }
);

// Video Section Animation
gsap.fromTo(
  ".video-title",
  {
    opacity: 0,
    y: 30,
  },
  {
    scrollTrigger: {
      trigger: ".video-section",
      start: "top 70%",
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
  }
);

gsap.fromTo(
  ".video-wrapper",
  {
    opacity: 0,
    scale: 0.95,
  },
  {
    scrollTrigger: {
      trigger: ".video-section",
      start: "top 70%",
    },
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "power3.out",
    delay: 0.2,
  }
);

// Location Section Animation
gsap.fromTo(
  ".location-title",
  {
    opacity: 0,
    y: 30,
  },
  {
    scrollTrigger: {
      trigger: ".location-section",
      start: "top 70%",
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
  }
);

gsap.fromTo(
  ".location-info",
  {
    opacity: 0,
    x: -50,
  },
  {
    scrollTrigger: {
      trigger: ".location-section",
      start: "top 70%",
    },
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.2,
  }
);

gsap.fromTo(
  ".location-map",
  {
    opacity: 0,
    x: 50,
  },
  {
    scrollTrigger: {
      trigger: ".location-section",
      start: "top 70%",
    },
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.2,
  }
);

// QR Code Section Animation
gsap.fromTo(
  ".qr-title",
  {
    opacity: 0,
    y: 30,
  },
  {
    scrollTrigger: {
      trigger: ".qrcode-section",
      start: "top 70%",
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
  }
);

gsap.fromTo(
  ".qr-desc",
  {
    opacity: 0,
    y: 20,
  },
  {
    scrollTrigger: {
      trigger: ".qrcode-section",
      start: "top 70%",
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.1,
  }
);

gsap.fromTo(
  ".qr-code",
  {
    opacity: 0,
    scale: 0.8,
  },
  {
    scrollTrigger: {
      trigger: ".qrcode-section",
      start: "top 70%",
    },
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "back.out(1.2)",
    delay: 0.3,
  }
);

// Photo Slider Initialization
const photoSlider = new Swiper(".photoSlider", {
  direction: "horizontal",
  loop: true,
  navigation: {
    nextEl: ".next-photo",
    prevEl: ".prev-photo",
  },
  breakpoints: {
    1024: {
      slidesPerView: 2.6,
      spaceBetween: 32,
    },
    768: {
      slidesPerView: 1.6,
      spaceBetween: 32,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 32,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 32,
    },
  },
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.getElementById("site-header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Footer Animations
let footerTl = gsap.timeline({
  scrollTrigger: {
    trigger: "footer",
    start: "0% center",
  },
});
footerTl.fromTo(
  ".footerContent",
  {
    opacity: 0,
    duration: 0.5,
    y: "80px",
  },
  {
    opacity: 1,
    duration: 0.5,
    y: "0px",
    stagger: 0.1,
  }
);

gsap.fromTo(
  ".footer-navigation",
  {
    opacity: 0,
    duration: 0.5,
    y: "80px",
  },
  {
    scrollTrigger: {
      trigger: "footer",
      start: "0% center",
    },
    opacity: 1,
    duration: 0.5,
    y: "0px",
    stagger: 0.1,
    ease: "power2.out",
  }
);

// Mobile Navigation
let hamburgerButton = document.querySelector(".hamburger-bars");
let mobileNav = document.querySelector(".mobileNav");

if (hamburgerButton && mobileNav) {
  hamburgerButton.addEventListener("click", function () {
    hamburgerButton.classList.toggle("active");
    mobileNav.classList.toggle("active");
  });
}

// Placeholder for future Django data integration
// This object structure represents the data that will come from Django backend
const memorialData = {
  person: {
    firstName: "Иван",
    middleName: "Петрович",
    lastName: "Сидоров",
    birthDate: "23.05.1965",
    deathDate: "21.08.2019",
    mainPhoto: "/vinayak.png",
    portraitPhoto: "/cameron.png",
  },
  biography: {
    text: [
      "Иван Петрович Сидоров родился 23 мая 1965 года в городе Москва...",
      "Окончил Московский государственный университет...",
      // More paragraphs
    ],
    photos: ["/cameron.png"],
  },
  letter: {
    greeting: "Дорогие потомки,",
    content: [
      "Жизнь — это невероятное путешествие...",
      // More paragraphs
    ],
    signature: "С уважением и любовью,\nИван Петрович Сидоров",
  },
  photoAlbum: [
    { url: "/vinayak.png", caption: "Фото 1" },
    { url: "/cameron.png", caption: "Фото 2" },
    { url: "/chelcia.png", caption: "Фото 3" },
    { url: "/angelina.png", caption: "Фото 4" },
  ],
  videos: [
    {
      url: "",
      thumbnail: "",
      caption: "Видео воспоминание",
    },
  ],
  burial: {
    country: "Россия",
    city: "Москва",
    cemetery: "Новодевичье кладбище",
    address: "Лужнецкий проезд, 2",
    postalCode: "119048",
    section: "12",
    row: "8",
    coordinates: {
      lat: 55.7269,
      lng: 37.5563,
    },
  },
  qrCode: {
    url: "",
    imageUrl: "",
  },
};

// Export for potential use in Django templates
if (typeof module !== "undefined" && module.exports) {
  module.exports = { memorialData };
}

console.log("Memorial page initialized with data structure:", memorialData);
