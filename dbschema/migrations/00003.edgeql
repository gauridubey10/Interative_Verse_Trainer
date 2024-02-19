CREATE MIGRATION m1w5o4y54sl34pt3pubu5h4f3brhmrgkmf45vnbs6ceifjuwtdwddq
    ONTO m1nvqy24tlsw4vaya6f34t5kwcjue5722mw62wbi7btxqybo4sfoda
{
  ALTER TYPE default::Movie RENAME TO default::User;
  ALTER TYPE default::Person RENAME TO default::Verse;
  ALTER TYPE default::User {
      ALTER LINK actors {
          RENAME TO verseData;
      };
  };
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY firstName: std::str {
          SET REQUIRED USING ('Untitled');
      };
  };
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY lastName: std::str {
          SET REQUIRED USING ('Untitled');
      };
  };
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY password: std::str {
          SET REQUIRED USING ('Untitled');
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY title {
          RENAME TO email;
      };
  };
  ALTER TYPE default::Verse {
      ALTER PROPERTY name {
          RENAME TO reference;
      };
  };
  ALTER TYPE default::Verse {
      CREATE REQUIRED PROPERTY verse: std::str {
          SET REQUIRED USING ('Untitled');
      };
  };
};
