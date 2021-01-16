require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.static("assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//session initial configuration
app.use(session({
  secret: "ssss",
  resave: false,
  saveUninitialized: false
}));

//set up session with passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-Ke:password123!@cluster0.qi4ub.mongodb.net/User?retryWrites=true&w=majority", {
  useNewUrlParser: true
}, {
  useUnifiedTopology: true
});

mongoose.connection
  .once('open', () => console.log('Connected'))
  .on('error', (error) => {
    console.log("Your Error: ", error);
  });
mongoose.set('useUnifiedTopology', true);
mongoose.set("useCreateIndex", true);

// create user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  blacklist: [String]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Google oauth
passport.use(new GoogleStrategy({
    clientID: "1088629667656-cpffffoeck6elpa5dl9h21lvq2iurl96.apps.googleusercontent.com",
    clientSecret: "t79zAaCQZ2t6TuwtaPzOdA87",
    callbackURL: "http://childproof.herokuapp.com/auth/google/childproof",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      googleId: profile.id,
      username: profile.emails[0].value
    }, function(err, user) {
      return done(err, user);
    });
  }
));

// Google Sign in
app.get("/auth/google",
  passport.authenticate('google', {
    scope: ["profile", "email"]
  })
);

app.get("/auth/google/childproof",
  passport.authenticate('google', {
    failureRedirect: "/signIn"
  }),
  function(req, res) {
    res.redirect("/");
  });

// homepage
app.get("/", function(req, res) {
  if (req.isAuthenticated()) {
    res.sendFile(__dirname + "site.html")
  } else {
    res.redirect("/signIn");
  }
});

// signin
app.get("/signIn", function(req, res) {
  res.render("signIn");
})

//
// app.route("/user/:userId")
//   .get(function(req, res) {
//     user.findOne({
//       username: req.params.userID
//     }, function(err, foundUser) {
//       res.sendFile(__dirname + "/site.html");
//     })
//   })

// connects to webpage
app.listen(process.env.PORT || 3000, function() {

});
