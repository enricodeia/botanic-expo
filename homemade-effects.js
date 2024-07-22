// Code that runs on click of a link
$(window).on('load', function() {
	// AVVIO


  // Code that runs on pageload

  gsap.to(".load_grid-item", {
    opacity: 0,
    duration: 0.3,
    stagger: { amount: 0.5, from: "random" },
    onComplete: () => {
      gsap.set(".load_grid", { display: "none" });
    }
  });

	

  $("a").on("click", function (e) {
    if (
    	$(this).prop("hostname") === window.location.host &&
      $(this).attr("href").indexOf("#") === -1 &&
      $(this).attr("target") !== "_blank") {
        e.preventDefault();
        let destination = $(this).attr("href");
        gsap.set(".load_grid", { display: "grid" });
        gsap.fromTo(
          ".load_grid-item",
          {
            opacity: 0
          },
          {
            opacity: 1,
            duration: 0.001,
            stagger: { amount: 0.5, from: "random" }, //you can also try a from: "start" or "end" -- get creative!
            onComplete: () => {
              window.location = destination;
            }
          }
        );
    }
  });
  
  // On click of the back button
  window.onpageshow = function(event){
  	if (event.persisted) {
    	window.location.reload();
    }
  }
});


// EFFETTO LETTERING
const lettersAndSymbols=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","!","@","#","$","%","^","&","*","-","_","+","=",";",":","<",">",","];class TextSplitter{constructor(e,t){this.element=e,this.options=t,this.element.classList.contains("hover-effect")||this.element.classList.add("hover-effect"),this.chars=this.split()}split(){let{splitTypes:e}=this.options,t=[];if(e.includes("words")){let s=this.element.innerText.split(" ");this.element.innerHTML=s.map(e=>`<span class="word">${e}</span>`).join(" "),t=Array.from(this.element.querySelectorAll(".word"))}return e.includes("chars")&&(t=t.flatMap(e=>{let t=e.innerText.split("").map(e=>`<span class="char">${e}</span>`).join("");return e.innerHTML=t,Array.from(e.querySelectorAll(".char"))})),t}getChars(){return this.chars}}class TextAnimator{constructor(e){if(!e||!(e instanceof HTMLElement))throw Error("Invalid text element provided.");this.textElement=e,this.splitText()}splitText(){this.splitter=new TextSplitter(this.textElement,{splitTypes:"words, chars"}),this.originalChars=this.splitter.getChars().map(e=>e.innerHTML)}animate(){this.reset();let e=this.splitter.getChars();e.forEach((e,t)=>{let s=e.innerHTML,r=0;gsap.fromTo(e,{opacity:0},{duration:.03,onStart(){gsap.set(e,{"--opa":1})},onComplete(){gsap.set(e,{innerHTML:s,delay:.03})},repeat:3,onRepeat(){1==++r&&gsap.set(e,{"--opa":0})},repeatRefresh:!0,repeatDelay:.04,delay:(t+1)*.07,innerHTML:()=>lettersAndSymbols[Math.floor(Math.random()*lettersAndSymbols.length)],opacity:1})})}reset(){let e=this.splitter.getChars();e.forEach((e,t)=>{gsap.killTweensOf(e),e.innerHTML=this.originalChars[t]})}}const init=()=>{let e=[".paragraph",".h-h1",".h-h2",".h-h3",".h-h4",".h-h5",".h-h6",".h-h2_big","span"],t=window.matchMedia("(max-width: 767px)").matches;t||(e.forEach(e=>{document.querySelectorAll(e).forEach(e=>{let t=new TextAnimator(e);e.addEventListener("mouseenter",()=>{t.animate()})})}),document.querySelectorAll(".container").forEach(t=>{let s=t.querySelectorAll(e.join(", ")),r=Array.from(s).map(e=>new TextAnimator(e));t.addEventListener("mouseenter",()=>{r.forEach(e=>e.animate())})}))};window.matchMedia("(max-width: 767px)").matches||init();
