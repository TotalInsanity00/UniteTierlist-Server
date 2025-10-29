    import express from "express";
    import cors from "cors";
    import puppeteer from "puppeteer";

    const app = express();
    app.use(cors());
    app.use(express.json({ limit: "10mb" }));

    // Launch Puppeteer once when the server starts
    const browserPromise = puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    app.post("/generate-image", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send("Missing URL");
    }

    try {
        const browser = await browserPromise;
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });

        // Wait for the tier list element
        await page.waitForSelector(".tier-list");
        const element = await page.$(".tier-list");

        // Take a screenshot of just the element
        const screenshot = await element.screenshot({ type: "png" });
        res.setHeader("Content-Type", "image/png");
        res.send(screenshot);

        await page.close();
    } catch (err) {
        console.error("Error generating image:", err);
        res.status(500).send("Failed to generate image");
    }
    });

    app.listen(3000, () =>
    console.log("✅ Puppeteer server running at http://localhost:3000")
    );
