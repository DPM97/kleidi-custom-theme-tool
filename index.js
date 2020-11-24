const express = require("express");
const app = express();
const http = require("http");
app.server = http.createServer(app);
const opn = require("opn");
const { Liquid } = require("liquidjs");
const path = require("path");
const prompts = require("prompts");

let publishable_key;
let engine;

(async () => {
  const response = await prompts([
    {
      type: "text",
      name: "themeName",
      message: "Theme Name (your service name): ",
    },
    {
      type: "text",
      name: "publishable_key",
      message: "Stripe Testing Publishable Key: ",
    },
  ]);

  publishable_key = response.publishable_key;

  engine = new Liquid({
    root: path.resolve(__dirname, `./${response.themeName}`),
    extname: ".liquid",
  });

  app.use(express.static(__dirname));

  app.engine("liquid", engine.express());

  app.set("view engine", "liquid");

  const serverOpts = {
    host: "0.0.0.0",
    port: process.env.PORT || 3000,
  };

  app.server.listen(serverOpts, () => {
    app.on("shutdown", () => {
      process.exit(0);
    });
    console.log(
      `Server is running at http://127.0.0.1:${process.env.PORT || 3000}/pages`
    );
    opn(`http://127.0.0.1:${process.env.PORT || 3000}/pages`);
  });
})();

app.get("/password", async (req, res) => {
  const html = await engine.renderFile("pages/home", {
    msg: {
      type: "error",
      content: "this is a error message",
    },
    password: true,
    styles: {
      background_color: "rgba(69, 67, 59, 1)",
      header_color: "rgba(46, 87, 68, 0.8)",
      text_primary: "rgba(255, 255, 255)",
      text_secondary: "rgba(255, 255, 255, 0.5)",
      text_tertiary: "rgba(255, 255, 255, 0.3)",
      button_color: "rgba(90, 193, 142, 0.5)",
      anti_button_color: "rgba(220, 73, 50, 0.5)",
      button_color_hover: "rgba(90, 193, 142, 0.8)",
      anti_button_color_hover: "rgba(220, 73, 50, 0.8)",
      box_color: "rgba(95, 93, 85, 1)",
    },
    publishable_key: publishable_key,
    logoURI: "https://kleidi.io/assets/img/hero.png",
    serviceId: "Your Kleidi Site",
    slogan: "This is a slogan for your site",
    tos_url: "https://en.wikipedia.org/wiki/Type_of_service",
  });
  res.send(html);
});

app.get("/dashboard", async (req, res) => {
  const html = await engine.renderFile("pages/dashboard", {
    styles: {
      background_color: "rgba(69, 67, 59, 1)",
      header_color: "rgba(46, 87, 68, 0.8)",
      text_primary: "rgba(255, 255, 255)",
      text_secondary: "rgba(255, 255, 255, 0.5)",
      text_tertiary: "rgba(255, 255, 255, 0.3)",
      button_color: "rgba(90, 193, 142, 0.5)",
      anti_button_color: "rgba(220, 73, 50, 0.5)",
      button_color_hover: "rgba(90, 193, 142, 0.8)",
      anti_button_color_hover: "rgba(220, 73, 50, 0.8)",
      box_color: "rgba(95, 93, 85, 1)",
    },
    publishable_key: publishable_key,
    logoURI: "https://kleidi.io/assets/img/hero.png",
    user: {
      discordID: "133377015536549889",
      avi: "ba29156557baeb4d925b7029a0ccbda1",
      username: "Yep",
    },
    general: {
      cancel_at_period_end: true,
      isLifetime: false,
      deviceID: "laskdlaskdl",
      status: "Active",
      key: "KREK-KL2F-GHV4-4FSF",
      referralCode: "klk4l3klkfl",
      nextBillingDate: "August 20, 2020",
      balance: "5.00",
      bundle: {
        customFields: [
          {
            name: "Testing Name",
            value: "testing value",
          },
        ],
      },
      customer: {
        sources: {
          data: [{ brand: "Visa", last4: "4592" }],
        },
        name: "Kleidi Admin",
      },
      email: "admin@kleidi.io",
    },
    currency: {
      symbol: "$",
    },
  });
  res.send(html);
});

app.get("/redeem", async (req, res) => {
  const html = await engine.renderFile("pages/redeem", {
    msg: {
      type: "error",
      content: "this is a error message",
    },
    styles: {
      background_color: "rgba(69, 67, 59, 1)",
      header_color: "rgba(46, 87, 68, 0.8)",
      text_primary: "rgba(255, 255, 255)",
      text_secondary: "rgba(255, 255, 255, 0.5)",
      text_tertiary: "rgba(255, 255, 255, 0.3)",
      button_color: "rgba(90, 193, 142, 0.5)",
      anti_button_color: "rgba(220, 73, 50, 0.5)",
      button_color_hover: "rgba(90, 193, 142, 0.8)",
      anti_button_color_hover: "rgba(220, 73, 50, 0.8)",
      box_color: "rgba(95, 93, 85, 1)",
    },
  });
  res.send(html);
});

app.get("/soldout", async (req, res) => {
  const html = await engine.renderFile("pages/home", {
    msg: {
      type: "error",
      content: "this is a success message",
    },
    styles: {
      background_color: "rgba(69, 67, 59, 1)",
      header_color: "rgba(46, 87, 68, 0.8)",
      text_primary: "rgba(255, 255, 255)",
      text_secondary: "rgba(255, 255, 255, 0.5)",
      text_tertiary: "rgba(255, 255, 255, 0.3)",
      button_color: "rgba(90, 193, 142, 0.5)",
      anti_button_color: "rgba(220, 73, 50, 0.5)",
      button_color_hover: "rgba(90, 193, 142, 0.8)",
      anti_button_color_hover: "rgba(220, 73, 50, 0.8)",
      box_color: "rgba(95, 93, 85, 1)",
    },
    publishable_key: publishable_key,
    logoURI: "https://kleidi.io/assets/img/hero.png",
    serviceId: "Your Kleidi Site",
    slogan: "This is a slogan for your site",
    tos_url: "https://en.wikipedia.org/wiki/Type_of_service",
  });
  res.send(html);
});

app.get("/", async (req, res) => {
  const html = await engine.renderFile("pages/home", {
    msg: {
      type: "error",
      content: "this is a success message",
    },
    bundles: [
      {
        displayTitle: "test",
        billingPlanID: "alskdlaksdlaksdl",
      },
    ],
    styles: {
      background_color: "rgba(69, 67, 59, 1)",
      header_color: "rgba(46, 87, 68, 0.8)",
      text_primary: "rgba(255, 255, 255)",
      text_secondary: "rgba(255, 255, 255, 0.5)",
      text_tertiary: "rgba(255, 255, 255, 0.3)",
      button_color: "rgba(90, 193, 142, 0.5)",
      anti_button_color: "rgba(220, 73, 50, 0.5)",
      button_color_hover: "rgba(90, 193, 142, 0.8)",
      anti_button_color_hover: "rgba(220, 73, 50, 0.8)",
      box_color: "rgba(95, 93, 85, 1)",
    },
    publishable_key: publishable_key,
    logoURI: "https://kleidi.io/assets/img/hero.png",
    serviceId: "Your Kleidi Site",
    slogan: "This is a slogan for your site",
    tos_url: "https://en.wikipedia.org/wiki/Type_of_service",
  });
  res.send(html);
});

app.get("/pages", async (req, res) => {
  return res.sendFile("./public/main.html", { root: __dirname });
});
