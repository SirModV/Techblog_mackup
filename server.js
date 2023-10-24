const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");

const helpers = require("./utils/helpers");
const routes = require("./controllers");

// creating express instance
const app = express();
app.use(express.static(path.join(__dirname, "public"))),
  app.use(express.json()),
  app.use(express.urlencoded({ extended: !0 }));
const expresshandlebars = require("express-handlebars"),
  hbs = expresshandlebars.create({ helpers });
app.engine("handlebars", hbs.engine), app.set("view engine", "handlebars");
const session = require("express-session"),
  SequelizeStore = require("connect-session-sequelize")(session.Store),
  // creating session object
  sess = {
    secret: "this is secret",
    cookie: { maxAge: 700000000 },
    rolling: !0,
    resave: !0,
    saveUninitialized: !0,
    store: new SequelizeStore({ db: sequelize }),
  };
app.use(session(sess));

app.use(routes);
const PORT = process.env.PORT || 3001;
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`app running on ${PORT}`));
});
