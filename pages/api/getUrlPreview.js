const puppeteer = require("puppeteer");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    // await page.screenshot({ path: "example.png" });
    const data = await page.evaluate(() => {
      const title = document.querySelector("title").innerText;
      const description = document
        .querySelector("meta[property='og:description']")
        .getAttribute("content");
      const image = document
        .querySelector("meta[property='og:image']")
        .getAttribute("content");

      return { title, description, image };
    });
    await browser.close();
    res.status(200).json({ status: "success", data, url });
  } else {
    res
      .status(400)
      .json({ status: "fail", error_message: "Method not allowed" });
  }
}
