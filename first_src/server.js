const express = require("express");
const ejs = require("ejs");
const path = require("path");
const htmlPdf = require("html-pdf");
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

app.get("/", (req, res) => {
  const htmlFilePath = path.join(__dirname, "print.ejs");
  ejs.renderFile(htmlFilePath, { passengers }, (error, html) => {
    if (error) return res.send({ error, message: "Error on html reading" });

    const htmlPdfOptions = {
      height: "11.25in",
      width: "8.5in",
      header: {
        height: "20mm",
      },
      footer: {
        height: "20mm",
      },
    };

    const pdfCreated = htmlPdf.create(html, htmlPdfOptions);
    pdfCreated.toFile("report.pdf", (error, data) => {
      if (error) return res.send({ error, message: "Error on pdf generator" });

      return res.send({ message: "PDF generated successfully", data });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
});
