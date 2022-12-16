const spieler = document.querySelector(".player img");
const spielfeld = document.querySelector(".playground");
let score = 0;
let punkteAnzeige = document.querySelector(".punkte");
let backgroundPosition = 0;

spieler.style.top = "450px";
spieler.style.left = "500px";

const timer = new Timer(150);
const timer2 = new Timer(300);

function bewegungPlayer() {
  if (keyboard(38) && parseInt(spieler.style.top) > 275) {
    spieler.style.top = parseInt(spieler.style.top) - 25 + "px";
  }
}

//Hindernisse verschwinden, sobald die Position erreicht ist.
function verschieben_entfernen(ellemente) {
  for (const ellement of ellemente) {
    ellement.style.left = parseInt(ellement.style.left) - 5 + "px";
    if (parseInt(ellement.style.left) < 300) {
      ellement.parentNode.removeChild(ellement);
    }
  }
}

function Schwerkraft() {
  if (parseInt(spieler.style.top) < 450) {
    spieler.style.top = parseInt(spieler.style.top) + 5 + "px";
  }
}

//Hindernisse werden erstellt und random angeordnet
function hindernisse() {
  if (timer.ready()) {
    const r = Math.random();
    if (r > 0.5) {
      const h = document.createElement("img");
      h.src = "img/stein.png";
      h.classList.add("stein");
      h.style.top = "570px";
      h.style.left = "1500px";
      spielfeld.appendChild(h);
    } else {
      const h = document.createElement("img");
      h.src = "img/vogel.png";
      h.classList.add("vogel");
      h.style.top = "300px";
      h.style.left = "1500px";
      spielfeld.appendChild(h);
    }
  }
}

function punktestand() {
  if (timer2.ready()) {
    score = score + 1;
    punkteAnzeige.textContent = score;
  }
}

//Hintergrund verschiebt sich (Unendlich)
function background() {
  backgroundPosition = backgroundPosition + 5;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;
}

function loop() {
  bewegungPlayer();
  Schwerkraft();
  hindernisse();

  const steine = document.querySelectorAll(".stein");
  verschieben_entfernen(steine);
  const voegle = document.querySelectorAll(".vogel");
  verschieben_entfernen(voegle);

  background();
  punktestand();

  //Wenn der Spieler und eines der Elemente sich berühren, kommt man auf gameover.html
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
