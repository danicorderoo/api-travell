const { Router } = require("express");

const { Activity, Country } = require("../db");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res) => {
  try {
    const activitys = await Activity.findAll();
    res.status(200).send(activitys);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { nombre, dificultad, temporada, duracion, countries } = req.body;

  try {
    if (Object.keys(req.body).length < 5)
      throw new Error("Not enough information provided!");

    const countryName = await Activity?.findOne({
      where: { nombre: nombre },
    });

    console.log(countryName);
    if (!countryName) {
      const newActivity = await Activity.findOrCreate({
        where: {
          nombre,
          dificultad,
          temporada,
          duracion,
        },
      });
      await newActivity[0].setCountries(countries);
      res.send(newActivity);
    } else {
      console.log("An activity with that name already exists");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong..." });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deleteActivity = await Activity.findByPk(id);
  deleteActivity.destroy();
  res.status(200).send("actividad borrada");
});

module.exports = router;
