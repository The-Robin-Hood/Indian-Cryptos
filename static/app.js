var searchbar = document.getElementById('searchQueryInput');
var container = document.getElementById('container');
function x() {
    console.log(COINS);
}

searchbar.addEventListener('keyup', function (e) {
    const searchedCoins = coins.filter((coin) => {
        return coin["symbol"].toLowerCase().includes(searchbar.value.toLowerCase()) || coin["name"].toLowerCase().includes(searchbar.value.toLowerCase());
    });
    displayCoins(searchedCoins);
}
);


function displayCoins(coins) {
    finalString = "";
    for (var i = 0; i < coins.length; i++) {
        cr = Number(coins[i].current);
        hr = Number(coins[i].high);
        lr = Number(coins[i].low);
        if (cr > 1) { cr.toFixed(2) };
        if (hr > 1) { hr.toFixed(2) };
        if (lr > 1) { lr.toFixed(2) };
        imglink = coins[i].img;
        var cname = coins[i].name;
        var csymbol = coins[i].symbol;

        finalString += `<div class="card-1 card-div">
      
      
          <div class="gow-img-div img-div">
              <img src="${imglink}"> 
          </div>
          <div class="text-container">
              <h2 class="item-name">
              ${cname}
              </h2>
              <h3 class="item-name">
              (${csymbol})
              </h3><br>
              <p id="CP" class="current-price"> 
              Current Price : ₹  ${cr}
              </p>
              <div class="pricing-and-cart">
                  <div class="pricing">
                      <p id="LP" class="previous-price">
                      Lowest Price : ₹  ${lr}
                      </p>
                      <p id="HP" class="highest-price">
                        Highest Price : ₹  ${hr}
                      </p>
                  </div>
      
              </div>
          </div>
      </div>`;
    }

    container.innerHTML = finalString;


}