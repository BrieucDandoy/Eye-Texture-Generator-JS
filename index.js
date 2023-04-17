

document.getElementById("download").addEventListener('click', dlCanvas, false);

var changeColorCenter = document.getElementById("changeCenter");

var sliderRedCenter = document.getElementById("slideRed-center");
var sliderGreenCenter = document.getElementById("slideGreen-center");
var sliderBlueCenter = document.getElementById("slideBlue-center");
let test = 2;
var outputRedCenter = document.getElementById("valRed-center");
var outputGreenCenter = document.getElementById("valGreen-center");
var outputBlueCenter = document.getElementById("valBlue-center");

sliderRedCenter.oninput = function() {
    outputRedCenter.innerHTML = this.value;
    CENTER[0] = this.value;
    changeColorCenter.style.backgroundColor = "rgb(" + outputRedCenter.innerHTML + ","  + outputGreenCenter.innerHTML + "," + outputBlueCenter.innerHTML+")"
  }
  sliderGreenCenter.oninput = function() {
    outputGreenCenter.innerHTML = this.value;
    CENTER[1] = this.value;
    changeColorCenter.style.backgroundColor = "rgb(" + outputRedCenter.innerHTML + ","  + outputGreenCenter.innerHTML + "," + outputBlueCenter.innerHTML+")"
  }
  sliderBlueCenter.oninput = function() {
    outputBlueCenter.innerHTML = this.value;
    CENTER[2] = this.value;
    changeColorCenter.style.backgroundColor = "rgb(" + outputRedCenter.innerHTML + ","  + outputGreenCenter.innerHTML + "," + outputBlueCenter.innerHTML+")"
  }





var changeColorBackground = document.getElementById("change")

var sliderRedBackground = document.getElementById("slideRed");
var outputRedBackground = document.getElementById("valRed");

var sliderGreenBackground = document.getElementById("slideGreen");
var outputGreenBackground = document.getElementById("valGreen");

var sliderBlueBackground = document.getElementById("slideBlue");
var outputBlueBackground = document.getElementById("valBlue");

sliderRedBackground.oninput = function() {
    outputRedBackground.innerHTML = this.value;
    BACKGROUND[0] = this.value;
    changeColorBackground.style.backgroundColor = "rgb(" + outputRedBackground.innerHTML + ","  + outputGreenBackground.innerHTML + "," + outputBlueBackground.innerHTML+")"
  }

sliderGreenBackground.oninput = function() {
    outputGreenBackground.innerHTML = this.value;
    BACKGROUND[1] = this.value;
    changeColorBackground.style.backgroundColor = "rgb(" + outputRedBackground.innerHTML + ","  + outputGreenBackground.innerHTML + "," + outputBlueBackground.innerHTML+")"
  }


sliderBlueBackground.oninput = function() {
    outputBlueBackground.innerHTML = this.value;
    BACKGROUND[2] = this.value;
    changeColorBackground.style.backgroundColor = "rgb(" + outputRedBackground.innerHTML + ","  + outputGreenBackground.innerHTML + "," + outputBlueBackground.innerHTML+")"
  }



var btnMenuBase = document.getElementById("button-menu-base");
var btnMenuCenter = document.getElementById("button-menu-center");
var btnMenuSize = document.getElementById("button-menu-size");

var menuBase = document.getElementById("basic");
var menuCenter = document.getElementById("center");
var menuSize = document.getElementById("menu-size")


btnMenuBase.onclick = function() {
    menuCenter.setAttribute("hidden","hidden");
    menuSize.setAttribute("hidden","hidden");
    menuBase.removeAttribute("hidden");
}
btnMenuCenter.onclick = function() {
    menuBase.setAttribute("hidden","hidden");
    menuSize.setAttribute("hidden","hidden");
    menuCenter.removeAttribute("hidden");
}

btnMenuSize.onclick = function(){
    menuBase.setAttribute("hidden","hidden");
    menuCenter.setAttribute("hidden","hidden");
    menuSize.removeAttribute("hidden");

}



document.getElementById("black-circle-input").oninput = function(){
    document.getElementById("black-circle-size").innerHTML = this.value + " %";
    blackCircleLimit = this.value*radius/100;
}

document.getElementById("center-limit").oninput = function(){
    document.getElementById("center-size").innerHTML = this.value + " %";
    orangeLightLimit = this.value*radius/100;
}

document.getElementById("third-circle-limit").oninput = function(){
    document.getElementById("third-circle-size").innerHTML = this.value;
    reliefLimit = this.value*radius/100;
}

/*/document.getElementById("Xpos").oninput = function(){
    document.getElementById("Light-Xpos").innerHTML = this.value;
    RefletXpos = centreX + this.value;
}
document.getElementById("Ypos").oninput = function(){
    document.getElementById("Light-Ypos").innerHTML = this.value;
    RefletYpos = centreY + this.value;
}
/*/




const length = 500
const width = 500

defaultRadius = Math.min(length,width);

var radius = 249
const grid_size = 4


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var imageData = new ImageData(length, width);




let perlin2 = perlin
let centreX = length/2
let centreY = width/2
let COLOR_SCALE = 20
let orangeLightLimit = radius*0.66
let blackCircleLimit = radius*0.25
let reliefLimit = 0.90*radius



// COULEURS

let BACKGROUND = [127,127,127]

let CENTER = [127,127,127]

//reload()

function reload(){
    perlin2.seed();
    perlin.seed();

    basicColor();
    secondCircle();
    Noise2();
    reliefExt();
    reflet();
    
    context.putImageData(imageData, 0, 0);
}


function basicColor(){
for (var i=0;i<length;i++){
  for (var j=0;j<width;j++){
        let v = fbm(i,j,length,width,perlin);
        let r = distance(i,j,centreX,centreY)
        angle = Math.atan((width/2-j)/(length/2-i))
        if ((r<radius) && (r>blackCircleLimit)){
            vred=vblue=vgreen=1;
            if (document.getElementById("checkbox-red").checked) {vred=v;}
            if (document.getElementById("checkbox-green").checked) {vgreen=v;}
            if (document.getElementById("checkbox-blue").checked) {vblue=v;}



            setColor(i,j,BACKGROUND[0]*vred,BACKGROUND[1]*vgreen,BACKGROUND[2]*vblue,255)
        }
  }}}


function secondCircle(){
    for (var i=0;i<length;i++){
        for (var j=0;j<width;j++){
            let r = distance(i,j,centreX,centreY)
            let currentColor = getColor(i,j)
            if ((blackCircleLimit < r) && (orangeLightLimit > r)) {
                let a = (orangeLightLimit-r)/(orangeLightLimit-blackCircleLimit)
                let red = interpolation(a,currentColor[0],CENTER[0],false)
                let green = interpolation(a,currentColor[1],CENTER[1],false)
                let blue = interpolation(a,currentColor[2],CENTER[2],false)
                setColor(i,j,red,green,blue,255)}
}}
} 

function Noise2 (){
for (var i=0;i<length;i++){
    for (var j=0;j<width;j++){
    let currentColor = getColor(i,j)
    let r = distance(i,j,centreX,centreY)
    let angle = Math.atan((width/2-j)/(length/2-i))
    if ((r<radius) && (r>blackCircleLimit)){
    let v2 = fbm(0.2*r,angle,radius,0.5*3.14159,perlin2)
    let multPerlinNoise2 = 300

    let red = interpolation(0.3,currentColor[0],100+v2*multPerlinNoise2,false)
    let green = interpolation(0.3,currentColor[1],100+v2*multPerlinNoise2,false)
    let blue = interpolation(0.3,currentColor[2],100+v2*multPerlinNoise2,false)

    setColor(i,j,red,green,blue,255)}

    if (r < blackCircleLimit ){
        setColor(i,j,0,0,0,255)
    }
}}}






//relief exterieur

function reliefExt(){
for (var i=0;i<length;i++){
    for (var j=0;j<width;j++){
        let rayon=distance(i,j,centreX,centreY);
        let currentColor = getColor(i,j);
        if ((distance(i,j,centreX,centreY)<radius)&&(distance(i,j,centreX,centreY)>reliefLimit))   {
            let pct = (rayon-reliefLimit)/(radius-reliefLimit);
            let red = interpolation(pct,currentColor[0],50,false);
            let green = interpolation(pct,currentColor[1],50,false);
            let blue = interpolation(pct,currentColor[2],50,false);
            
            setColor(i,j,red,green,blue,255);}

        }}}


//reflet

RefletXpos = centreX + 60;
RefletYpos = centreY - 80;

function reflet(){
for (var i=0;i<length;i++){
    for (var j=0;j<width;j++){
        let currentColor = getColor(i,j);
        let rayonReflet = 80;
        let  CentreRefletX = RefletXpos;
        let CentreRefletY = RefletYpos;
        let rayon = distance(i,j,CentreRefletX,CentreRefletY);
        if (rayon < rayonReflet){
            let pct = 1-rayon/rayonReflet;
            let red = interpolation(pct,currentColor[0],255,true);
            let green = interpolation(pct,currentColor[1],255,true);
            let blue = interpolation(pct,currentColor[2],255,true);
            setColor(i,j,red,green,blue,255);
        }

    }}}







  function distance(x1,y1,x2,y2){
    return ((x1-x2)**2 + (y1-y2)**2)**0.5
}

function setColor(x,y,r,g,b,a){
  var index=4*(length*y+x)
  imageData.data[index]=r
  imageData.data[index+1]=g
  imageData.data[index+2]=b
  imageData.data[index+3]=a
}

function getColor(x,y){
    var index=4*(length*y+x)
    r=imageData.data[index]
    g=imageData.data[index+1]
    b=imageData.data[index+2]
    a=imageData.data[index+3]

    return[r,g,b,a]
}

function addColor(x,y,r,g,b,a){
var index=4*(length*y+x)
if (imageData.data[index]+r>255){imageData.data[index]=255}
else if (imageData.data[index]+r<0) {imageData.data[index]=0}
else {imageData.data[index]+=r}

if (imageData.data[index+1]+g>255){imageData.data[index+1]=255}
else if (imageData.data[index+1]+g<0) {imageData.data[index+1]=0}
else {imageData.data[index+1]+=g}

if (imageData.data[index+2]+b>255){imageData.data[index+2]=255}
else if (imageData.data[index+2]+b<0) {imageData.data[index+2]=0}
else {imageData.data[index+2]+=b}

if (imageData.data[index+3]+a>255){imageData.data[index+3]=255}
else if (imageData.data[index+3]+a<0) {imageData.data[index+3]=0}
else {imageData.data[index+3]+=a}
}




function interpolation(x,a,b,smooth){
    if (smooth){
        x = 6*x**5 - 15*x**4 + 10*x**3
    }
    if (a<b){
    return a + x*(b-a);}

    return (b + (1-x)*(a-b))
}
function fbm(i,j,length,width,perlin){
    let f = 0.05*parseInt((perlin.get(COLOR_SCALE*i/length, COLOR_SCALE*j/width) +1 ) / 2 * COLOR_SCALE);
        f+=0.025*parseInt((perlin.get(2*COLOR_SCALE*i/length, 2*COLOR_SCALE*j/width) +1 ) / 2 * COLOR_SCALE);
        f+=0.0125*parseInt((perlin.get(4*COLOR_SCALE*i/length, 4*COLOR_SCALE*j/width) +1 ) / 2 * COLOR_SCALE);
        f+=0.00625*parseInt((perlin.get(8*COLOR_SCALE*i/length, 8*COLOR_SCALE*j/width) +1 ) / 2 * COLOR_SCALE);
        f=f/0.9375
        return f
}


function dlCanvas() {
    var dt = canvas.toDataURL('image/png');
    /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
    dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
  
    /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
    dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
  
    this.href = dt;
  };

