const allowedOrigins = [
  "http://localhost:3000", // <-- este es el que te falta
  "http://localhost:3001",
  "http://localhost:5173",
  "https://app-travell.vercel.app",
  "https://api-travell-kquh.onrender.com",
];

const setHeaders = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
};

module.exports = setHeaders;
