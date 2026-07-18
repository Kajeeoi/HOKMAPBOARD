// ==========================================
// HOK Strategy Board V2
// ==========================================

const board = document.getElementById("board");
const roles = document.querySelectorAll(".role");

const resetBtn = document.getElementById("resetBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");

const sizeSlider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");


// ==========================================
// Posisi Awal
// ==========================================

const START_POSITION = {

    "blue-jgl":{x:30,y:90},
    "blue-mid":{x:30,y:170},
    "blue-farm":{x:30,y:250},
    "blue-clash":{x:30,y:330},
    "blue-roam":{x:30,y:410},

    "red-jgl":{x:0,y:90,right:true},
    "red-mid":{x:0,y:170,right:true},
    "red-farm":{x:0,y:250,right:true},
    "red-clash":{x:0,y:330,right:true},
    "red-roam":{x:0,y:410,right:true}

};


// ==========================================
// Pasang Posisi Awal
// ==========================================

function setupRoles(){

    roles.forEach(role=>{

        const pos=START_POSITION[role.id];

        role.style.top=pos.y+"px";

        if(pos.right){

            role.style.right="30px";
            role.style.left="auto";

        }else{

            role.style.left=pos.x+"px";
            role.style.right="auto";

        }

    });

}

window.onload=setupRoles;


// ==========================================
// DRAG SYSTEM
// ==========================================

let currentRole=null;

let offsetX=0;
let offsetY=0;


roles.forEach(role=>{

    role.addEventListener("pointerdown",startDrag);

});


function startDrag(e){

    currentRole=e.target;

    currentRole.setPointerCapture(e.pointerId);

    const rect=currentRole.getBoundingClientRect();

    offsetX=e.clientX-rect.left;
    offsetY=e.clientY-rect.top;

    currentRole.style.cursor="grabbing";
    currentRole.style.zIndex=9999;
    currentRole.style.transform="scale(1.08)";

}


document.addEventListener("pointermove",moveRole);

function moveRole(e){

    if(!currentRole) return;

    const boardRect=board.getBoundingClientRect();

    let x=e.clientX-boardRect.left-offsetX;
    let y=e.clientY-boardRect.top-offsetY;

    const maxX=board.clientWidth-currentRole.offsetWidth;
    const maxY=board.clientHeight-currentRole.offsetHeight;

    x=Math.max(0,Math.min(x,maxX));
    y=Math.max(0,Math.min(y,maxY));

    currentRole.style.left=x+"px";
    currentRole.style.top=y+"px";
    currentRole.style.right="auto";

}


document.addEventListener("pointerup",endDrag);

function endDrag(){

    if(!currentRole) return;

    currentRole.style.cursor="grab";
    currentRole.style.transform="scale(1)";
    currentRole.style.zIndex=10;

    currentRole=null;

}


// ==========================================
// RESET
// ==========================================

resetBtn.onclick=()=>{

    setupRoles();

};


// ==========================================
// FULLSCREEN
// ==========================================

fullscreenBtn.onclick=()=>{

    if(!document.fullscreenElement){

        document.documentElement.requestFullscreen();

    }else{

        document.exitFullscreen();

    }

};


// ==========================================
// SLIDER UKURAN ICON
// ==========================================

sizeSlider.addEventListener("input",()=>{

    document.documentElement.style.setProperty(

        "--role-size",

        sizeSlider.value+"px"

    );

    sizeValue.innerHTML=sizeSlider.value+" px";

});


// ==========================================
// SHORTCUT
// ==========================================

document.addEventListener("keydown",(e)=>{

    switch(e.key.toLowerCase()){

        case "f":

            fullscreenBtn.click();

            break;

        case "r":

            resetBtn.click();

            break;

    }

});


// ==========================================
// Disable Default Drag
// ==========================================

document.querySelectorAll("img").forEach(img=>{

    img.draggable=false;

});