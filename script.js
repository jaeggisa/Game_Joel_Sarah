var spieler = document.querySelector(".player img");
var spielfeld = document.querySelector(".playground");
var score = 0;
var punkteAnzeige = document.querySelector(".punkte");
var backgroundPosition = 0;

spieler.style.top = "450px";
spieler.style.left = "500px";

var timer = new Timer(150);
var timer3 = new Timer(300);

function bewegung() {
  if (keyboard(38) && parseInt(spieler.style.top) > 275) {
    spieler.style.top = parseInt(spieler.style.top) - 25 + "px";
  }
}

function verschieben_entfernen(ellemente) {
  for (var bla of ellemente) {
    bla.style.left = parseInt(bla.style.left) - 5 + "px";
    if (parseInt(bla.style.left) < 300) {
      bla.parentNode.removeChild(bla);
    }
  }
}

function Schwerkraft() {
  if (parseInt(spieler.style.top) < 450) {
    spieler.style.top = parseInt(spieler.style.top) + 5 + "px";
  }
}

function hindernisse() {
  if (timer.ready()) {
    const r = Math.random();
    if (r > 0.5) {
      var h = document.createElement("img");
      h.src = "img/stein.png";
      h.classList.add("stein");
      h.style.top = "570px";
      h.style.left = "1500px";
      spielfeld.appendChild(h);
    } else {
      var h = document.createElement("img");
      h.src = "img/vogel.png";
      h.classList.add("vogel");
      h.style.top = "300px";
      h.style.left = "1500px";
      spielfeld.appendChild(h);
    }
  }
}

function punktestand() {
  if (timer3.ready()) {
    score = score + 1;
    punkteAnzeige.textContent = score;
  }
}

function loop() {
  bewegung();
  Schwerkraft();
  hindernisse();

  var steine = document.querySelectorAll(".stein");
  verschieben_entfernen(steine);

  var voegle = document.querySelectorAll(".vogel");
  verschieben_entfernen(voegle);

  backgroundPosition = backgroundPosition + 5;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  punktestand();

  if (anyCollision(spieler, steine)) {
    location.replace("gameover.html");
    return;
  }
  if (anyCollision(spieler, voegle)) {
    location.replace("gameover.html");
    return;
  }

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
