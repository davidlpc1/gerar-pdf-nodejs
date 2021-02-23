const express = require("express");
const ejs = require("ejs");
const path = require("path");
const puppeteer = require("puppeteer");
const app = express();

const PORT = process.env.PORT || 3000;

const passengers = [
  {
    name: "Joyce",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Brock",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Eve",
    flightNumber: 7859,
    time: "18h00",
  },
];

app.get('/pdf',async(req,res) => {
  try {
    const browser = await puppeteer.launch({ headless:true })
    const page = await browser.newPage();
  
    await page.goto('http://localhost:3000',{
      waitUntil: 'networkidle0'
    })
  
    const pdf = await page.pdf({
      printBackground: true,
      format:'letter',
      margin: {
        top: '20px',
        bottom: '40px',
        left: '20px',
        right: '20px',
      }
    });
  
    await browser.close();
  
    res.contentType("application/pdf")
  
    return res.send(pdf);
  }catch(err){
    return res.send(err)
  }
})

app.get("/", (req, res) => {
  const htmlFilePath = path.join(__dirname, "print.ejs");
  ejs.renderFile(htmlFilePath, { passengers }, (error, html) => {
    if (error) return res.send({ error, message: "Error on html reading" });

    return res.send(html)
  });
});

app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
});
