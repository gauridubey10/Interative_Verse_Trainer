import * as edgedb from "edgedb";

const client = edgedb.createClient();

async function main() {
  await client.execute(`
    insert User {
        firstName := "gauri",
        lastName := "dubey",
        email := "g@gmail.com",
        password := '1234',
        verseData := {
            (insert Verse {
                reference := "John 3:16",
                verse := "For God so loved the world that he gave his one and only son, that whoever"
            }),
            (insert Verse {
                reference := "Romans 8:28",
                verse := "And we know that in all things God works for the good of those who love him"
            })
        }
    }
  `);

  await client.execute(`
  insert User {
      firstName := "gauri",
      lastName := "dubey",
      email := "a@gmail.com",
      password := '1234',
      verseData := {
          (insert Verse {
              reference := "John 3:16",
              verse := "For God so loved the world that he gave his one and only son, that whoever"
          }),
          (insert Verse {
              reference := "Romans 8:28",
              verse := "And we know that in all things God works for the good of those who love him"
          })
      }
  }
`);
}

main();