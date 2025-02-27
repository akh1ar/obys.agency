function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function loadingAnimtion() {
  let tl = gsap.timeline();
  tl.from("#line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });
  tl.from("#line-loading ", {
    opacity: 0,
    onStart: function () {
      let loaderTimer = document.querySelector("#line-loading h5");
      let count = 0;
      let clear = setInterval(function () {
        if (count === 99) {
          clearInterval(clear);
        }
        count++;
        loaderTimer.innerHTML = count;
      }, 30);
    },
  });
  tl.to("#line h2", {
    animationName: "anime",
    opacity: 1,
  });
  tl.to(".loader", {
    opacity: 0,
    duration: 0.2,
    delay: 3,
  });
  tl.from(".page1", {
    delay: 0.2,
    y: 1600,
    opacity: 0,
    ease: Power4,
    duration: 0.5,
  });
  tl.to(".loader", {
    display: "none",
  });
  tl.from("nav", {
    opacity: 0,
  });
  tl.from(".page1no h3,#content h1,.content3 h2", {
    y: 120,
    stagger: 0.2,
  });
}
function crsrAnimation() {
  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
  // Shery.makeMagnet(".nav1 h4");
}
function videoplay() {
  let videoContainer = document.querySelector("#video-container");

  let video = document.querySelector("#video-container video");

  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (event) {
      gsap.to(".mousefollower", {
        opacity: 0,
      });
      gsap.to("#video-crsr", {
        left: event.x - 570,
        y: event.y - 300,
      });
    });
  });
  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", {
      opacity: 1,
    });
    gsap.to("#video-crsr", {
      clearProps: "transform", // Remove GSAP's transforms
      top: "-13%",
      left: "70%",
    });
  });
  let flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play();
      video.style.opacity = 1;
      document.querySelector(
        "#video-crsr"
      ).innerHTML = `<i class="ri-pause-fill"></i>`;
      gsap.to("#video-crsr", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      document.querySelector(
        "#video-crsr"
      ).innerHTML = `<i class="ri-play-fill"></i>`;
      gsap.to("#video-crsr", {
        scale: 1,
      });
      flag = 0;
    }
  });
}
function gooeyanimtion() {
  Shery.imageEffect(".img-container", {
    style: 5,
    // debug:true,
    gooey: true,
    config: {
      a: { value: 1, range: [0, 30] },
      b: { value: 0.92, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7932454818348645 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: true },
      growSize: { value: 15, range: [1, 15] },
      durationOut: { value: 5, range: [0.1, 5] },
      durationIn: { value: 0.1, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.15, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.84, range: [0, 10] },
      metaball: { value: 0.43, range: [0, 2] },
      discard_threshold: { value: 0.74, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.47, range: [0, 2] },
      noise_scale: { value: 8.4, range: [0, 100] },
    },
  });
}

function flaganime() {
  document.addEventListener("mousemove", function (event) {
    gsap.to("#flag", {
      x: event.x,
      y: event.y,
    });
  });
  document
    .querySelector(".content3")
    .addEventListener("mouseenter", function () {
      gsap.to("#flag", {
        opacity: 1,
      });
    });
  document
    .querySelector(".content3")
    .addEventListener("mouseleave", function () {
      gsap.to("#flag", {
        opacity: 0,
      });
    });
}

function footertext() {
  let splittext1 = "";
  let splittext2 = "";

  document
    .querySelector(".footer h1")
    .textContent.split("")
    .forEach(function (elem) {
      splittext1 += `<span>${elem}</span>`;
    });
  document.querySelector(".footer h1").innerHTML = splittext1;

  document
    .querySelector(".footer h2")
    .textContent.split("")
    .forEach(function (elem) {
      splittext2 += `<span>${elem}</span>`;
    });
  document.querySelector(".footer h2").innerHTML = splittext2;

  document
    .querySelector(".footerHeading")
    .addEventListener("mouseenter", function () {
      gsap.to(".footer h1 span", {
        opacity: 0,
        stagger: 0.03,
      });
      gsap.to(".footer h2 span", {
        delay: 0.35,
        opacity: 1,
        stagger: 0.07,
      });
    });

  document
    .querySelector(".footerHeading")
    .addEventListener("mouseleave", function () {
      gsap.to(".footer h1 span", {
        opacity: 1,
        stagger: 0.07,
        delay: 0.35,
      });
      gsap.to(".footer h2 span", {
        opacity: 0,
        stagger: 0.01,
      });
    });
}
function pagetextanimtion() {
  gsap.from(".page3 h1", {
    y: 120,
    opacity: 0,
    duration: 0.5,
    scrollTrigger: {
      trigger: "#page-heading-con",
      scroller: "main",
    },
  });
}
loadingAnimtion();
crsrAnimation();
locomotive();
flaganime();
videoplay();
gooeyanimtion();
footertext();
pagetextanimtion();
