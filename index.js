import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();

// const resend = new Resend(process.env.RESEND_API_KEY);
const resend = new Resend("re_ErBE28MQ_CveCfXjbfDVMt4erBk8KKKDH");

console.log(resend);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.post("/send-otp", async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    const response = await resend.emails.send({
        from: "emrms <support@emrms.online>",
        to: [email],
        subject: subject,
        html: message,
    });

    if (!response) {
      return res.status(500).json({ message: "Failed to send email" });
    }

    if (!response.error) {
      return res.status(500).json({ message: "Failed to send email" });
    }

    res.status(200).json({ message: "Email sent successfully", response });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
});


app.listen(process.env.PORT || 5000, () => {});

export default app;
