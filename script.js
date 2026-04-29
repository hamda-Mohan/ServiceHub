import { services } from "./data/services.js";

const modal = document.getElementById("serviceModal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalPrice = document.getElementById("modal-price");
const modalStatus = document.getElementById("modal-status");
const container = document.querySelector('.card-container');

const toggleButton = document.querySelector('.toggle-button');
const navLinks = document.querySelector('.nav-links');

if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', (e) => {
        e.preventDefault();

        navLinks.classList.toggle('active');   // menu
        toggleButton.classList.toggle('active'); // icon animation
    });
}

const user = JSON.parse(localStorage.getItem("currentUser"));

const welUser = document.getElementById("welUser");
const welUserMobile = document.getElementById("welUserMobile");

const logoutBtn = document.getElementById("logoutBtn");
const logoutBtnMobile = document.getElementById("logoutBtnMobile");

if (user) {
    if (welUser) welUser.textContent = `Welcome, ${user.username}`;
    if (welUserMobile) welUserMobile.textContent = `Welcome, ${user.username}`;
} else {
    if (welUser) welUser.textContent = "Guest";
    if (welUserMobile) welUserMobile.textContent = "Guest";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "html/auth.html";
}

if (logoutBtn) logoutBtn.addEventListener("click", logout);
if (logoutBtnMobile) logoutBtnMobile.addEventListener("click", logout);

if (!user) {
    logoutBtn.style.display = "none";
}

let allItems = [];

services.forEach(service => {
    const categorydiv = document.createElement('div');
    categorydiv.className = `category ${service.class}`;
    const titLe = document.createElement('h3');
    titLe.textContent = service.category;
    const cards = document.createElement('div');
    cards.classList.add('cards');
    service.cards.forEach((item, index) => {
        const globalIndex = allItems.length;
        allItems.push(item);

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h4>${item.title}</h4>
        <button class="btn" data-index="${globalIndex}">More Info</button>
    `;
        cards.appendChild(card);
    });
    categorydiv.appendChild(titLe);
    categorydiv.appendChild(cards);
    container.appendChild(categorydiv);
})

let selectedItem = null;

container.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn")) {
        const user = JSON.parse(localStorage.getItem('currentUser'));

        if (!user) {
            alert("Please login to view details");
            window.location.href = "html/auth.html";
            return;
        }

        const index = e.target.dataset.index;
        const item = allItems[index];

        selectedItem = item;

        modal.style.display = "flex";

        modalImg.src = item.image;
        modalTitle.textContent = item.title;
        modalDesc.textContent = item.description;
        modalPrice.textContent = item.price;
        modalStatus.textContent = item.status;
        if (item.status === "Available") {
            modalStatus.style.color = "green";
        } else {
            modalStatus.style.color = "red";
        }
    }

});

document.querySelector(".close-btn").onclick = () => {
    modal.style.display = "none";
};
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

document.getElementById("bookNow").addEventListener("click", function () {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        alert("Please login first");
        window.location.href = "html/auth.html";
        return;
    }

    // save service
    localStorage.setItem("bookingService", JSON.stringify(selectedItem));

    window.location.href = "html/appointment.html";
});
