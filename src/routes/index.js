const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRoutes = require("./country.js");
const activityRoutes = require("./activity.js");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countryRoutes);
router.use("/activities", activityRoutes);

router.get("/", (req, res) => {
  res.send("soy la ruta principal");
});

module.exports = router;
