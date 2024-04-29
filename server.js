const express = require("express");
const app = express();
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const mongoose = require("mongoose");
const Game = require("./models/games.js");
app.use(express.urlencoded({ extended: false }));
const methodOverride = require("method-override");
const morgan = require("morgan"); 
app.use(methodOverride("_method")); 
app.use(morgan("dev")); 



// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
app.delete("/games/:gameId", async (req, res) => {
    await Game.findByIdAndDelete(req.params.gameId);
    res.redirect("/games");
  });
  

app.get("/games/:gameId/edit", async (req, res) => {
  const foundGame = await Game.findById(req.params.gameId);

  res.render("games/edit.ejs", {
    game: foundGame
  });

});

app.put('/games/:gameId', async (req,res) =>{
  await Game.findByIdAndUpdate(req.params.gameId,req.body)
  res.redirect(`/games`)
})

app.post("/games", async (req, res) => {
    // console.log(req.body);
    
      await Game.create(req.body);
    // res.redirect("fruits/new");
    res.redirect('/games')
  });
  app.get('/games', async (req,res) =>{
    const allGames = await Game.find()
    res.render("games/home.ejs", {games: allGames})
})
  app.get("/games/new",  (req, res) => {
    // res.send("This route sends the user a form page!");
    res.render("games/new.ejs");
  })


  app.get("/games/:gameId", async (req, res) => {
    const foundGame = await Game.findById(req.params.gameId)
    res.render("games/show.ejs", {
      game:foundGame
    })
    // console.log(foundGame); 
  });



























// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });
app.listen(3005, () => {
  console.log("Listening on port 3005");
});