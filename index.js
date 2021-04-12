const express = require("express");
const conectDB = require("./config/db");
const cors = require("cors");

const app = express();

conectDB();

app.use(cors());

app.use(express.json({ extended: true }));

const port = process.env.PORT || 4000;

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/transactions", require("./routes/transactions"));

app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puesto ${port}`);
});
