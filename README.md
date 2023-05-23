# Fubuki
<p align="center">A free restful API serving quality anime quotes<br>Powered by Express.js</p>

<br>
<p align="center">
<img src="https://img.shields.io/github/license/FrontendKec/Fubuki?style=flat-square">
<img src="https://img.shields.io/github/package-json/v/FrontendKec/Fubuki?style=flat-square">
<img src="https://img.shields.io/github/last-commit/FrontendKec/Fubuki?style=flat-square">
<img src="https://img.shields.io/github/deployments/FrontendKec/Fubuki/cyclic:prod?style=flat-square"></p>
<br>

## Installation
Run the following command to clone the repository, and install the dependencies:
```sh
git clone https://github.com/FrontendKec/Fubuki.git
cd Fubuki
npm install
```

start the server with the following command:
```sh
npm run start
```

Now the server is running on http://localhost:3000

<br>

## Routes
Below you'll find examples using Fetch API but you can use any other http library out there.

### Get Random Quote
```sh
fetch("https://fine-cyan-bullfrog-vest.cyclic.app//v1/api/random")
  .then((response) => response.json())
  .then((quote) => console.log(quote));
```

<br>

### FrontendKec &copy;2023