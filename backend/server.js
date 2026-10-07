const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "DevOps Backend is running",
    status: "success"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP"
  });
});

app.get("/api/users", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Sousheel"
    },
    {
      id: 2,
      name: "DevOps User"
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
