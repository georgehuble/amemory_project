import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
let isMobile = window.innerWidth < 768;

let heroSection = gsap.timeline({ paused: true });
let titleHero = document.querySelector(".titleHero");

// Устанавливаем начальную видимость для всей секции
gsap.set("section[title='aboutHeader']", { autoAlpha: 1 });

// Скрываем label при загрузке
gsap.set("section[title='aboutHeader'] span", { opacity: 0, y: 20 });

// Анимация для label "• О нас"
heroSection.fromTo(
  "section[title='aboutHeader'] span",
  {
    opacity: 0,
    y: 20,
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
  }
);

if (titleHero) {
  let splitText = new SplitType(titleHero, {
    types: "lines",
  });
}

let lines = document.querySelectorAll(".titleHero .line");
lines.forEach((line) => {
  let wrapper = document.createElement("div");
  wrapper.classList.add("line-wrapper");
  line.parentNode.insertBefore(wrapper, line);
  wrapper.appendChild(line);
});

lines.forEach((line, index) => {
  heroSection.fromTo(
    line,
    {
      yPercent: 300,
      rotation: -15,
      transformOrigin: "50% 50%",
    },
    {
      yPercent: 0,
      rotation: 0,
      duration: 0.8,
      ease: "cubic-bezier(0.36, 0, 0.66, -0.56)",
    },
    "<.2"
  );
});

let descHero = document.querySelector(".description-hero");
if (descHero) {
  let splitText = new SplitType(descHero, {
    types: "lines",
  });
}
let descLines = document.querySelectorAll(".description-hero .line");
descLines.forEach((lineDesc) => {
  let wrapperdesc = document.createElement("div");
  wrapperdesc.classList.add("line-wrapper");
  lineDesc.parentNode.insertBefore(wrapperdesc, lineDesc);
  wrapperdesc.appendChild(lineDesc);
});

descLines.forEach((line, index) => {
  heroSection.fromTo(
    line,
    {
      yPercent: 300,
      rotation: -15,
      transformOrigin: "50% 50%",
    },
    {
      yPercent: 0,
      rotation: 0,
      duration: 0.8,
      ease: "cubic-bezier(0.36, 0, 0.66, -0.56)",
    },
    "<.2"
  );
});

// Анимация декоративного элемента (звездочка возле заголовка)
heroSection.to(
  ".ornamentLogoSpin",
  {
    top: "5rem",
    opacity: 1,
    duration: 1,
    ease: "power3.inOut",
  },
  "<.3"
);
// heroSection.to('.contentPhone',{
//   marginTop:'-350px',
//   duration:3,
//   ease:'power1.inOut'
// },'<.3')

let doctorTl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-introducing",
    start: "top center",
    end: "20% center",
    // markers: true
  },
});
doctorTl1.to(".image-logoOrnament", {
  opacity: 1,
  duration: 2,
});

let doctorTl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-introducing",
    start: `${isMobile ? "10%" : "22%"} center`,
    end: "40% center",
    // markers: true
  },
});

doctorTl2.to(".image-logoOrnament", {
  rotation: 180,
  transformOrigin: "center center",
  duration: 1,
  width: 48,
  height: 48,
});
doctorTl2.fromTo(
  ".titleAnimate",
  {
    opacity: 0,
    duration: 0.5,
    y: "100px",
  },
  {
    opacity: 1,
    duration: 0.5,
    y: "0px",
    stagger: 0.2,
  },
  ">.1"
);

if (!isMobile) {
  doctorTl2.fromTo(
    ".doctorCard",
    {
      opacity: 0,
      duration: 0.5,
      y: "100px",
    },
    {
      opacity: 1,
      duration: 0.5,
      y: "0px",
      stagger: 0.2,
    },
    ">.1"
  );
} else {
  let cardDoctors = document.querySelectorAll(".doctorCard");
  cardDoctors.forEach((card, index) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: "100px",
      },
      {
        scrollTrigger: {
          trigger: card,
          start: "top 50%",
          // markers:true
        },
        opacity: 1,
        y: "0px",
        duration: 0.5,
      }
    );
  });
}
let hamburgerButton = document.querySelector(".hamburger-bars");
let mobileNav = document.querySelector(".mobileNav");
hamburgerButton.addEventListener("click", function () {
  hamburgerButton.classList.toggle("active");
  mobileNav.classList.toggle("active");
  console.log("active");
});

function animateCounter(
  target,
  endValue,
  duration,
  triggerElement = ".sectionCounter",
  endText = ""
) {
  let element = document.getElementById(target);

  if (!element) {
    console.error(`Element with ID "${target}" not found.`);
    return;
  }

  let counterTL = gsap.fromTo(
    element,
    { textContent: 0 },
    {
      textContent: endValue,
      duration: duration,
      ease: "power1.inOut",
      snap: { textContent: 1 },
      onUpdate: function () {
        element.innerText = Math.round(this.targets()[0].textContent) + endText;
      },
      scrollTrigger: {
        trigger: triggerElement,
        start: "top center",
        end: "20% center",
      },
    }
  );

  return counterTL;
}

animateCounter("counter", 300, 4, ".sectionCounter", "+");
animateCounter(
  "counterPartner",
  100,
  4,
  isMobile ? ".title-section" : ".sectionCounter",
  ""
);
animateCounter(
  "counterDoctor",
  50,
  4,
  isMobile ? ".title-section" : ".sectionCounter",
  "+"
);
animateCounter(
  "counterReview",
  100,
  4,
  isMobile ? ".title-section" : ".sectionCounter",
  "k"
);

// Запускаем анимацию после завершения динамического preloader
window.addEventListener('DOMContentLoaded', function() {
  // Слушаем событие завершения preloader
  const checkPreloaderRemoved = setInterval(() => {
    const preloader = document.querySelector('.preload');
    if (!preloader || preloader.style.display === 'none') {
      clearInterval(checkPreloaderRemoved);
      // Небольшая задержка после удаления preloader
      setTimeout(() => {
        heroSection.play();
      }, 100);
    }
  }, 100);

  // Резервный таймер на случай если проверка не сработает
  setTimeout(() => {
    clearInterval(checkPreloaderRemoved);
    if (!heroSection.isActive()) {
      heroSection.play();
    }
  }, 5000);
});

let sectionAppHealth = document.querySelectorAll(
  ".sectionCounter .title-section "
);
let sectionWhyHealth = document.querySelectorAll(
  ".sectionWhyHealth .title-section "
);

sectionAppHealth.forEach((title) => {
  let splitText = new SplitType(title, { types: "lines" });

  splitText.lines.forEach((line) => {
    let wrapper = document.createElement("div");
    wrapper.classList.add("line-wrapper");

    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  let titleSectionsLine = title.querySelectorAll(".line");
  let isMobile = window.innerWidth < 768;

  gsap.fromTo(
    titleSectionsLine,
    {
      yPercent: 300,
      rotation: -15,
      transformOrigin: "50% 50%",
      opacity: 0,
    },
    {
      yPercent: 0,
      rotation: 0,
      opacity: 1,
      duration: 0.8,
      ease: "cubic-bezier(0.36, 0, 0.66, -0.56)",
      stagger: 0.2,
      scrollTrigger: {
        trigger: isMobile ? ".title-section" : ".sectionCounter",
        start: "top center",
        end: "20% center",
      },
    }
  );
});

sectionWhyHealth.forEach((title) => {
  let splitText = new SplitType(title, { types: "lines" });

  splitText.lines.forEach((line) => {
    let wrapper = document.createElement("div");
    wrapper.classList.add("line-wrapper");

    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  let titleSectionsLine = title.querySelectorAll(".line-wrapper .line");
  let isMobile = window.innerWidth < 768;
  let buttonSectionWhyHealth = document.querySelector(".buttonWhyHealth");

  gsap.fromTo(
    [titleSectionsLine, buttonSectionWhyHealth],
    {
      yPercent: -300,
      transformOrigin: "50% 50%",
      opacity: 0,
    },
    {
      yPercent: 0,
      rotation: 0,
      opacity: 1,
      duration: 1,
      ease: "cubic-bezier(0.36, 0, 0.66, -0.56)",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".sectionWhyHealth",
        start: "top center",
        end: "20% center",
      },
    }
  );
});

gsap.fromTo(
  ".textContent-wrap *",
  {
    xPercent: -300,
    opacity: 0,
  },
  {
    xPercent: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.4,
    ease: "power3.Out",
    scrollTrigger: {
      trigger: ".sectionCounter",
      start: "top center",
      end: "20% center",
    },
  }
);

gsap.fromTo(
  ".counterPartner-item",
  {
    xPercent: 300,
    opacity: 0,
  },
  {
    xPercent: 0,
    opacity: 1,
    duration: 0.5,
    delay: 1,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: isMobile ? ".title-section" : ".sectionCounter",
      start: "top center",
      end: "20% center",
    },
  }
);

gsap.fromTo(
  ".counterDoctor-item",
  {
    xPercent: 300,
    opacity: 0,
  },
  {
    xPercent: 0,
    opacity: 1,
    duration: 0.5,
    delay: 1.3,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: isMobile ? ".title-section" : ".sectionCounter",
      start: "top center",
      end: "20% center",
    },
  }
);

gsap.fromTo(
  ".counterReview-item",
  {
    xPercent: 300,
    opacity: 0,
  },
  {
    xPercent: 0,
    opacity: 1,
    duration: 0.5,
    delay: 1.6,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: isMobile ? ".title-section" : ".sectionCounter",
      start: "top center",
      end: "20% center",
    },
  }
);

let subSection = document.querySelectorAll("#subsection-title");

subSection.forEach((sub) => {
  let splitText = new SplitType(sub, { types: "lines" });

  splitText.lines.forEach((line) => {
    let wrapper = document.createElement("div");
    wrapper.classList.add("line-wrapper");

    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  let subSectionLine = sub.querySelectorAll(".line");

  gsap.fromTo(
    subSectionLine,
    {
      yPercent: 300,
      rotation: -15,
      transformOrigin: "50% 50%",
      opacity: 0,
    },
    {
      yPercent: 0,
      rotation: 0,
      opacity: 1,
      duration: 0.8,
      ease: "cubic-bezier(0.36, 0, 0.66, -0.56)",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".sectionCounter",
        start: "top center",
        end: "20% center",
      },
    }
  );
});

const subSectionParagraph = document.querySelectorAll("#subsection-paragraph");
const split = new SplitType(subSectionParagraph, { types: "chars" });

gsap.from(split.chars, {
  x: 150,
  opacity: 0,
  duration: 0.7,
  ease: "power4",
  stagger: 0.04,
  scrollTrigger: {
    trigger: ".sectionCounter",
    start: "top center",
    end: "20% center",
  },
});

const itemShape = document.querySelectorAll("#item-shape");

gsap.from(itemShape, {
  rotation: 45,
  scale: 0,
  duration: 0.7,
  ease: "power4",
  scrollTrigger: {
    trigger: ".sectionCounter",
    start: "top center",
    end: "20% center",
  },
});

const appHealthWrap = document.querySelectorAll("#application-health-wrap");

gsap.from(appHealthWrap, {
  opacity: 0,
  duration: 1,
  ease: "power4",
  scrollTrigger: {
    trigger: ".sectionCounter",
    start: "top center",
    end: "20% center",
  },
});
