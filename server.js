import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/generate-image", async (req, res) => {
  const { url } = req.body;
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.waitForSelector(".tier-list");
  const element = await page.$(".tier-list");
  const screenshot = await element.screenshot({ type: "png" });
  res.setHeader("Content-Type", "image/png");
  res.send(screenshot);
});


app.listen(3000, () =>
  console.log("✅ Puppeteer server running at http://localhost:3000")
);
