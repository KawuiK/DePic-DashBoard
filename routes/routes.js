const { Router } = require("express");
const passport = require("../server/passport");
const { auth } = require("../util/middleware/auth");
const router = Router();
const Prefix = require("../util/models/prefix_db")
router.get("/", (req, res) => {
  res.render("home",{    
    user: req.user,
    esta: true,
    });
});

router.get("/login", passport.authenticate("discord"), (req, res) => {
  res.redirect("/");
});

router.get("/tienda/discord/login", passport.authenticate("discord"), (req, res) => {
  res.redirect("./web/compra/discordbot");
});
router.get("/cmd", (req, res) => {
  res.render("./web/cmd",{    
    user: req.user,
    esta: true,
    });
});
router.get("/FAQ", (req, res) => {
  res.render("./web/FaQ",{    
    user: req.user,
    esta: true,
    });
});
router.get("/Reglas", (req, res) => {
  res.render("./web/Reglas",{    
    user: req.user,
    esta: true,
    });
});
router.get("/rgl1", (req, res) => {
  res.render("./web/reglas/rgl1",{    
    user: req.user,
    esta: true,
    });
});
router.get("/rgl2", (req, res) => {
  res.render("./web/reglas/rgl2",{    
    user: req.user,
    esta: true,
    });
});
router.get("/rgl3", (req, res) => {
  res.render("./web/reglas/rgl3",{    
    user: req.user,
    esta: true,
    });
});
router.get("/tienda", (req, res) => {
  res.render("./web/tienda",{    
    user: req.user,
    esta: true,
    });
});
//Tienda
router.get("/tienda/existo", (req, res) => {
  res.render("./web/compra/discordbot",{    
    user: req.user,
    esta: true,
    });
  });
router.get("/tienda/discord/bot", (req, res) => {
  res.render("./web/compra/discordbot",{    
    user: req.user,
    esta: true,
    });
    router.get("/s", (req, res) => {
      res.render("./web/compra/discord/s",{    
        user: req.user,
        esta: true,
        });
    });
    router.get("/a", (req, res) => {
      res.render("./web/compra/discord/a",{    
        user: req.user,
        esta: true,
        });
    });
    router.get("/m", (req, res) => {
      res.render("./web/compra/discord/m",{    
        user: req.user,
        esta: true,
        });
    });
    router.get("/c", (req, res) => {
      res.render("./web/compra/discord/c",{    
        user: req.user,
        esta: true,
        });
    });
});
router.get("/tienda/", (req, res) => {
  res.render("./web/tienda",{    
    user: req.user,
    esta: true,
    });
});
router.get("/tienda", (req, res) => {
  res.render("./web/tienda",{    
    user: req.user,
    esta: true,
    });
});
router.get("/tienda", (req, res) => {
  res.render("./web/tienda",{    
    user: req.user,
    esta: true,
    });
});
router.get("/dash", auth, (req, res) => {
  
  let guilds = req.user.guilds.filter(p => (p.permissions & 8) === 8)
  let servidores = []
  for (const key in guilds) {
    if(req.BotClient.guilds.cache.get(guilds[key].id)){
      servidores.push({
        esta: true,
        id: req.BotClient.guilds.cache.get(guilds[key].id).id,
        name: req.BotClient.guilds.cache.get(guilds[key].id).name,
        icon: req.BotClient.guilds.cache.get(guilds[key].id).icon,

      })
    } else {
        servidores.push({
        esta: false,
        id: guilds[key].id,
        name: guilds[key].name,
        icon: guilds[key].icon,
      })
    }
  }
  res.render("../views/dash/dash",{
    user: req.user,
    esta: true,
    servidores,
  });
});
router.get("/dash/:id", auth, async (req, res) => {
  let id = req.params.id;
  let servidor = req.BotClient.guilds.cache.get(id);
  let custom;
  let data = await Prefix.findOne({Guild: req.params.id}).catch((err) => console.log(err))
  if (data) {
    custom = data.Prefix
  } else {
    return custom = "&"
  }
  res.render("../views/dash/dashserver", {
    user: req.user,
    servidor,
    prefixMostrar: custom
  });
  let prefixBuscar = await Prefix.findOne({Guild: req.params.id}) 
});
router.post("/dash/:id/prefix", (req, res) => {
  let newPrefixPages = req.body.prefix;
  let newPrefix = new Prefix({
    Guild: req.params.id,
    Prefix: newPrefixPages,
  })
  newPrefix.save((error, db) => {
    console.log(db)
  })
  res.redirect(`/dash/${req.params.id}`)
})
module.exports = router;
