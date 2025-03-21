const path = require("path");
require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const clientRoute = require("./routes/clientRoute");
const supplierRoute = require("./routes/supplierRoute");
const qualityRoute = require("./routes/qualityRoute");
const colorRoute = require("./routes/colorRoute");
const stoneRoute = require("./routes/stoneRoute");
const jewelleryRoute = require("./routes/jewelleryRoute");
const lottRoute = require("./routes/lottRoutes");

// Database
connectDB();

// Port
const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://diamond-gdwr.onrender.com",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/client", clientRoute);
app.use("/api/supplier", supplierRoute);
app.use("/api/quality", qualityRoute);
app.use("/api/color", colorRoute);
app.use("/api/stone", stoneRoute);
app.use("/api/jewellery", jewelleryRoute);
app.use("/api/lots", lottRoute);

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.join(_dirname, "client","dist","index.html"));
})

// app listening
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`.bgMagenta.white)
);
