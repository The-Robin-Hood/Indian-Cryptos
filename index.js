const express = require('express');
const https = require('https');
const _ = require('lodash');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'));

var ip = require("ip");

app.listen(8000, () => console.log("Running in http://" + ip.address() + ":8000"));

app.get('/', (req, res) => {

    https.get("https://api.coindcx.com", (response) => {
        var chunk = '';
        response.on('error', (err) => {
            console.log(err);
            res.send("Error");
        });
        response.on('data', (data) => chunk += data);
        response.on('end', () => {
            chunk = JSON.parse(chunk);
            var baseCurrency = chunk.currency_pairs.filter(coin => coin.base_currency_name == "Indian Rupee");
            var coinsData = []
            var chg24hr = chunk.change_24_hour;
            var currprice = chunk.currenct_prices;
            for (var i = 0; i < baseCurrency.length; i++) {
                coin = {};
                coin['symbol'] = baseCurrency[i].coindcx_name;
                coin['name'] = baseCurrency[i].target_currency_name;
                coin['low'] = chg24hr[coin['symbol'] + "_low"];
                coin['high'] = chg24hr[coin['symbol'] + "_high"];
                coin['current'] = currprice[coin['symbol']];
                coin['img'] = "https://cdn.coindcx.com/static/coins/" + (coin['symbol'].substring(0, coin['symbol'].length - 3)).toLowerCase() + ".svg";

                coinsData.push(coin);

            }
            res.render('index', { COINS: coinsData });
        });

    });


});


