/* DROPDOWN */

let menu = document.querySelector(".header-main-links");
let overFlow = document.getElementsByTagName("body");
let dropDown = document.querySelector("#dropdown");
let menuOpen = false;

let login = false;
let user = localStorage.getItem("email")

document.addEventListener("mouseenter",()=>{
 if(localStorage.getItem("email")){
  login = true;
  document.getElementById("loggedin").style.display="none"
  document.getElementById("user").innerText=user
  
 }
 else{
  login=false;
  document.getElementById("loggedout").style.display="none"
 }
})

document.getElementById("loggedout").addEventListener("click",()=>{
  localStorage.removeItem("email")
  location.href="/"
})

dropDown.addEventListener('click', () => {
  if(!menuOpen)
  {
    dropDown.classList.add('open');
    menu.classList.add('open');
    overFlow[0].style.overflowY = "hidden";
    overFlow[0].style.height = "100vh"
    menuOpen = true;
  }
  else
  {
    dropDown.classList.remove('open');
    menu.classList.remove('open');
    overFlow[0].style.overflowY = "visible";
    overFlow[0].style.height = "auto"
    menuOpen = false;
  }
});

/* HEADER EFFECT WHEN SCROLL */

let header = document.getElementsByTagName("header");
let headerLinks = document.querySelectorAll(".header-main-links li a");
let about = document.getElementsByClassName("about-us");
let service = document.getElementsByClassName("services");
let contact = document.getElementsByClassName("contact-section");
console.log(header[0].offsetHeight);

window.addEventListener('scroll', function() {
  
  if(window.scrollY > 10) {
    header[0].classList.add("active");
  }
  else {
    header[0].classList.remove("active");
  }

  if(window.scrollY >= 0 && window.scrollY < (about[0].offsetTop - header[0].offsetHeight)) {
    headerLinks[0].classList.add("active");
  }
  else {
    headerLinks[0].classList.remove("active");
  }

  if(window.scrollY > (about[0].offsetTop - header[0].offsetHeight) && window.scrollY < (service[0].offsetTop - header[0].offsetHeight)) {
    headerLinks[1].classList.add("active");
  }
  else {
    headerLinks[1].classList.remove("active");
  }

  if(window.scrollY > (service[0].offsetTop - header[0].offsetHeight) && window.scrollY < (contact[0].offsetTop - header[0].offsetHeight)) {
    headerLinks[2].classList.add("active");
  }
  else {
    headerLinks[2].classList.remove("active");
  }

  if(window.scrollY > (contact[0].offsetTop - header[0].offsetHeight)) {
    headerLinks[3].classList.add("active");
  }
  else {
    headerLinks[3].classList.remove("active");
  }

});

/* SMOOTH SCROLL */
/* Note: css scroll effect does not work on safari */

function anchorLinkHandler(e) {
  const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

  e.preventDefault();
  const targetID = this.getAttribute("href");
  const targetAnchor = document.querySelector(targetID);
  if (!targetAnchor) return;
  const originalTop = distanceToTop(targetAnchor);

  window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });

  const checkIfDone = setInterval(function() {
      const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
      if (distanceToTop(targetAnchor) === 0 || atBottom) {
          targetAnchor.tabIndex = "-1";
          targetAnchor.focus();
          window.history.pushState("", "", targetID);
          clearInterval(checkIfDone);
      }
  }, 150);
}

const linksToAnchors = document.querySelectorAll('a[href^="#"]');

linksToAnchors.forEach(each => (each.onclick = anchorLinkHandler));