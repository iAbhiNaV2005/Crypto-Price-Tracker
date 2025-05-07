var btc = document.getElementById("bitcoin");
var eth = document.getElementById("ethereum");
var solana = document.getElementById("solana");
let newCoin = document.querySelectorAll(".coin2");

//---------------------------------------------------------------------------------
function getprices() {
  fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Csolana&vs_currencies=usd",
    options
  )
    .then((res) => res.json())
    .then((res) => {
      btc.innerHTML = res.bitcoin.usd;
      eth.innerHTML = res.ethereum.usd;
      solana.innerHTML = res.solana.usd;
    })
    .catch((err) => console.error(err));
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-HYByuVPWtRvm8qX2ZQKjp9Sb",
  },
};

setInterval(getprices , 2500);
//------------------------------------------------------------------------------------

// Function to fetch and display user-entered crypto prices
newCoin.forEach((coinDiv) => {
  coinDiv.addEventListener("click", async (event) => {
      let userInput = prompt("Enter cryptocurrency name ");
      if (userInput) {
          let price = await fetchCryptoPrice(userInput.toLowerCase());
          if (price) {
              event.target.innerHTML = `<div class="crypto-price">$${price}</div>
                            <div class="crypto-name">${userInput.toUpperCase()}</div>`;
                            event.target.classList.toggle("coindata");

          } else {
              event.target.innerHTML = "Invalid symbol or data not available.";
          }
      }
  });
});


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
