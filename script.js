// ======================================
// HOK Strategy Board
// ======================================

// ===== ELEMENT =====

const board = document.getElementById("board");

const roles = document.querySelectorAll(".role");

const slider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");

const fullscreenBtn = document.getElementById("fullscreenBtn");
const resetBtn = document.getElementById("resetBtn");


// ===== ICON SIZE =====

slider.addEventListener("input", () => {

    document.documentElement.style.setProperty(
        "--role-size",
        slider.value + "px"
    );

    sizeValue.textContent = slider.value + "px";

});


// ===== FULLSCREEN =====

fullscreenBtn.addEventListener("click", () => {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();

    } else {

        document.exitFullscreen();

    }

});


// ===== SAVE START POSITION =====

const startPosition = [];

roles.forEach(role => {

    startPosition.push({

        element: role,

        parent: role.parentElement,
        nextSibling: role.nextElementSibling

    });

});


// ===== RESET =====

resetBtn.addEventListener("click", () => {

    startPosition.forEach(item => {

        item.element.style.position = "";
        item.element.style.left = "";
        item.element.style.top = "";
        item.element.style.zIndex = "";

        if (item.nextSibling) {

            item.parent.insertBefore(item.element, item.nextSibling);

        } else {

            item.parent.appendChild(item.element);

        }

    });

});


// ===== DRAG =====

let active = null;

let offsetX = 0;
let offsetY = 0;

roles.forEach(role => {

    role.addEventListener("pointerdown", startDrag);

});


function startDrag(e){

    active = e.target;

    const rect = active.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    board.appendChild(active);

    active.style.position = "absolute";

    active.style.left =
        rect.left - board.getBoundingClientRect().left + "px";

    active.style.top =
        rect.top - board.getBoundingClientRect().top + "px";

    active.style.zIndex = "999";

    active.setPointerCapture(e.pointerId);

}


document.addEventListener("pointermove", drag);


function drag(e){

    if(!active) return;

    const boardRect = board.getBoundingClientRect();

    let x = e.clientX - boardRect.left - offsetX;
    let y = e.clientY - boardRect.top - offsetY;

    x = Math.max(
        0,
        Math.min(
            x,
            board.clientWidth - active.offsetWidth
        )
    );

    y = Math.max(
        0,
        Math.min(
            y,
            board.clientHeight - active.offsetHeight
        )
    );

    active.style.left = x + "px";
    active.style.top = y + "px";

}


document.addEventListener("pointerup", () => {

    if(!active) return;

    active.releasePointerCapture?.();

    active = null;

});


// ===== DISABLE IMAGE DRAG =====

document.querySelectorAll("img").forEach(img=>{

    img.draggable=false;

});
