// =========================================
// HOK Strategy Board V3
// =========================================

const board = document.getElementById("board");

const map = document.getElementById("map");

const roles = document.querySelectorAll(".role");

const resetBtn = document.getElementById("resetBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");

const sizeSlider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");


// =========================================
// DRAG
// =========================================

let activeRole = null;

let offsetX = 0;
let offsetY = 0;

roles.forEach(role => {

    role.addEventListener("pointerdown", startDrag);

});


function startDrag(e){

    activeRole = e.target;

    activeRole.setPointerCapture(e.pointerId);

    const rect = activeRole.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    activeRole.style.zIndex = 9999;

}


document.addEventListener("pointermove", dragRole);

function dragRole(e){

    if(!activeRole) return;

    const boardRect = board.getBoundingClientRect();

    let x = e.clientX - boardRect.left - offsetX;
    let y = e.clientY - boardRect.top - offsetY;

    const maxX = board.clientWidth - activeRole.offsetWidth;
    const maxY = board.clientHeight - activeRole.offsetHeight;

    x = Math.max(0, Math.min(maxX, x));
    y = Math.max(0, Math.min(maxY, y));

    activeRole.style.left = x + "px";
    activeRole.style.top = y + "px";

}


document.addEventListener("pointerup", () => {

    if(!activeRole) return;

    activeRole.style.zIndex = 10;

    activeRole = null;

});


// =========================================
// RESET
// =========================================

function resetRoles(){

    const isMobile = window.innerWidth <= 768;

    if(isMobile){

        document.getElementById("blue-jgl").style.left="5%";
        document.getElementById("blue-mid").style.left="5%";
        document.getElementById("blue-farm").style.left="5%";
        document.getElementById("blue-clash").style.left="5%";
        document.getElementById("blue-roam").style.left="5%";

        document.getElementById("red-jgl").style.left="85%";
        document.getElementById("red-mid").style.left="85%";
        document.getElementById("red-farm").style.left="85%";
        document.getElementById("red-clash").style.left="85%";
        document.getElementById("red-roam").style.left="85%";

    }else{

        document.getElementById("blue-jgl").style.left="30px";
        document.getElementById("blue-mid").style.left="30px";
        document.getElementById("blue-farm").style.left="30px";
        document.getElementById("blue-clash").style.left="30px";
        document.getElementById("blue-roam").style.left="30px";

        document.getElementById("red-jgl").style.left="calc(100% - 90px)";
        document.getElementById("red-mid").style.left="calc(100% - 90px)";
        document.getElementById("red-farm").style.left="calc(100% - 90px)";
        document.getElementById("red-clash").style.left="calc(100% - 90px)";
        document.getElementById("red-roam").style.left="calc(100% - 90px)";

    }

    const startY = [100,190,280,370,460];

    roles.forEach((role,index)=>{

        role.style.top = startY[index % 5] + "px";

    });

}

resetBtn.onclick = resetRoles;

window.onload = resetRoles;

window.onresize = resetRoles;


// =========================================
// FULLSCREEN
// =========================================

fullscreenBtn.onclick = () => {

    if(!document.fullscreenElement){

        document.documentElement.requestFullscreen();

    }else{

        document.exitFullscreen();

    }

};


// =========================================
// ICON SIZE
// =========================================

sizeSlider.addEventListener("input",()=>{

    document.documentElement.style.setProperty(

        "--role-size",

        sizeSlider.value + "px"

    );

    sizeValue.textContent = sizeSlider.value + " px";

});


// =========================================
// SHORTCUT
// =========================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="f") fullscreenBtn.click();

    if(e.key==="r") resetBtn.click();

});


// =========================================
// DISABLE DEFAULT IMAGE DRAG
// =========================================

document.querySelectorAll("img").forEach(img=>{

    img.draggable=false;

});
