alert('working');

var game=document.querySelector(".box");
game.addEventListener('click', function() {
  this.style.background="pink";
  console.log("clicked");
  game.classList.add("pink");
  window.location.href = "/game/jscolor.html";

});
