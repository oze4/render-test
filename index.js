const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
    res.send(
`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>render-test</title>
</head>
<body>
  <button id="send-api-request">Send API request</button>
  <p id="result"></p>
  <script>
    const sendApiRequestElement = document.getElementById("send-api-request");
    const resultElement = document.getElementById("result");

    sendApiRequestElement.addEventListener('click', async () => {
      const apiURL = window.location.protocol + "//${process.env.HOSTNAME_WITH_PORT}/api";
      resultElement.innerText = "Sending request to : '" + apiURL + "'";
      try {
        const response = await fetch(apiURL);
        const result = await response.text();
        resultElement.innerText += "\\nResult: " + result;
      } catch (e) {
        resultElement.innerText += "\\nResult: Error : " + e.message;
      }
    });
  </script>
</body>
</html>        
`)
});

app.get("/api", (req, res) => {
    res.send("Response from API.");
});

app.get("*", (req, res) => {
    res.status(404).send("<h1>404</h1>");
});

app.listen(3000, () => {
    console.log(`App listening on port ${3000}`);
});
