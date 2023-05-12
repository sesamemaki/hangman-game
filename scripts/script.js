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
        });

        const liveCounter = document.querySelector("#live-counter")

        function letterFunction(e) {
            const blankSpans = document.querySelectorAll("span")
            if (letterArray.includes(e.target.innerText)) {
                letterArray.forEach((letter, index) => {
                    if (letter === e.target.innerText) {
                        blankSpans[index].innerText = letter
                        e.target.disabled = true
                    }
                })
            }
        }
    }

    fetchData();
});
