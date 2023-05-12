window.addEventListener("DOMContentLoaded", () => {
    async function fetchData() {
        const response = await fetch(
            "https://random-word-api.herokuapp.com/word?number=1"
        );
        const data = await response.json();
        console.log(data[0].split(""));

        const letterArray = data[0].split("");
        for (let letter of letterArray) {
            const blankSpan = document.createElement("span");
            const letterDiv = document.querySelector("#letter-div");
            blankSpan.innerText = "_ ";
            letterDiv.appendChild(blankSpan);
        }

        const letterButtons = document.querySelectorAll("main button");
        letterButtons.forEach((button) => {
            button.addEventListener("click", letterFunction);
            button.innerText = button.innerText.toUpperCase()
        });

        const liveCounter = document.querySelector("#live-counter");
        let counter = parseInt(liveCounter.innerText);

        console.log(counter);

        function letterFunction(e) {
            const blankSpans = document.querySelectorAll("#letter-div span");
            if (counter > 0) {
                if (letterArray.includes(e.target.innerText.toLowerCase())) {
                    letterArray.forEach((letter, index) => {
                        if (letter === e.target.innerText.toLowerCase()) {
                            blankSpans[index].innerText = letter.toUpperCase();
                            e.target.disabled = true;
                        }
                    });
                    if ([...blankSpans].every((blankSpan) => letterArray.includes(blankSpan.innerText.toLowerCase()))) {
                        const gameWin = document.createElement("p");
                        gameWin.innerText = `Congratulations!`;
                        gameWin.classList.add("text-3xl", "text-teal-600")
                        document.querySelector("section").prepend(gameWin);
                        letterButtons.forEach((button) => {
                            button.disabled = true;
                        });
                    }
                } else {
                    if (counter > 0) {
                        counter = --counter;
                        liveCounter.innerText = counter;
                        e.target.disabled = true;
                        Draw(draws[step++]);
                        if (undefined === draws[step]) this.disabled = true;
                    }
                }
            } if (counter === 0) {
                letterButtons.forEach((button) => {
                    button.disabled = true;
                });
                const gameOver = document.createElement("p");
                gameOver.innerText = `Game Over! The word was --> ${data[0].toUpperCase()}`;
                gameOver.classList.add("text-3xl", "text-teal-800")
                document.querySelector("section").prepend(gameOver);
            }
        }
    }

    const resetButton = document.querySelector("#play-again");
    resetButton.addEventListener("click", resetGame);

    function resetGame() {
        window.location.reload();
    }

    const canvas = document.getElementById("hangman");
    const context = canvas.getContext("2d");



    Draw = (part) => {
        switch (part) {
            case "gallows":
                context.strokeStyle = "#444";
                context.lineWidth = 10;
                context.beginPath();
                context.moveTo(175, 225);
                context.lineTo(5, 225);
                context.moveTo(40, 225);
                context.lineTo(40, 5);
                context.lineTo(100, 5);
                context.lineTo(100, 25);
                context.stroke();
                break;

            case "head":
                context.lineWidth = 5;
                context.beginPath();
                context.arc(100, 50, 25, 0, Math.PI * 2, true);
                context.closePath();
                context.stroke();
                break;

            case "eyes":
                context.lineWidth = 2;
                context.beginPath();
                context.moveTo(90, 45);
                context.arc(90, 45, 5, 0, Math.PI * 2, true); // left eye
                context.moveTo(110, 45);
                context.arc(110, 45, 5, 0, Math.PI * 2, true); // right eye
                context.stroke();
                break;


            case "body":
                context.lineWidth = 5;
                context.beginPath();
                context.moveTo(100, 75);
                context.lineTo(100, 140);
                context.stroke();
                break;

            case "rightHarm":
                context.beginPath();
                context.moveTo(100, 85);
                context.lineTo(60, 100);
                context.stroke();
                break;

            case "leftHarm":
                context.beginPath();
                context.moveTo(100, 85);
                context.lineTo(140, 100);
                context.stroke();
                break;

            case "rightLeg":
                context.beginPath();
                context.moveTo(100, 140);
                context.lineTo(80, 190);
                context.stroke();
                break;

            case "rightFoot":
                context.beginPath();
                context.moveTo(82, 190);
                context.lineTo(70, 185);
                context.stroke();
                break;

            case "leftLeg":
                context.beginPath();
                context.moveTo(100, 140);
                context.lineTo(125, 190);
                context.stroke();
                break;

            case "leftFoot":
                context.beginPath();
                context.moveTo(122, 190);
                context.lineTo(135, 185);
                context.stroke();
                break;
        }
    };

    const draws = [
        "gallows",
        "head",
        "eyes",
        "body",
        "rightHarm",
        "leftHarm",
        "rightLeg",
        "leftLeg",
        "rightFoot",
        "leftFoot",
    ];
    let step = 0;

    fetchData();
});
