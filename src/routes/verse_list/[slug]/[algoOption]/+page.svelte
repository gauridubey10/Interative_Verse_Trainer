<script>
  // @ts-nocheck
  import { AlgorithmType } from "$lib/constant.js";
  import { onDestroy } from "svelte";
  export let data;
  export let level = 1;
  let wordsArray;
  let verseData = data?.verse?.verse;
  let lastLevel = false;
  let previousVerse;
  let algoType = data.algoType;
  let initaldropBoxesValue;
  let userTypedWord = "";
  let prevuserTypedWord = userTypedWord;
  $: {
    wordsArray = verseData.split(" ");
  }
  let sentence = verseData;
  let jumbledWords = [];
  let dropBoxes = Array.from({
    length: sentence.split(" ").length,
  }).map(() => ({
    textContent: "",
    classList: [],
  }));
  let timeLimit = 120;
  const timeDecrease = 30;
  let timeRemaining = 120; // Initial time in seconds
  let timerInterval;
  // jumble word logic .............
  function jumbleWords() {
    jumbledWords = sentence.split(" ").sort(() => Math.random() - 0.5);
  }
  $: minutes = Math.floor(timeRemaining / 60);
  $: seconds = timeRemaining % 60;
  $: {
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timeRemaining = 0;
    }
  }
  onDestroy(() => {
    clearInterval(timerInterval); // Clear the interval when the component is destroyed
  });
  function resetGame() {
    clearInterval(timerInterval);
    if (level < 5) {
      timeLimit = 120 - (level - 1) * timeDecrease;
    } else timeLimit = timeLimit - 10;
    timeRemaining = timeLimit;
    if (timeLimit === 10) lastLevel = true;
  }
  function timeVerseAlgo() {
    resetGame();
    timerInterval = setInterval(() => {
      timeRemaining--;
      if (timeRemaining === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }
  const handleTimeShowButton = () => {
    prevuserTypedWord = userTypedWord;
    userTypedWord = verseData;
  };
  const handleTimeShowMouseLeave = () => {
    userTypedWord = prevuserTypedWord;
  };
  const handleTimePrevButton = () => {
    level = 1;
    timeVerseAlgo();
  };
  const handleTimeNextButton = () => {
    level = level + 1;
    timeVerseAlgo();
  };
  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.textContent);
  }
  function handleDrop(event, index) {
    event.preventDefault();
    const draggedWord = event.dataTransfer.getData("text/plain").trim();
    const correctWord = sentence.split(" ")[index];
    const isCorrect = correctWord === draggedWord;
    if (!dropBoxes[index]) {
      dropBoxes[index] = document.createElement("div");
    }
    if (isCorrect) {
      const dropBoxClass = document.getElementsByClassName("drop-box");
      dropBoxes[index].textContent = draggedWord;
      dropBoxClass[index].i;
      const wordContainer = document.getElementById("word-jumble");
      const wordIndex = Array.from(wordContainer.children).findIndex(
        (word) => word.textContent.trim() === draggedWord
      );
      if (wordIndex !== -1) {
        wordContainer.removeChild(wordContainer.children[wordIndex]);
      }
    } else {
      dropBoxes[index].classList = ["incorrect"];
    }
  }
  const handleJumbleShowButton = () => {
    initaldropBoxesValue = dropBoxes;
    dropBoxes = verseData.split(" ").map((word) => ({
      textContent: word,
      classList: [],
    }));
  };
  const handleJumbleShowMouseLeave = () => {
    dropBoxes = initaldropBoxesValue;
  };
  function handleDragOver(event) {
    event.preventDefault();
  }
  //.................
  //trailing letter logic
  const removeTrailingLetter = () => {
    const previousVerse = verseData;
    let updatedVerse = replaceLettersInParagraph(verseData, false, false);
    if (
      level == 10 &&
      (algoType == AlgorithmType.FIRSTLETTER ||
        algoType == AlgorithmType.LASTLETTER ||
        algoType == algoType.RANDOMLETTER)
    ) {
      updatedVerse = replaceLettersInParagraph(updatedVerse, false, true);
      lastLevel = true;
    } else if (previousVerse == updatedVerse) {
      //if all trailing Letters are removed , remode first letter , else remove all trailing letters
      updatedVerse = checkTrailingLetterRemoved()
        ? replaceLettersInParagraph(updatedVerse, true, false)
        : replaceLettersInParagraph(updatedVerse, false, true);
    }
    wordsArray = updatedVerse.split(" ");
    verseData = updatedVerse;
  };
  const checkTrailingLetterRemoved = () => {
    for (let i = 0; i < wordsArray.length; i++) {
      for (let j = 1; j < wordsArray[i].length; j++) {
        if (wordsArray[i][j] !== "_") return false;
      }
    }
    return true;
  };
  function replaceLettersInParagraph(
    paragraph,
    removeAllLetters,
    removeAllTrailingLetter
  ) {
    const words = paragraph.split(" ");
    let modifiedWords;
    if (algoType == AlgorithmType.RANDOMLETTER) {
      // Replace letters in each word
      modifiedWords = words.map((word) =>
        replaceRandomLettersInWord(
          word,
          removeAllLetters,
          removeAllTrailingLetter
        )
      );
    } else if (algoType == AlgorithmType.FIRSTLETTER) {
      modifiedWords = words.map((word) =>
        replaceStartLettersInWord(
          word,
          removeAllLetters,
          removeAllTrailingLetter
        )
      );
    } else if (algoType == AlgorithmType.LASTLETTER) {
      modifiedWords = words.map((word) =>
        replaceLastLettersInWord(
          word,
          removeAllLetters,
          removeAllTrailingLetter
        )
      );
    } else if (algoType == AlgorithmType.REMOVEWORD) {
      modifiedWords = removeWordinParagraph(paragraph);
    }
    // Join the modified words back into a paragraph
    const modifiedParagraph = modifiedWords.join(" ");
    return modifiedParagraph;
  }
  function removeWordinParagraph(paragraph) {
    const wordPosition = level - 1;
    const words = paragraph.split(" ");
    if (level === words.length) lastLevel = true;
    const wordToReplaced = words[wordPosition].split("");
    for (let i = 0; i < wordToReplaced.length; i++) {
      wordToReplaced[i] = "_";
    }
    words[wordPosition] = wordToReplaced.join("");
    return words;
  }
  function replaceLastLettersInWord(
    word,
    removeAllLetters,
    removeAllTrailingLetter
  ) {
    let replacedWord = "";
    let oneLetterReplaced = false;
    for (let j = word.length - 1; j >= 0; j--) {
      if (removeAllLetters) {
        replacedWord += word.charAt(j);
        lastLevel = true;
      } else {
        // Randomly decide whether to replace the letter
        const letter = word.charAt(j);
        if (removeAllTrailingLetter) {
          replacedWord += "_";
        } else if (
          !oneLetterReplaced &&
          (removeAllTrailingLetter || letter !== "_")
        ) {
          replacedWord += "_";
          oneLetterReplaced = true;
        } else {
          replacedWord += word.charAt(j);
        }
      }
    }
    return replacedWord.split("").reverse().join("");
  }
  function replaceStartLettersInWord(
    word,
    removeAllLetters,
    removeAllTrailingLetter
  ) {
    let replacedWord = "";
    let oneLetterReplaced = false;
    for (let j = 0; j < word.length; j++) {
      if (removeAllLetters) {
        replacedWord += word.charAt(j);
        lastLevel = true;
      } else {
        // Randomly decide whether to replace the letter
        const letter = word.charAt(j);
        if (removeAllTrailingLetter) {
          replacedWord += "_";
        } else if (
          !oneLetterReplaced &&
          (removeAllTrailingLetter || letter !== "_")
        ) {
          replacedWord += "_";
          oneLetterReplaced = true;
        } else {
          replacedWord += word.charAt(j);
        }
      }
    }
    return replacedWord;
  }
  function replaceRandomLettersInWord(
    word,
    removeAllLetters,
    removeAllTrailingLetter
  ) {
    let replacedWord = removeAllLetters ? "_" : word.charAt(0);
    for (let j = 1; j < word.length; j++) {
      if (removeAllLetters) {
        replacedWord += word.charAt(j);
        lastLevel = true;
      } else {
        // Randomly decide whether to replace the letter
        const randomNumber = (Math.random() * 10) % 2;
        const letter = word.charAt(j);
        if (
          removeAllTrailingLetter ||
          (letter !== "_" && Math.floor(randomNumber))
        ) {
          replacedWord += "_";
        } else {
          replacedWord += word.charAt(j);
        }
      }
    }
    return replacedWord;
  }
  const handleNextButton = () => {
    level = level + 1;
    removeTrailingLetter();
  };
  const handlePrevButton = () => {
    verseData = data?.verse?.verse;
    removeTrailingLetter();
    level = 1;
    lastLevel = false;
  };
  const handleShowButton = () => {
    previousVerse = verseData;
    verseData = data?.verse?.verse;
  };
  const handleShowMouseLeave = () => {
    verseData = previousVerse;
  };
  function getLetters(word) {
    return word.split("");
  }
  if (algoType == AlgorithmType.JUMBLEWORD) {
    jumbleWords();
  } else if (algoType == AlgorithmType.TIME_SECOND_ALGO) {
    timeVerseAlgo();
  } else {
    removeTrailingLetter();
  }
</script>

{#if algoType == AlgorithmType.JUMBLEWORD}
  <div class="VerseCard-Conatiner">
    <div class="VerseCard-Main">
      <h1>{data?.verse?.reference}</h1>
      <div id="verse-boxes-jumble">
        <h3>Drag and drop words in correct order!!</h3>
        <div id="word-jumble" class="word-container">
          {#each jumbledWords as word, index (index)}
            <div
              on:dragstart={handleDragStart}
              draggable="true"
              class="word-box-jumble"
            >
              {word}
            </div>
          {/each}
        </div>
        <div id="drop-area" class="drop-area">
          {#each Array.from({ length: sentence.split(" ").length }) as _, index}
            <div
              on:dragover={handleDragOver}
              on:drop={(event) => handleDrop(event, index)}
              class="drop-box"
            >
              {dropBoxes[index].textContent || ""}
            </div>
          {/each}
        </div>
        <button
          class="ShowButton button-91"
          on:mouseover={handleJumbleShowButton}
          on:mouseleave={handleJumbleShowMouseLeave}>Show</button
        >
      </div>
    </div>
  </div>
{:else if algoType == AlgorithmType.TIME_SECOND_ALGO}
  <div class="VerseCard-Conatiner">
    <div class="VerseCard-Main">
      <h1>{data?.verse?.reference}</h1>
      <div id="verse-boxes">
        {#if timeRemaining > 0}
          {#each wordsArray as word}
            <div class="word-box">
              {#each getLetters(word) as letter}
                <div class="letter-box">{letter}</div>
              {/each}
            </div>
          {/each}
          <!-- {/if} -->
        {:else}
          <textarea
            class="verseInputBox"
            type="text"
            bind:value={userTypedWord}
            placeholder="Type verse....."
          />
        {/if}
      </div>
    </div>
    <div class="timeBox">
      <p id="timer">
        Time remaining: {minutes}:{seconds < 10 ? "0" : ""}{seconds}
      </p>
    </div>
    <div class="Button-Container">
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <button
        class="ShowButton button-91"
        on:mouseover={handleTimeShowButton}
        on:mouseleave={handleTimeShowMouseLeave}
        disabled={timeRemaining > 0}>Show</button
      >
      <div class="LevelButton-Container">
        <button
          class="Prev button-91"
          on:click={handleTimePrevButton}
          disabled={level == 1}
        >
          <span class="material-symbols-outlined">
            keyboard_backspace
          </span></button
        >
        <div class="Level">Level {level}</div>
        <button
          class="next button-91"
          on:click={handleTimeNextButton}
          disabled={lastLevel}
        >
          <span class="material-symbols-outlined"> arrow_right_alt </span>
        </button>
      </div>
    </div>
  </div>
{:else}
  <div class="VerseCard-Conatiner">
    <div class="VerseCard-Main">
      <h1>{data?.verse?.reference}</h1>
      <div id="verse-boxes">
        {#each wordsArray as word}
          <div class="word-box">
            {#each getLetters(word) as letter}
              <div class="letter-box">{letter}</div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
    <div class="Button-Container">
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <button
        class="ShowButton button-91"
        on:mouseover={handleShowButton}
        on:mouseleave={handleShowMouseLeave}>Show</button
      >
      <div class="LevelButton-Container">
        <button
          class="Prev button-91"
          on:click={handlePrevButton}
          disabled={level == 1}
        >
          <span class="material-symbols-outlined">
            keyboard_backspace
          </span></button
        >
        <div class="Level">Level {level}</div>
        <button
          class="next button-91"
          on:click={handleNextButton}
          disabled={lastLevel}
        >
          <span class="material-symbols-outlined"> arrow_right_alt </span>
        </button>
      </div>
    </div>
  </div>
{/if}
Footer

<style>
  .VerseCard-Conatiner {
    display: flex;
    position: absolute;
    top: 10vh;
    width: 100%;
    flex-direction: column;
    min-height: 90vh;
    background-image: url("");
    background-size: cover;
    overflow: hidden;
    background-position: center;
    /* background-color: #FFE5E5; */
    background-color: rgb(75, 121, 121, 0.5);
    justify-content: center;
    align-items: center;
  }
  .VerseCard-Main {
    display: flex;
    margin: 2rem;
    flex-direction: column;
    font-family: Georgia, "Times New Roman", Times, serif;
  }
  .VerseCard-Main h1 {
    display: flex;
    justify-content: center;
    font-size: 3rem;
  }
  .button-91 {
    color: #fff;
    padding: 15px 25px;
    /* background-color: #789461; */
    background-color: #3ac08e;
    background-image: linear-gradient(102deg, #3ac08e 0%, #789461 100%);
    background-image: radial-gradient(
        93% 87% at 87% 89%,
        rgba(0, 0, 0, 0.23) 0%,
        transparent 86.18%
      ),
      radial-gradient(
        66% 66% at 26% 20%,
        rgba(255, 255, 255, 0.55) 0%,
        rgba(255, 255, 255, 0) 69.79%,
        rgba(255, 255, 255, 0) 100%
      );
    box-shadow:
      inset -3px -3px 9px rgba(255, 255, 255, 0.25),
      inset 0px 3px 9px rgba(255, 255, 255, 0.3),
      inset 0px 1px 1px rgba(255, 255, 255, 0.6),
      inset 0px -8px 36px rgba(0, 0, 0, 0.3),
      inset 0px 1px 5px rgba(255, 255, 255, 0.6),
      2px 19px 31px rgba(0, 0, 0, 0.2);
    border-radius: 14px;
    font-weight: bold;
    font-size: 16px;
    border: 0;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    cursor: pointer;
  }
  button {
    display: flex;
    /* margin: 1rem; */
    padding: 1rem 2.5rem;
    border: 1px solid #ffe5e5;
    border-radius: 1rem;
    font-size: 1.5rem;
    background-color: #365d37;
    cursor: pointer;
  }
  button:hover {
    background-color: #258763;
    color: white;
  }
  button:disabled {
    background-color: rgb(186, 232, 211);
    color: grey;
  }
  .Button-Container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
  }
  .ShowButton {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100px;
    margin: 0 auto;
  }
  .LevelButton-Container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 20px;
    font-size: 1.5rem;
    align-items: center;
  }
  .Level {
    border-bottom: 2px solid gray;
  }
  #verse-boxes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  #verse-boxes-jumble {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .word-box {
    display: flex;
    flex-direction: columns;
    border: 2px solid skyblue;
    margin-right: 1.5rem;
    margin-bottom: 1rem;
  }
  .letter-box {
    width: 30px;
    height: 30px;
    margin: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    font-size: 18px;
    flex-direction: columns;
  }
  .next {
    display: flex;
    align-items: center;
  }
  @media only screen and (max-width: 767px) {
    .letter-box {
      width: 15px;
      height: 15px;
      font-size: 10px;
    }
    .word-box {
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
  #word-jumble {
    margin-top: 20px;
  }
  .word-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 20px;
  }
  .word-box-jumble {
    width: auto;
    min-width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0 8px;
  }
  .incorrect {
    border: 2px solid lightcoral;
    border-radius: 4px;
  }
  .drop-area {
    /* padding: 2rem; */
    width: auto;
    height: auto;
    border: 2px dashed #aaa;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 20px;
  }
  .drop-box {
    width: auto;
    min-width: 40px;
    height: 60px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.5rem;
    margin: 4px 8px;
    padding: 0 8px;
  }
  .correct {
    /* font-size: 5rem; */
    background-color: lightgreen;
  }
  .timeBox {
    font-size: 1.5rem;
    margin-top: 0;
  }
  textarea {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    margin-top: 10px;
    width: 80vw;
    /* Set your preferred width */
    /* min-height: fit-content; */
    height: 25vh;
    box-sizing: border-box;
    resize: none;
    transition: height 0.3s;
    /* Add transition for smooth height change */
    font-size: 1.5rem;
  }
</style>
