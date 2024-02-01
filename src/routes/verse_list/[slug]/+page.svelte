<script>
  // @ts-nocheck

  export let data;
  export let level = 1;
  let wordsArray;
  let verseData = data?.verse?.verse;
  let lastLevel = false;
  let previousVerse;
  $:{
    wordsArray = verseData.split(" ");
  }

  const removeTrailingLetter = () => {
    const previousVerse = verseData;
   let updatedVerse = replaceLettersInParagraph(verseData, false , false);

    if (previousVerse == updatedVerse) {
      //if all trailing Letters are removed , remode first letter , else remove all trailing letters
        updatedVerse = checkTrailingLetterRemoved() ?replaceLettersInParagraph(updatedVerse, true , false):replaceLettersInParagraph(updatedVerse, false , true) ;
    }
    wordsArray = updatedVerse.split(" ");
    verseData = updatedVerse;
  };
  
  const checkTrailingLetterRemoved=()=>{
    for (let i = 0; i < wordsArray.length; i++) {
      for (let j = 1; j < wordsArray[i].length; j++) {
        if (wordsArray[i][j] !== "_") return false;
      }
    }
    return true;
  }


  function replaceLettersInParagraph(paragraph, removeAllLetters , removeAllTrailingLetter) {
    const words = paragraph.split(" ");
    
    // Replace letters in each word
    const modifiedWords = words.map((word) =>
      replaceLettersInWord(word, removeAllLetters , removeAllTrailingLetter)
    );

    // Join the modified words back into a paragraph
    const modifiedParagraph = modifiedWords.join(" ");
    return modifiedParagraph;
  }

  function replaceLettersInWord(word, removeAllLetters , removeAllTrailingLetter) {
    
    let replacedWord = removeAllLetters ? "_" : word.charAt(0);

    for (let j = 1; j < word.length; j++) {

      if (removeAllLetters) {
        replacedWord += word.charAt(j);
        lastLevel=true;
      } else {
        // Randomly decide whether to replace the letter
        const randomNumber = (Math.random() * 10) % 2;
        const letter = word.charAt(j);
         if (removeAllTrailingLetter || (letter !== "_" && Math.floor(randomNumber))) {
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
    lastLevel=false;
  };

  const handleShowButton = () => {
    previousVerse = verseData;
    verseData = data?.verse?.verse;
  };

  const handleShowMouseLeave = () =>{
    verseData = previousVerse;
  }

  function getLetters(word) {
    return word.split("");
  }
</script>

<div class="VerseCard-Conatiner" >
  <div class="VerseCard-Main">
    <h1>{data?.verse?.reference}</h1>
    <div id="verse-boxes">
      {#each wordsArray as word}
        <div class="word-box">
          {#each getLetters(word) as letter}
            <div class="letter-box ">{letter}</div>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <div class="Button-Container">
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <button class="ShowButton button-91" on:mouseover={handleShowButton} on:mouseleave={handleShowMouseLeave}>Show</button>
    <div class="LevelButton-Container">
      <button class="Prev button-91" on:click={handlePrevButton} disabled={level == 1}>
        <span class="material-symbols-outlined">
          keyboard_backspace
          </span></button>
      <div class="Level">Level {level}</div>
      <button class="next button-91" on:click={handleNextButton} disabled={lastLevel}>
         <span class="material-symbols-outlined">
          arrow_right_alt
          </span> 
        </button>
      <!-- <span class="Next material-symbols-outlined  button-91" on:click={handleNextButton} disabled={lastLevel}>
        arrow_right_alt
        </span> -->
    </div>
  </div>
</div>

<style>


.VerseCard-Conatiner{
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
  background-color: rgb(75, 121, 121 , 0.5);

  justify-content: center;
  align-items: center;
}

.VerseCard-Main{
  display: flex;
  margin: 2rem;
  flex-direction: column;
  font-family:Georgia, 'Times New Roman', Times, serif;
}

.VerseCard-Main h1{
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

  background-image: radial-gradient(93% 87% at 87% 89%, rgba(0, 0, 0, 0.23) 0%, transparent 86.18%), radial-gradient(66% 66% at 26% 20%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%);
  box-shadow: inset -3px -3px 9px rgba(255, 255, 255, 0.25), inset 0px 3px 9px rgba(255, 255, 255, 0.3), inset 0px 1px 1px rgba(255, 255, 255, 0.6), inset 0px -8px 36px rgba(0, 0, 0, 0.3), inset 0px 1px 5px rgba(255, 255, 255, 0.6), 2px 19px 31px rgba(0, 0, 0, 0.2);
  border-radius: 14px;
  font-weight: bold;
  font-size: 16px;

  border: 0;

  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  cursor: pointer;
}

  button{
    display: flex;
    /* margin: 1rem; */
    padding: 1rem 2.5rem;
    border: 1px solid #FFE5E5;
    border-radius: 1rem;
    font-size: 1.5rem;
    background-color: #365d37;
    cursor: pointer;
  }

  button:hover{
    background-color:#258763;;
    color: white;
    
  }

  button:disabled{
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
  
  .Level{
    border-bottom: 2px solid gray;
  }

  #verse-boxes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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

  .next{
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
</style>
