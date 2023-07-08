# Fubuki
<p align="center"><img src="./public/icon.png"></p>
<p align="center">A free restful API serving quality anime quotes<br>Powered by Koa.js & MongoDB</p>

<br>
<p align="center">
<img src="https://img.shields.io/github/license/FrontendKec/Fubuki?style=flat-square">
<img src="https://img.shields.io/github/package-json/v/FrontendKec/Fubuki?style=flat-square">
<img src="https://img.shields.io/github/last-commit/FrontendKec/Fubuki?style=flat-square">
<img src="https://img.shields.io/github/deployments/FrontendKec/Fubuki/Production?style=flat-square"></p>
<br>

***
You can request any anime you want [Here](https://github.com/FrontendKec/Fubuki/discussions/1)
***
<br>

## Routes
### Get Random Quote 
```sh
https://fubuki-api.vercel.app/api/v1/random
```
### Output
```sh
{
    "anime": String,
    "character": String,
    "quote": String
}
```
<br>

### Get (1 - 20) Random Quotes [MAX=20]
```sh
https://fubuki-api.vercel.app/api/v1/random/18
```
### Output
```sh
[
    {
        "anime": String,
        "character": String,
        "quote": String
    },
    ... {+17}
]
```
<br>

### Get Quotes by Anime Name
```sh
https://fubuki-api.vercel.app/api/v1/anime/naruto
```
### Output
```sh
[
    {
        "anime": String,
        "character": String,
        "quote": String
    },
    ...
]
```
<br>

### Get Quotes by Character Name
```sh
https://fubuki-api.vercel.app/api/v1/character/ichigo
```
### Output
```sh
[
    {
        "anime": String,
        "character": String,
        "quote": String
    },
    ...
]
```
<br>

### Get Available Quotes Count
```sh
https://fubuki-api.vercel.app/api/v1/quotes
```
### Output
```sh
{
    "quotes": Number
}
```
<br>

### Get Available Anime
```sh
https://fubuki-api.vercel.app/api/v1/anime
```
### Output
```sh
[
    {
        "count": Number
    },
    [
        "String",
        "String",
        "String",
        ...
    ]
]
```
<br>

### FrontendKec &copy;2023