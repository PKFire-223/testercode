const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Mật khẩu thật chỉ nằm ở SERVER
const ADMIN_PASSWORD = "IE307";

app.use(cors());
app.use(express.json());

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body || {};

  if (password === ADMIN_PASSWORD) {
    return res.json({
      message: "Đăng nhập admin thành công. (server đã kiểm tra mật khẩu)",
      role: "admin",
    });
  }

  return res.status(401).json({
    message: "Sai mật khẩu admin.",
  });
});

app.listen(PORT, () => {
  console.log(`Admin server đang chạy tại http://localhost:${PORT}`);
});
