const express = require("express");
const cors = require("cors");
const weatherRouter = require("./routes/weatherRoutes");
const loginRouter = require("./routes/loginRoutes");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const PORT = process.env.PORT;

const app = express();

///////////////////////////////////////////
// MIDDLEWARE
app.use(cors());
app.use(express.json());

///////////////////////////////////////////
// ROUTES
app.use("/api/v1/weather", weatherRouter);
app.use("/api/v1/login", loginRouter);

app.listen(PORT, () => console.log(`App Listening on port ${PORT}`));
