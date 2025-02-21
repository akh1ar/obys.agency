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
crsrAnimation();