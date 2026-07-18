// ==========================================
// HOK Strategy Board V1
// ==========================================

// ==========================
// ELEMENT
// ==========================

const body = document.body;

const board = document.getElementById("board");

const roles = document.querySelectorAll(".role");

const slider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");

const desktopBtn = document.getElementById("desktopMode");
const tabletBtn = document.getElementById("tabletMode");
const mobileBtn = document.getElementById("mobileMode");

const fullscreenBtn = document.getElementById("fullscreenBtn");
const resetBtn = document.getElementById("resetBtn");


// ==========================
// VIEW MODE
// ==========================

desktopBtn.onclick = () => {

    body.className = "desktop";

};

tabletBtn.onclick = () => {

    body.className = "tablet";

};

mobileBtn.onclick = () => {

    body.className = "mobile";

};


// ==========================
// ICON SIZE
// ==========================

slider.addEventListener("input", () => {

    document.documentElement.style.setProperty(

        "--role-size",

        slider.value + "px"

    );

    sizeValue.textContent = slider.value + " px";

});


// ==========================
// FULLSCREEN
// ==========================

fullscreenBtn.onclick = () => {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();

    } else {

        document.exitFullscreen();

    }

};


// ==========================
// START POSITION
// ==========================

const startPosition = {

    "blue-jgl": { left: 20, top: 80 },
    "blue-mid": { left: 20, top: 160 },
    "blue-farm": { left: 20, top: 240 },
    "blue-clash": { left: 20, top: 320 },
    "blue-roam": { left: 20, top: 400 },

    "red-jgl": { right: 20, top: 80 },
    "red-mid": { right: 20, top: 160 },
    "red-farm": { right: 20, top: 240 },
    "red-clash": { right: 20, top: 320 },
    "red-roam": { right: 20, top: 400 }

};


// ==========================
// RESET
// ==========================

function resetRoles() {

    roles.forEach(role => {

        role.style.position = "absolute";

        role.style.left = "";
        role.style.right = "";

        const pos = startPosition[role.id];

        role.style.top = pos.top + "px";

        if (pos.left !== undefined) {

            role.style.left = pos.left + "px";

        }

        if (pos.right !== undefined) {

            role.style.right = pos.right + "px";

        }

    });

}

resetBtn.onclick = resetRoles;


// ==========================
// DRAG SYSTEM
// ==========================

let activeRole = null;

let offsetX = 0;
let offsetY = 0;

roles.forEach(role => {

    role.addEventListener("pointerdown", startDrag);

});


function startDrag(e) {

    activeRole = e.target;

    activeRole.setPointerCapture(e.pointerId);

    const rect = activeRole.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    activeRole.style.zIndex = "9999";

}


document.addEventListener("pointermove", dragMove);

function dragMove(e) {

    if (!activeRole) return;

    const boardRect = board.getBoundingClientRect();

    let x = e.clientX - boardRect.left - offsetX;
    let y = e.clientY - boardRect.top - offsetY;

    const maxX = board.clientWidth - activeRole.offsetWidth;
    const maxY = board.clientHeight - activeRole.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    activeRole.style.left = x + "px";
    activeRole.style.top = y + "px";
    activeRole.style.right = "auto";

}


document.addEventListener("pointerup", () => {

    if (!activeRole) return;

    activeRole.releasePointerCapture?.();

    activeRole.style.zIndex = "10";

    activeRole = null;

});


// ==========================
// DISABLE IMAGE DRAG
// ==========================

document.querySelectorAll("img").forEach(img => {

    img.draggable = false;

});


// ==========================
// INIT
// ==========================

window.onload = () => {

    resetRoles();

};
