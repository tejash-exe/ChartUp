// Db
import connectToDb from "./db/db.js";
// App
import app from "./app.js";
// Packages
import 'dotenv/config';

connectToDb()
.then( () => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on port ${process.env.PORT || 3000}`);
  });
})
.catch((error) => {
  console.log(error);
});