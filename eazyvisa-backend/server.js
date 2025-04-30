import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 بيانات Supabase (غيّرهم من بياناتك الحقيقية)
const supabaseUrl = "https://sxbbvpjbrjfnatyagtea.supabase.co";  // Project URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4YmJ2cGpicmpmbmF0eWFndGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzg5NTAsImV4cCI6MjA2MTYxNDk1MH0.GKb0keimRK5graZrIBn2QuH7qKtGJgjDwWLbx0sUPYI";             // Anon public key
const supabase = createClient(supabaseUrl, supabaseKey);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("EazyVisa API is live ✅");
});

app.post("/api/visa-request", async (req, res) => {
  const { fullName, email, passportNumber } = req.body;

  const { data, error } = await supabase
    .from("visa_requests")
    .insert([{ 
      full_name: fullName,
      email: email,
      passport_number: passportNumber
    }]);

  if (error) {
    console.error("❌ Error:", error.message);
    return res.status(500).json({ message: "حدث خطأ أثناء الحفظ" });
  }

  res.json({ message: "تم استلام الطلب وحفظه بنجاح ✅", data });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
