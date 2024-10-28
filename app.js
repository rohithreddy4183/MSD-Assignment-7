// Select DOM elements
const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
    {
        id: 1,
        title: "Air Force",
        price: 119,
        colors: [
            { code: "black", img: "./img/air.png" },
            { code: "darkblue", img: "./img/air2.png" },
        ],
    },
    {
        id: 2,
        title: "Air Jordan",
        price: 149,
        colors: [
            { code: "lightgray", img: "./img/jordan.png" },
            { code: "green", img: "./img/jordan2.png" },
        ],
    },
    {
        id: 3,
        title: "Blazer",
        price: 109,
        colors: [
            { code: "lightgray", img: "./img/blazer.png" },
            { code: "green", img: "./img/blazer2.png" },
        ],
    },
    {
        id: 4,
        title: "Crater",
        price: 129,
        colors: [
            { code: "black", img: "./img/crater.png" },
            { code: "lightgray", img: "./img/crater2.png" },
        ],
    },
    {
        id: 5,
        title: "Hippie",
        price: 99,
        colors: [
            { code: "gray", img: "./img/hippie.png" },
            { code: "black", img: "./img/hippie2.png" },
        ],
    },
];

let choosenProduct = products[0];

// Select product display elements
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

// Menu item click event to change product display
menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        // Change the current slide
        wrapper.style.transform = `translateX(${-100 * index}vw)`;

        // Update the selected product
        choosenProduct = products[index];

        // Update the product display
        currentProductTitle.textContent = choosenProduct.title;
        currentProductPrice.textContent = "$" + choosenProduct.price;
        currentProductImg.src = choosenProduct.colors[0].img;

        // Update color options
        currentProductColors.forEach((color, index) => {
            color.style.backgroundColor = choosenProduct.colors[index].code;
        });
    });
});

// Color selection event
currentProductColors.forEach((color, index) => {
    color.addEventListener("click", () => {
        currentProductImg.src = choosenProduct.colors[index].img;
    });
});

// Size selection event
currentProductSizes.forEach((size) => {
    size.addEventListener("click", () => {
        currentProductSizes.forEach((s) => {
            s.style.backgroundColor = "white";
            s.style.color = "black";
        });
        size.style.backgroundColor = "black";
        size.style.color = "white";
    });
});

// Payment popup handling
const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
    payment.style.display = "flex";
});

close.addEventListener("click", () => {
    payment.style.display = "none";
});

//mongodb added by surya 
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sneakers-store', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});

module.exports = mongoose;

