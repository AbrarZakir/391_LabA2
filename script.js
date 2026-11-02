const fortunes = [
    "A small step today can lead to a great achievement tomorrow.",
    "Your patience will bring a rewarding surprise.",
    "A new opportunity will come when you least expect it.",
    "Kindness you share will find its way back to you.",
    "Keep learning; your next idea may be your best one.",
    "A challenge ahead will reveal a strength you did not know you had.",
    "Good things grow from consistent effort.",
    "An open mind will lead you to an unexpected solution.",
    "Someone will appreciate your help more than you realize.",
    "Trust your progress, even when it feels slow."
];

const fortuneBox = document.getElementById("fortune-box");
const fortuneText = document.getElementById("fortune-text");
const colorButtons = document.querySelectorAll(".color-buttons button");

const randomIndex = Math.floor(Math.random() * fortunes.length);
fortuneText.textContent = fortunes[randomIndex];


const themes = {
    green: {
        color: "#174526",
        backgroundColor: "#e5f3df",
        borderColor: "#3f7a29",
        fontSize: "19px",
        fontFamily: "Georgia, serif"
    },
    yellow: {
        color: "#614900",
        backgroundColor: "#fff3bf",
        borderColor: "#997000",
        fontSize: "21px",
        fontFamily: "Verdana, sans-serif"
    },
    blue: {
        color: "#173f70",
        backgroundColor: "#e0efff",
        borderColor: "#3269a0",
        fontSize: "18px",
        fontFamily: "Arial, sans-serif"
    },
    orange: {
        color: "#783610",
        backgroundColor: "#ffead8",
        borderColor: "#b75a1d",
        fontSize: "22px",
        fontFamily: "'Trebuchet MS', sans-serif"
    }
};

colorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const theme = themes[button.dataset.theme];

        fortuneBox.style.color = theme.color;
        fortuneBox.style.backgroundColor = theme.backgroundColor;
        fortuneBox.style.borderColor = theme.borderColor;
        fortuneBox.style.fontSize = theme.fontSize;
        fortuneBox.style.fontFamily = theme.fontFamily;

        colorButtons.forEach(function (colorButton) {
            colorButton.setAttribute("aria-pressed", String(colorButton === button));
        });
    });
});
