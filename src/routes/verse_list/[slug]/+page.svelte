<script>
  export let data;
  export let level = 1;
  let updatedVerse = data?.verse?.verse;
  console.log(level,updatedVerse)
  
  const removeTrailingLetter = ()=>{
      const description = data?.verse?.verse;
      
    updatedVerse = replaceLettersInParagraph(description,level);
    console.log(level , updatedVerse);

  }

  function replaceLettersInParagraph(paragraph, level) {
    const words = paragraph.split(' ');

    // Replace letters in each word based on the current level
    const modifiedWords = words.map(word => replaceLettersInWord(word, level));

    // Join the modified words back into a paragraph
    const modifiedParagraph = modifiedWords.join(' ');

    return modifiedParagraph;
}

function replaceLettersInWord(word, level) {
    // If the level is less than the word length, replace letters
    if (level <= word.length) {
        // Replace trailing letters with underscores
        const replacedLetters = word.slice(0, -level+1) + '_'.repeat(level);

        return replacedLetters;
    } else {
        // If the level is equal to or greater than the word length,
        // replace all letters except the first one
        //return word.charAt(0) + word.slice(1).replace(/[a-zA-Z]/g, '_');
        // return word.slice(0)
        // return '_';

        return word.slice(1).replace(/[a-zA-Z]/g, '_');
    }
}

  const handleNextButton = ()=>{
    console.log("NEXT CLICKKED");
    level = level + 1;
    removeTrailingLetter();

  }

  const handlePrevButton = ()=>{
    console.log("Prev CLICKKED");
    level = 1;
  }

  const handleShowButton = ()=>{
    console.log("Show CLICKKED")
  }

</script>

<div class="VerseCard-Conatiner">
  <div class="VerseCard-Main">
    <h1>{data?.verse?.reference}</h1>
    <div>{updatedVerse}</div>
  </div>

  <div class="Button-Container">
     <button class="ShowButton" on:click={handleShowButton}>Show</button>
     <div class="LevelButton-Container">
        <button class="Prev" on:click={handlePrevButton}>Prev</button>
        <div class="Level">Level {level}</div>
        <button class="Next" on:click={handleNextButton}>Next</button>
     </div>
  </div>
</div>

<style>
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
</style>
