/* color game using js and css html*/
var squares=document.querySelectorAll(".square");

var reset=document.querySelector("#New");
var easy=document.querySelector('#Easy');
var hard=document.querySelector('#Hard');

var len=6;

easy.addEventListener('click', function() {
  easy.classList.add("Selected");
  hard.classList.remove("Selected");
  len=3;
  for (var i = 3; i < squares.length; i++) {
    squares[i].style.background="#232323";
  }
  newGame();
});

hard.addEventListener('click', function() {
  hard.classList.add("Selected");
  easy.classList.remove("Selected");
  len=6
  newGame();
});

var pickedcolor=pickcl();
console.log(pickedcolor);
var sqpicked=document.querySelector("#picked");
picked.textContent = pickedcolor;
document.querySelector("h1").style.background="steelblue";
sqcolor();
squares[Math.floor(Math.random()*len)].style.background=pickedcolor;

function sqcolor() {
  for (var i = 0; i < len; i++) {
    squares[i].style.background=pickcl();
  }

}

for (var i = 0; i < len; i++) {
  squares[i].addEventListener("click", function() {
    var bg = this.style.background;
    console.log(bg);
    if(bg===pickedcolor )
    {
      alert('you win');
      document.querySelector("#result").textContent = "correct";
      chColor(pickedcolor);
      reset.textContent = 'Play Again?';
    }
    else {
      this.style.background=document.querySelector("body").style.background;
    }

  });
}

function newGame() {
  document.querySelector("#result").textContent = "";
  reset.textContent = 'New Colors';
  for (var i = 0; i < len; i++) {
    squares[i].style.background="";
  }
  pickedcolor=pickcl();
  console.log(pickedcolor);
  sqpicked=document.querySelector("#picked");
  picked.textContent = pickedcolor;
  document.querySelector("h1").style.background="steelblue";
  sqcolor();
  squares[Math.floor(Math.random()*len)].style.background=pickedcolor;
}

reset.addEventListener("click",newGame);

function pickcl() {
  res="rgb("+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+")";
  return (res);
}

function chColor(color) {
  for (var i = 0; i < len; i++) {
    squares[i].style.background=color;
  }
  document.querySelector("h1").style.background=color;
}
