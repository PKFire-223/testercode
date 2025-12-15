// ie307-server/server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ===== MẬT KHẨU THẬT ĐẶT Ở ĐÂY =====
const ADMIN_PASSWORD = "IE307";

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    return res.json({ ok: true, message: "Login OK", token: "demo-token-123" });
  }
  return res.status(401).json({ ok: false, message: "Wrong password" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`IE307 demo server running on http://localhost:${PORT}`);
});
