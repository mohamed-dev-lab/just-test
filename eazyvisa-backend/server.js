const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// اختبار بسيط
app.get("/", (req, res) => {
  res.send("EazyVisa API is working ✅");
});

// استلام طلب تأشيرة
app.post("/api/visa-request", (req, res) => {
  const { fullName, email, passportNumber } = req.body;
  console.log("New visa request:", { fullName, email, passportNumber });
  res.json({ message: "تم استلام الطلب بنجاح ✅" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
