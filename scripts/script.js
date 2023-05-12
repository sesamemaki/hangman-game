window.addEventListener("DOMContentLoaded", () => {
  async function fetchData() {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?number=1"
    );
    const data = await response.json();
    console.log(data[0].split(""));

    const wordLoop = data[0].split("");
    for (let letter of wordLoop) {
      const blankSpan = document.createElement("span");
      const letterDiv = document.querySelector("#letter-div");
      blankSpan.innerText = "_ ";
      letterDiv.appendChild(blankSpan);
    }

    const letterButtons = document.querySelectorAll("main button");
    // console.log(letterButtons)
    letterButtons.forEach((button) => {
      button.addEventListener("click", letterFunction);
    });

    function letterFunction(e) {
      // console.log(e.target.innerText)
      for (let letter of data[0]) {
        console.log(letter); //tek tek tüm harfler

        if (letter.includes(e.target.innerText)) {
          //   let indexLetter = data[0].indexOf(letter);
          const blankSpans = document.querySelectorAll("span");
          for (let blankSpan of blankSpans) {
            if (
              Array.from(blankSpans).indexOf(blankSpan) ===
              data[0].indexOf(letter)
            ) {
              blankSpan.innerText = e.target.innerText;
            }
          }
        }
      }
    }
  }

  fetchData();
});
