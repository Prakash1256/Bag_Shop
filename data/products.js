const fs = require('fs');
const path = require('path');

const getImageBase64 = (imagePath) => {
    if (fs.existsSync(imagePath)) {
        return fs.readFileSync(imagePath).toString("base64");
    } else {
        console.warn(`File not found: ${imagePath}`);
        return null; // or return a default image base64 or an empty string
    }
};

const products = [
    {
        name: "Bag 1",
        price: 500,
        bgcolor: "#f8f8f8",
        panelcolor: "#333",
        textcolor: "#fff",
        image: getImageBase64(path.join(__dirname, "../public/images/1bag.png")),
    },
    {
        name: "Bag 2",
        price: 750,
        bgcolor: "#e0e0e0",
        panelcolor: "#555",
        textcolor: "#fff",
        image: getImageBase64(path.join(__dirname, "../public/images/2bag.png")),
    },
    {
        name: "Bag 3",
        price: 750,
        bgcolor: "#e0e0e0",
        panelcolor: "#555",
        textcolor: "#fff",
        image: getImageBase64(path.join(__dirname, "../public/images/3bag 1.png")),
    },
    {
        name: "Bag 4",
        price: 750,
        bgcolor: "#e0e0e0",
        panelcolor: "#555",
        textcolor: "#fff",
        image: getImageBase64(path.join(__dirname, "../public/images/4bag.png")),
    },
    {
        name: "Bag 5",
        price: 750,
        bgcolor: "#e0e0e0",
        panelcolor: "#555",
        textcolor: "#fff",
        image: getImageBase64(path.join(__dirname, "../public/images/5bag.png")),
    },
    {
        name: "Bag 5",
        price: 750,
        bgcolor: "#e0e0e0",
        panelcolor: "#555",
        textcolor: "#fff",
        image: getImageBase64(path.join(__dirname, "../public/images/6bag.png")),
    },
    {
        name: "Bag 5",
        price: 750,
        bgcolor: "#e0e0e0",
        panelcolor: "#555",
        textcolor: "#fff",
        image: getImageBase64(path.join(__dirname, "../public/images/7bag.png")),
    },
    {
        name: "Bag 5",
        price: 750,
        bgcolor: "#e0e0e0",
        panelcolor: "#555",
        textcolor: "#fff",
        image: getImageBase64(path.join(__dirname, "../public/images/image 80.png")),
    }
];

module.exports = products;
