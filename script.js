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
