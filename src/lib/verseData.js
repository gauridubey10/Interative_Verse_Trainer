import { v4 as uuidv4 } from 'uuid';

 const verse = [
    {
      "reference": "John 10:10",
      "verse": "A thief comes only to steal and kill and destroy. I have come so that they may have life and have it in abundance."
    },
    {
      "reference": "Philippians 4:13",
      "verse": "I can do all things through Christ who strengthens me."
    },
    {
      "reference": "Psalm 23:1",
      "verse": "The Lord is my shepherd; I shall not want."
    },
    {
      "reference": "Jeremiah 29:11",
      "verse": "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope."
    },
    {
      "reference": "Proverbs 3:5-6",
      "verse": "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths."
    }
  ]

  export const verseData = verse.map(entry => ({
    // _id: uuidv4(),
    reference: entry.reference,
    verse: entry.verse,
  }));
