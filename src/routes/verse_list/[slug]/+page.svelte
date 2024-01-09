<script>
  // @ts-nocheck
  import backgroundImg from '$lib/backgroundImg.webp';

  export let data;
  export let level = 1;
//  let updatedVerse = data?.verse?.verse;
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
    console.log(level,updatedVerse);
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
    console.log("NEXT CLICKKED");
    level = level + 1;
    removeTrailingLetter();
  };

  const handlePrevButton = () => {
    console.log("Prev CLICKKED");
    verseData = data?.verse?.verse;
    removeTrailingLetter();
    level = 1;
    lastLevel=false;
  };

  const handleShowButton = () => {
    console.log("Show CLICKKED");
    previousVerse = verseData;
    verseData = data?.verse?.verse;
  };

  const handleShowMouseLeave = () =>{
    console.log("mouse leave");
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
    <button class="ShowButton" on:mouseover={handleShowButton} on:mouseleave={handleShowMouseLeave}>Show</button>
    <div class="LevelButton-Container">
      <button class="Prev" on:click={handlePrevButton}>Prev</button>
      <div class="Level">Level {level}</div>
      <button class="Next" on:click={handleNextButton} disabled={lastLevel}>Next</button>
    </div>
  </div>
</div>

<style>


.VerseCard-Conatiner{
  height: 100vh;
  background-image: url("");
  background-size: cover;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-position: center;
}

  button{
    display: flex;
    margin: 1rem;
    padding: 1rem;
    border: 1px solid lightgreen;
    border-radius: 1rem;
    font-size: 1rem;
    background-color: lightgreen;
  }

  .Button-Container {
    display: flex;
    flex-direction: column;
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
    margin-bottom: 1.5rem;
  }

  .letter-box {
    width: 40px;
    height: 40px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    font-size: 18px;
    flex-direction: columns;
  }
</style>
