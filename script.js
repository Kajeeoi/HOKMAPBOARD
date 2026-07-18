// ==========================================
// HOK Strategy Board V4
// ==========================================

// ---------- ELEMENT ----------
const body = document.body;

const board = document.getElementById("board");

const roles = document.querySelectorAll(".role");

const resetBtn = document.getElementById("resetBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");

const desktopBtn = document.getElementById("desktopMode");
const tabletBtn = document.getElementById("tabletMode");
const mobileBtn = document.getElementById("mobileMode");

const slider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");


// ==========================================
// VIEW MODE
// ==========================================

function setMode(mode){

    body.classList.remove("desktop");
    body.classList.remove("tablet");
    body.classList.remove("mobile");

    body.classList.add(mode);

}

desktopBtn.onclick = ()=>setMode("desktop");

tabletBtn.onclick = ()=>setMode("tablet");

mobileBtn.onclick = ()=>setMode("mobile");


// ==========================================
// ICON SIZE
// ==========================================

slider.addEventListener("input",()=>{

    document.documentElement.style.setProperty(

        "--role-size",

        slider.value+"px"

    );

    sizeValue.textContent = slider.value+" px";

});


// ==========================================
// FULLSCREEN
// ==========================================

fullscreenBtn.onclick = ()=>{

    if(!document.fullscreenElement){

        document.documentElement.requestFullscreen();

    }else{

        document.exitFullscreen();

    }

};
// ==========================================
// DRAG SYSTEM
// ==========================================

let activeRole = null;

let offsetX = 0;
let offsetY = 0;

roles.forEach(role=>{

    role.addEventListener("pointerdown",dragStart);

});


function dragStart(e){

    activeRole = e.target;

    activeRole.setPointerCapture(e.pointerId);

    const rect = activeRole.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    activeRole.style.zIndex = 9999;

}


document.addEventListener("pointermove",dragMove);

function dragMove(e){

    if(!activeRole) return;

    const boardRect = board.getBoundingClientRect();

    let x = e.clientX-boardRect.left-offsetX;
    let y = e.clientY-boardRect.top-offsetY;

    x = Math.max(0,Math.min(x,board.clientWidth-activeRole.offsetWidth));

    y = Math.max(0,Math.min(y,board.clientHeight-activeRole.offsetHeight));

    activeRole.style.position="absolute";

    activeRole.style.left=x+"px";

    activeRole.style.top=y+"px";

}


document.addEventListener("pointerup",()=>{

    if(!activeRole) return;

    activeRole.style.zIndex=10;

    activeRole=null;

});

// ==========================================
// RESET
// ==========================================

function resetIcons(){

    const blue = [

        "blue-jgl",
        "blue-mid",
        "blue-farm",
        "blue-clash",
        "blue-roam"

    ];

    const red = [

        "red-jgl",
        "red-mid",
        "red-farm",
        "red-clash",
        "red-roam"

    ];

    blue.forEach(id=>{

        const icon=document.getElementById(id);

        icon.removeAttribute("style");

    });

    red.forEach(id=>{

        const icon=document.getElementById(id);

        icon.removeAttribute("style");

    });

}

resetBtn.onclick = resetIcons;

window.onload = resetIcons;

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

        case "1":

            desktopBtn.click();

            break;

        case "2":

            tabletBtn.click();

            break;

        case "3":

            mobileBtn.click();

            break;

    }

});


// Disable Browser Drag
document.querySelectorAll("img").forEach(img=>{

    img.draggable=false;

});
