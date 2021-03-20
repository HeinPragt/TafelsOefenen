
var opga = new Array(10);
var opgb = new Array(10);
var opgc = new Array(10);
var vak = new Array(10);
var ant = new Array(10);
var opl = new Array(10);
var totaal = 0;
var tafel = 2;
var random = false;
var current_ant = 0;   // 0..9

// ------------------------------
// get all element of classname
// ------------------------------

function getByClassName(classname){
var rv = []; 
var elems  = document.getElementsByTagName('*');

  if (elems.length){
    for (var x in elems ) {
      if (elems[x] && elems[x].className && elems[x].className === classname) {
	rv.push(elems[x]);
      }
    }
  }
  return rv; 
}

 
// ------------------------------
// Vul oefening in
// ------------------------------

function oefenen()
{
var r,c,aa,bb,cc,i;

  for (i=0;i<10;i++) {
    opga[i] = i + 1;
    opgb[i] = tafel;
    opgc[i] = opga[i] * opgb[i];
  }
  if (random === true) {
    for (i=0;i<10;i++) {
      r = Math.floor(Math.random()*10);
      c = Math.floor(Math.random()*10);
      aa = opga[r];
      bb = opgb[r];
      cc = opgc[r]; 
      opga[r] = opga[c];
      opgb[r] = opgb[c];
      opgc[r] = opgc[c];         
      opga[c] = aa;
      opgb[c] = bb;
      opgc[c] = cc;  
    }
  }
}


// ------------------------------
// Controleer de antwoorden
// ------------------------------

function controle()
{
var i;
  current_ant = -1;
  showfocus();    
  document.reken.butControle.disabled = true;
  for(i=0;i<10;i++) {
    ant[i].disabled = true;
    opl[i].disabled = false;
    if ((ant[i].value.toString() === opgc[i].toString()) && (ant[i].value !== "")) {	
      opl[i].value="Goed!";
      opl[i].style.color = "green";
      totaal++;
    }	
    else {
      opl[i].value = opgc[i];
      opl[i].style.color = "red";
    }
  }
  document.reken.score.value = totaal;
}


// ----------------------------------
// Handel input onscreen keyboard af
// ----------------------------------

function inp(val) {
    
  if (val >= 0 && val <= 9) {
   ant[current_ant].value += val.toLocaleString();
   ant[current_ant].focus();
   ant[current_ant].blur();
   showfocus();      
   return;
  }
  if (val === 11) {
    ant[current_ant].value = "";
    ant[current_ant].focus();
    ant[current_ant].blur();
    showfocus();         
    return;
  } 
  if (val === 12) {
    current_ant++;
    current_ant %= 10;    
    ant[current_ant].focus();
    ant[current_ant].blur();    
    showfocus();         
    return; 
  } 

}


// ------------------------------
// Handel enter code op input af
// ------------------------------

function entercode (x) {
  var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode === 13) {
      current_ant++;
      current_ant %= 10;
      ant[current_ant].focus();
      ant[current_ant].blur();      
      showfocus();           
    } 
    else
      return true;
}      


// ------------------------------
// Set focus en onthoud veld
// ------------------------------

function setfocus(val) {
  current_ant = val;
  ant[current_ant].focus();
  ant[current_ant].blur();
  showfocus();    
}

// ------------------------------
// Show focus en onthoud veld
// ------------------------------

function showfocus() {
var i;
  for(i=0;i<10;i++) {
    if (i === current_ant)
      ant[i].style.backgroundColor = "#80ff80";
    else  
      ant[i].style.backgroundColor = "#ffffff";  
  }
}

// ------------------------------
// Initaliseer spel
// ------------------------------

function init(taf,ran)
{
var i;
    
 tafel = taf;
 random = ran;
 totaal = 0;
 document.reken.butControle.disabled = false;
 vak = getByClassName("tekstvak");
 ant = getByClassName("antwoordvak");
 opl = getByClassName("oplvak");
 for (i=0;i<10;i++) {
   ant[i].disabled = false;
   opl[i].disabled = true;
   ant[i].value="";
   opl[i].value="";
 }
 document.reken.score.value="";
 oefenen();
 for (i=0;i<10;i++) {
  vak[i].value = opga[i] + " x " + opgb[i] + " =";
 }
 current_ant = 0;
 ant[current_ant].focus();
 ant[current_ant].blur();    
}

// ------------------------------
// Toon uitleg scherm
// ------------------------------

function uitleg() {
  document.getElementById('outer').style.display="none";
  document.getElementById('uitleg').style.display="block";
}

// ------------------------------
// Verberg uitleg scherm
// ------------------------------

function eindeuitleg() {
  document.getElementById('outer').style.display="block";
  document.getElementById('uitleg').style.display="none";
}

// ------------------------------
// Initiele waarde
// ------------------------------

init(2,false);
