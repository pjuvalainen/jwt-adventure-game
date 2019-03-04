/*
 *
 * Muuttujat.
 */

// Kuvat.
let pelaajanKuva = "url(img/ukkeli.png";
let aarrePun = "url(img/aarrePun.png";
let aarreKel = "url(img/aarreKel.png";

// Kierros.
let ekaKierros = true;

// Pelialue taulukko.
var peliAlue = new Array();

// Aarteiden taulukko.
var aarteet = new Array();

// Aarteiden määrä pelialueelle.
var aarteidenLkm = 0;

// Pelialueen koko.
let koko = 3;

// Pelaajan sijainti.
let sijainti;

// Pelialueen pituus (leveys).
let pituus;

// Pelialueen korkeus.
let korkeus;

// Muuttuja nykyiselle ja edelliselle sijannille.
let nykyinen;
let edellinen;

// Haetaan viitteet muuttujiin.
let nimi = document.querySelector("#playerName");
let muutaKoko = document.querySelector("#areaSize");
let aloitus = document.querySelector("#start");
let pelaajanNimi = document.querySelector("#player");
let pelaajanTeksti = document.querySelector("#playerText");
let pelaajanPisteet = document.querySelector("#points");
let alue = document.querySelector(".gamearea");
let tervehdys = document.querySelector("#tervehdys");

// Testauksia varten.
let testi = document.querySelector("#testi");
let testi2 = document.querySelector("#testi2");
let testi3 = document.querySelector("#testi3");
let testi4 = document.querySelector("#testi4");
let testi5 = document.querySelector("#testi5");

tervehdys.textContent = "Moi, paina aloita peli";

// Ohjain.
let vasen = document.querySelector("#btl");
let ylos = document.querySelector("#btu");
let alas = document.querySelector("#btd");
let oikea = document.querySelector("#btr");

let pisteet = 0;
pelaajanPisteet.textContent = pisteet;

/*
 *
 * Tapahtumakäsittelijät.
 */

// Asetuksien näppäimet.
nimi.addEventListener('click', kysyNimi);
muutaKoko.addEventListener('click', kysyKoko);
aloitus.addEventListener('click', aloitaPeli);

/*
 *
 * Metodit.
 */

// Kysytään pelaajan nimi.
function kysyNimi() {
   // Kysytään nimi. 
   let syote = prompt("Anna nimesi, vähintään 2 merkkiä", "Oma nimesi");
    
   if ( 1 < syote.length  ) {
      pelaajanNimi.innerHTML = syote;
        
   }
   else {
      alert("Nimi on liian lyhyt.");
      kysyNimi();
   }
}

// Kysytään pelialueen koko.
function kysyKoko() {
   // Käyttäjälät kysyminen.
   let syote = parseInt(prompt("Anna pelialueen koko, vähintään 3 merkkiä", "3"));
        
   if ( 2 < syote ) {
      koko = syote;
      aloitaPeli();
   }
   else {
      alert("anna pidempi koko");
      kysyKoko();
   }
}

// Alustetaa ja luodaan pelialue.
function pelialueenAlustus(koko) {
   
   // Poistetaan edellinen pelialue.
   if ( ekaKierros == false){
      peliAlue=[];
      
		while (alue.firstChild) {
         alue.removeChild(alue.firstChild);
      }
   }
   
   // Muuttujan alustus.
   let kokoPelialueelle ="";
   
   // Silmukka, jotta saadan oikea määrä "auto" asetuksia.
   for (var i = 0; i < koko; i ++) {
      kokoPelialueelle +="auto "
   }
   
   // Asetetaan div elementeille auto-asetus.
   alue.style.gridTemplateColumns = kokoPelialueelle;

   // Luodaan div- elementit.
   for (var i = 0; i < koko; i++) {
       for (var j = 0; j < koko; j++) {
           var div = document.createElement("div");
           div.style.backgroundSize="100%";
           div.style.backgroundRepeat="no-repeat";
           div.style.backgroundPosition = "center center";
           var solu = div;
           document.querySelector(".gamearea").appendChild(div);
           peliAlue.push(solu);
       }
   }
}

// Painikkeiden tapahtumkäyselijät.
vasen.addEventListener('click', liikuVasen);
ylos.addEventListener('click', liikuYlos);
alas.addEventListener('click', liikuAlas);
oikea.addEventListener('click', liikuOikea);

// Nuolinäppäinten tapahtumakyselijät.
window.addEventListener("keydown", moveSomething, false);




function arvoAarteet() {
      
   for (var i = 0; i < peliAlue.length; i++) {
      let numero = Math.floor(Math.random() * 10);
      if (i == sijainti) {
         aarteet.push(0);
         }
      else {
         aarteet.push(numero);
      }
   }
}

/*
 * Metodi jolla täytetään pelialue.
 */
function lisaaAarteet() {

   // Arvotaan aarteet aarre taulukkoon.
   arvoAarteet();
      
   // Tarkistetaan että pelialueelle tulee vähintään yksi aarre.
   if (aarteet.indexOf(9) == -1 || aarteet.indexOf(8) == -1) {
      aarteet = [];
      lisaaAarteet();
   }
   // Sijoitetaan aarteet pelialueelle.
   else {
      for (var i = 0; i < peliAlue.length; i++) {
      
         // Ei aarretta pelaajan paikalle.
         if (i == sijainti) {         
            peliAlue[i].style.backgroundColor = "green";
            peliAlue[i].style.backgroundImage = pelaajanKuva; 
         }
      
         else {
            if (aarteet[i] == 9) {
               peliAlue[i].style.backgroundColor = "grey";
               peliAlue[i].style.backgroundImage = aarrePun; 
            }
            else if (aarteet[i] == 8) {
               peliAlue[i].style.backgroundColor = "grey";
               peliAlue[i].style.backgroundImage = aarreKel; 
            }
            else {
               peliAlue[i].style.backgroundColor = "grey";
               peliAlue[i].style.backgroundImage = null; 
            }
         }
      }
   }
}

/*
 * Metodi jolla luetaan näppäinkomennot.
 */
function moveSomething(e) {
   switch(e.keyCode) {
      case 37:
      // Vasen.
      liikuVasen();
      break;
   case 38:
      // Ylös.
      liikuYlos();
      break;
   case 40:
      // Alas.
      liikuAlas()
      break; 
   case 39:
      // Oikea.
      liikuOikea()
      break; 
   }   
}

/*
 * Liikkuminen pelialueella.
 */
function liikuVasen() {
   if ( 1 < pituus ) {
      edellinen = nykyinen;
      edellinen.style.backgroundColor = "grey";
      edellinen.style.backgroundImage = null; 
      sijainti -= 1;
      pituus -= 1;
      nykyinen = peliAlue[sijainti];
      nykyinen.style.backgroundColor = "green";
      nykyinen.style.backgroundImage = pelaajanKuva; 
      keraaAarteet(sijainti);
   }
}

function liikuYlos() {
   if ( 1 < korkeus ) {
      edellinen = nykyinen;
      edellinen.style.backgroundColor = "grey";
      edellinen.style.backgroundImage = null; 
      sijainti -= koko;
      korkeus -= 1;
      nykyinen = peliAlue[sijainti];
      nykyinen.style.backgroundColor = "green";
      nykyinen.style.backgroundImage = pelaajanKuva; 
      keraaAarteet(sijainti);
   }
}

function liikuAlas() {
   if ( korkeus < koko ) {
      edellinen = nykyinen;
      edellinen.style.backgroundColor = "grey";
      edellinen.style.backgroundImage = null; 
      sijainti += koko;
      korkeus += 1;
      nykyinen = peliAlue[sijainti];
      nykyinen.style.backgroundColor = "green";
      nykyinen.style.backgroundImage = pelaajanKuva; 
      keraaAarteet(sijainti);
   }
}

function liikuOikea() {
   if ( pituus < koko ) {
      edellinen = nykyinen;
      edellinen.style.backgroundColor = "grey";
      edellinen.style.backgroundImage = null; 
      sijainti += 1;
      pituus += 1;
      nykyinen = peliAlue[sijainti];
      nykyinen.style.backgroundColor = "green";
      nykyinen.style.backgroundImage = pelaajanKuva; 
      keraaAarteet(sijainti);
   }
}

/*
 * Metodi jolla kerätään aarteita pelialueelta.
 */
function keraaAarteet(sijainti) {
   // Tarkistetaan että löytyykö aarretta kyseiseltä paikalta.
   if (aarteet[sijainti] == 9) {
      // Poistetaan aarre paikalta.
      aarteet[sijainti] = 0;
      // Lisätään pisteitä.
      pisteet += 100;
      // Lisätään pisteet pelaajalle.
      pelaajanPisteet.textContent = pisteet;
   }
   else if (aarteet[sijainti] == 8) {
      // Poistetaan aarre paikalta.
      aarteet[sijainti] = 0;
      // Lisätään pisteitä.
      pisteet += 50;
      // Lisätään pisteet pelaajalle.
      pelaajanPisteet.textContent = pisteet;
   }
}

/*
 * Aloitetaan uusi peli.
 */
function aloitaPeli() {
   // Poistetaan tervehdysteksti.
   tervehdys.textContent ="";
   
   // Luodaan uusi pelialue.
   pelialueenAlustus(koko);
   
   // Tarkistetaan onko saatu pelialueen koko pariton.
   let parillinen = onkoPariton(koko);
   
   // Metodi parittomuuden tarkistamista varten.
   function onkoPariton(koko) {
     return isNaN(koko) && koko !== false && koko !== true ? false : koko% 2 == 0;
   }
   
   // Jos ekakierros, muutetaan tekstejä.
   if (ekaKierros == true) {
      aika();
      aloitus.textContent = "Aloita alusta";
      muutaKoko.textContent = "Muuta kokoa";
   }
   
   // Jos luku oli pariton, aloituspaikka on eri kuin parillisella.
   if ( parillinen != true ) {
      sijainti = Math.ceil((koko*koko-1)/2);
      pituus = Math.ceil(koko/2);
      korkeus = Math.ceil(koko/2);
   }
   else {
      sijainti = koko*koko/2-koko/2;
      pituus = koko/2+1;
      korkeus = koko/2;
   }
   
   // Asetetaan pelaaja pelialueelle.
   nykyinen = peliAlue[sijainti];
   // Lisätään aarteen paikalleen.
   lisaaAarteet();
   // Pelaajan pisteiden alustus.
   pisteet = 0;
   // Näytetään pisteet.
   pelaajanPisteet.textContent = pisteet;
   // Aloitetaan uusi ajastus.
   ajastus()
   // Ekakierros ohi.
   ekaKierros = false;
}

// Asetetaan aika aarteiden satunnaiseen vaihteluun.
function aika() {
   var myVar = setInterval(ajastus, 2000);
}

// Vaihdetaan aarteiden järjestys.
function ajastus() {      
      aarteet = [];
      lisaaAarteet();
}

// Estetään  ruuduun liikkuminen nuolinäppäimillä.
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false); 