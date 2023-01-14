const axios = require("axios");

const getData = async (req, res, Country) => {
  await axios
    .get("https://restcountries.com/v3.1/all")
    .then((countries) => {
      countries = countries?.data.map((country) => ({
        nombre: country.name.common,
        id: country.cca3,
        bandera: country.flags.png,
        continente: country.region,
        subregion: country.subregion,
        capital: country.capital || "Null capital",
        area: country.area,
        poblacion: country.population,
      }));
      Country?.bulkCreate(countries);
      console.log("DB inicializada");
    })
    .then(() => Country?.findAll({ include: Activity }))
    .then((countries) => res.status(200).send(countries))
    .catch((error) => {
      console.log(error.cause);
      res
        .status(400)
        .send({ error: "Something went wrong while loading countries..." });
    });
};

module.exports = getData;
