const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3012;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const ara = req.query.search || "";

  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server Error");
      return;
    }

    let cars = JSON.parse(data); //JSON formatından JavaScript nesnesine çevirir. 

    cars = cars.filter(
      (car) =>
        car?.marka?.includes(ara) ||
        car?.model?.includes(ara) ||
        car?.donanim?.includes(ara) ||
        car?.motor?.includes(ara) ||
        car?.yakit?.includes(ara) ||
        car?.vites?.includes(ara) ||
        car?.fiyat?.includes(ara) ||
        car?.websitesi?.includes(ara)   //car nesnesi veya özellikleri undefined ise, hata atmadan işlemi devam ettirir.
    );

    res.render("anasayfa", { cars, ara });
  });
});

app.get("/iletisim", (req, res) => {
  res.render("iletisim");
});

app.post("/iletisim", (req, res) => {
  // Burada form verilerini işleyebilirsiniz
  const { ad, soyad, email, telefon, mesaj } = req.body; //nesneden çıkarma işlemi
  // Örneğin, form verilerini loglamak için
  console.log(`Gönderen: ${ad} ${soyad}, Email: ${email}, Telefon: ${telefon}, Mesaj: ${mesaj}`);

  // İletişim formuna başarılı bir şekilde cevap vermek için
  res.send(`<h2>Yanıtınız gönderildi</h2><p><a href="/">Anasayfaya dön</a></p>`);
});

app.get("/izu", (req, res) => {
  res.redirect("https://www.izu.edu.tr");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
