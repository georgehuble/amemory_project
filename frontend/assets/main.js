import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
let isMobile = window.innerWidth < 768;

const percentage = document.getElementById("percentage");

let preloadTL = gsap.timeline();

// Animate percentage from 0 to 100
preloadTL.to(
  {},
  {
    duration: 2,
    ease: "power2.inOut",
    onUpdate: function () {
      const progress = preloadTL.progress();
      percentage.textContent = Math.round(progress * 100) + "%";
    },
    onComplete: function () {
      percentage.textContent = "100%";
    },
  }
);

// Fade out percentage and show branding
preloadTL.to(percentage, {
  opacity: 0,
  duration: 0.5,
});

preloadTL.to(
  ".logo-wrapper .textBranding",
  {
    opacity: 1,
    duration: 0.5,
    ease: "power4.inOut",
  },
  ">.2"
);

// Slide preloader up to reveal page
preloadTL.to(
  ".preload",
  {
    top: "-100%",
    duration: 1,
    ease: "power4.inOut",
  },
  ">.2"
);

export { preloadTL };
let footerTl = gsap.timeline({
  scrollTrigger: {
    trigger: "footer",
    start: "0% center",
    // markers: true
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
      // markers: true
    },
    opacity: 1,
    duration: 0.5,
    y: "0px",
    stagger: 0.1,
    ease: "power2.out",
  }
);

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

// function toggleHeaderScrollClass() {
//   const header = document.querySelector('header');
//   if (window.scrollY > 0) {
//     header.classList.add('scroll');
//   } else {
//     header.classList.remove('scroll');
//   }
// }
// window.addEventListener('scroll', toggleHeaderScrollClass);
// toggleHeaderScrollClass();
