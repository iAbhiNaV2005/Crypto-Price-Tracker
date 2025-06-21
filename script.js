var btc = document.getElementById("bitcoin");
var eth = document.getElementById("ethereum");
var solana = document.getElementById("solana");
let newCoin = document.querySelectorAll(".coin2");

let userCoins = [];

//---------------------------------------------------------------------------------
async function getprices() {
  try{
    let response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Csolana&vs_currencies=usd",)
    const data = await response.json();
      btc.innerHTML = data.bitcoin.usd;
      eth.innerHTML = data.ethereum.usd;
      solana.innerHTML = data.solana.usd;
    }
    catch(err){
      console.error(err)
    }
}

setInterval(getprices , 2500);
//------------------------------------------------------------------------------------
async function fetchCryptoPrice(symbol) {
  try {
    let response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`)
      let data = await response.json();
      return data[symbol] ? Number(data[symbol].usd).toFixed(3) : null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Function to fetch user-entered crypto prices
newCoin.forEach((coinDiv) => {
  coinDiv.addEventListener("click", async () => {
      let userInput = prompt("Enter cryptocurrency name(use Explore for reference) ");
      if (userInput) {
        const symbol = userInput.toLowerCase();
        const price = await fetchCryptoPrice(symbol);
        if (price) {
        // Reset the container completely and append child nodes properly
        coinDiv.innerHTML = ""; // Clear previous children
        coinDiv.classList.add("coindata");
        userCoins.push({ symbol, element: coinDiv });
        
        const priceDiv = document.createElement("div");
        priceDiv.className = "crypto-price";
        priceDiv.textContent = `$${price}`;

        const nameDiv = document.createElement("div");
        nameDiv.className = "crypto-name";
        nameDiv.textContent = userInput.toUpperCase();

        coinDiv.appendChild(priceDiv);
        coinDiv.appendChild(nameDiv);
        } else {
            coinDiv.innerHTML = "<div>Invalid symbol or data<br>not available.</div>";
            coinDiv.classList.remove("coindata");
        }
      }
  });
});

setInterval(async () => {
  for (const coin of userCoins) {
    const price = await fetchCryptoPrice(coin.symbol);
    if (price) {
      coin.element.querySelector(".crypto-price").textContent = `$${price}`;
    }
  }
}, 2500);


