module default {
  type User {
    required property firstName -> str;
    required property lastName -> str;
    required property email -> str;
    required property password -> str;
    multi link verseData -> Verse;
  }

  type Verse {
     required property reference -> str;
     required property verse -> str;
  }
};