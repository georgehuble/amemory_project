import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { preloadTL } from "./main.js";

gsap.registerPlugin(ScrollTrigger);

const animateBlogHeader = () => {
  const blogLabel = document.querySelector(".blogHeader label");
  const blogTitle = document.querySelector(".blogHeader h1");
  const blogText = document.querySelector(".blogHeader p");

  let titleHero = document.querySelector(".blogHeader .titleHero");

  let lines = [];
  if (titleHero) {
    new SplitType(titleHero, { types: "lines" });
    lines = document.querySelectorAll(".titleHero .line");

    lines.forEach((lineDesc) => {
      let wrapperdesc = document.createElement("div");
      wrapperdesc.classList.add("line-wrapper");
      lineDesc.parentNode.insertBefore(wrapperdesc, lineDesc);
      wrapperdesc.appendChild(lineDesc);
    });
  }

  let lineWrapper = document.querySelectorAll(".titleHero .line");

  gsap.set([blogLabel, blogText], {
    opacity: 0,
    y: 100,
    visibility: "visible",
  });

  ScrollTrigger.create({
    trigger: blogLabel,
    start: "top 80%",
    onEnter: () => {
      const tl = gsap.timeline();

      tl.to(blogLabel, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
      tl.to(blogTitle, { opacity: 1, ease: "power2.out" }, "-=0.3");
      lineWrapper.forEach((line, index) => {
        tl.fromTo(
          line,
          {
            opacity: 0,
            yPercent: 300,
            rotation: -15,
            transformOrigin: "50% 50%",
          },
          {
            opacity: 1,
            yPercent: 0,
            rotation: 0,
            duration: 0.8,
            ease: "cubic-bezier(0.36, 0, 0.66, -0.56)",
          },
          `<${index * 0.2}`
        );
      });
      tl.to(
        blogText,
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    },
    once: true,
  });
};

const animateAboutFirstListBlog = () => {
  const firstListBlog = document.querySelector(".firstListBlog");
  // const firstBlogThumbnail = firstListBlog.querySelector(".thumbnailFirstBlog");
  // const firstBlog = firstListBlog.querySelector(".contentFirstBlog");
  const blogList = firstListBlog.querySelector(".blogList");
  const blogListItems = blogList.querySelectorAll(".blogList .card");
  gsap.set([...blogListItems], { opacity: 0, y: 50 });
  // gsap.set(firstBlogThumbnail, { opacity: 0, scale: 1.2 });

  // ScrollTrigger.create({
  //   trigger: firstListBlog,
  //   start: "top 80%",
  //   onEnter: () => {
  //     const tl = gsap.timeline();
  //     tl.to(firstBlog, {
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.5,
  //       ease: "power2.out",
  //       delay: 0.3,
  //     }).to(
  //       firstBlogThumbnail,
  //       { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
  //       "-=0.3"
  //     );
  //   },
  //   once: true,
  // });
  const isMobile = window.innerWidth <= 768;
  ScrollTrigger.create({
    trigger: blogListItems,
    start: "top 80%",
    onEnter: () => {
      const tl = gsap.timeline();
      tl.to(blogListItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.4,
      });
    },
  });
};

const animateListPopularBlog = () => {
  const popularTitle = document.querySelector(".popularBlog h2");
  const popularText = document.querySelector(".popularBlog p");
  const listBLog = document.querySelectorAll(".popularBlog .card");

  gsap.set([popularTitle, popularText, listBLog], { opacity: 0, y: 50 });

  ScrollTrigger.create({
    trigger: ".popularBlog .card",
    start: "top 80%",
    onEnter: () => {
      const tl = gsap.timeline();
      tl.to(listBLog, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.4,
      });
    },
  });

  ScrollTrigger.create({
    trigger: ".popularBlog",
    start: "top 80%",
    onEnter: () => {
      const tl = gsap.timeline();
      tl.to(popularTitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        popularText,
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    },
    once: true,
  });
};

const handleResize = () => {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    gsap.set(".blogHeader .label, .blogHeader h1, .blogHeader p", { y: 30 });
    gsap.set(".firstListBlog .contentFirstBlog, .blogList .card", { y: 30 });
    gsap.set(".popularBlog h2, .popularBlog p, .popularBlog .card", { y: 30 });
  } else {
    gsap.set(".blogHeader .label, .blogHeader h1, .blogHeader p", { y: 50 });
    gsap.set(".firstListBlog .contentFirstBlog, .blogList .card", { y: 50 });
    gsap.set(".popularBlog h2, .popularBlog p, .popularBlog .card", { y: 50 });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  animateAboutFirstListBlog();
  animateListPopularBlog();
  window.addEventListener("resize", handleResize);
  window.onload = function () {
    gsap.set(".blogHeader label, .blogHeader h1, .blogHeader p", {
      opacity: 0,
    });

    preloadTL.eventCallback("onComplete", function () {
      animateBlogHeader();
    });
  };
});

let titleSections = document.querySelectorAll(".title-section");
let sectionParagraph = document.querySelectorAll(".sectionParagraph");

titleSections.forEach((line) => {
  let splitText = new SplitType(line, { types: "lines" });

  splitText.lines.forEach((line) => {
    let wrapper = document.createElement("div");
    wrapper.classList.add("line-wrapper");

    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });
});

sectionParagraph.forEach((paragraph) => {
  let splitText = new SplitType(paragraph, { types: "lines" });

  splitText.lines.forEach((line) => {
    let wrapper = document.createElement("div");
    wrapper.classList.add("line-wrapper");

    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  const pararaphLines = document.querySelectorAll(".line-wrapper");
  const learnButton = document.querySelectorAll(".learnButton");
  const isMobile = window.innerWidth <= 768;

  gsap.fromTo(
    [pararaphLines, learnButton],
    {
      yPercent: 300,
      transformOrigin: "50% 50%",
      opacity: 0,
    },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".sectionHealth",
        start: "top center",
        end: "20% center",
      },
    }
  );
});
let titleSectionLines = document.querySelectorAll(".line-wrapper");

titleSections.forEach((line, index) => {
  gsap.fromTo(
    titleSectionLines,
    {
      yPercent: 300,
      transformOrigin: "50% 50%",
      opacity: 0,
    },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".sectionHealth",
        start: "top center",
        end: "20% center",
      },
    }
  );
});

let imageWrap = document.querySelectorAll(".imageWrap");
gsap.fromTo(
  imageWrap,
  {
    xPercent: 300,
    transformOrigin: "50% 50%",
    opacity: 0,
  },
  {
    xPercent: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".sectionHealth",
      start: "top center",
      end: "20% center",
    },
  }
);

let dateTitleLabel = document.querySelectorAll(".dateLabel.titleLabel");
gsap.fromTo(
  dateTitleLabel,
  {
    xPercent: -300,
    transformOrigin: "50% 50%",
    opacity: 0,
  },
  {
    xPercent: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".sectionHealth",
      start: "top center",
      end: "20% center",
    },
  }
);
