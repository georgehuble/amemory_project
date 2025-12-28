import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
let isMobile = window.innerWidth < 768;

const path = document.querySelector("#animatedSvg path");
const percentage = document.getElementById("percentage");

let preloadTL = gsap.timeline();

// Preloader animation только если элементы существуют
if (path && percentage) {
  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  preloadTL.to("#animatedSvg", {
    opacity: 1,
    duration: 0.5,
    ease: "power2.inOut",
  });
  preloadTL.to(path, {
    strokeDashoffset: 0,
    duration: 2,
    ease: "power2.inOut",
    onUpdate: function () {
      const progress = 1 - parseFloat(path.style.strokeDashoffset) / pathLength;
      percentage.textContent = Math.round(progress * 100) + "%";
    },
    onComplete: function () {
      percentage.textContent = "100%";
      preloadTL.to(percentage, {
        opacity: 0,
        duration: 0.5,
        onComplete: function () {
          preloadTL.to("#animatedSvg", {
            fill: "#06E51C",
            duration: 0.5,
          });
          preloadTL.to(
            "#animatedSvg path",
            {
              stroke: "#06E51C",
              duration: 0.5,
            },
            "<"
          );
          if (isMobile) {
            preloadTL.to(
              ".logo-wrapper .relative svg",
              {
                width: "40px",
                height: "40px",
                left: "72%",

                duration: 0.5,
              },
              ">.5"
            );
          } else {
            preloadTL.to(
              ".logo-wrapper .relative svg",
              {
                width: "80px",
                height: "80px",
                left: "94%",

                duration: 0.5,
              },
              ">.5"
            );
          }
          preloadTL.to(
            ".logo-wrapper .textBranding",
            {
              opacity: 1,
              duration: 0.5,
              ease: "power4.inOut",
            },
            ">.2"
          );
          preloadTL.to(
            ".preload",
            {
              top: "-100%",
              duration: 1,
              ease: "power4.inOut",
            },
            ">.2"
          );
        },
      });
    },
  });
}

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
if (navbar) {
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
}

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
