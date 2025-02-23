function locomotive(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function loadingAnimtion(){
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
tl.to('#line h2',{
    animationName:"anime",
    opacity:1
})
tl.to(".loader", {
  opacity: 0,
  duration: 0.2,
  delay: 3
});
tl.from('.page1',{
    delay:0.2,
    y:1600,
    opacity:0,
    ease:Power4,
    duration:0.5
})
tl.to('.loader',{
    display: "none"
});
tl.from("nav",{
    opacity:0
});
tl.from(".page1no h3,#content h1,.content3 h2",{
    y:120,
    stagger:0.2
});
}
function crsrAnimation(){
    document.addEventListener("mousemove",function(e){
        gsap.to(".crsr",{
            left:e.x,
            top:e.y
        })
    });
    Shery.makeMagnet(".nav1 h4");
}
loadingAnimtion();
// crsrAnimation();
locomotive();