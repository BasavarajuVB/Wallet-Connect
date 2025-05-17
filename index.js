const connectBtn = document.getElementById("connectBtn");
const disconnectBtn = document.getElementById("disconnectBtn");
const walletAddressEl = document.getElementById("walletAddress");
const walletBalanceEl = document.getElementById("walletBalance");

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      walletAddressEl.textContent = address;

      const balanceWei = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });

      const balanceEth = parseFloat(parseInt(balanceWei, 16) / 1e18).toFixed(4);
      walletBalanceEl.textContent = balanceEth;

      connectBtn.style.display = "none";
      disconnectBtn.style.display = "inline-block";
    } catch (err) {
      console.error("Connection failed", err);
    }
  } else {
    alert("Please install MetaMask!");
  }
}

function disconnectWallet() {
  walletAddressEl.textContent = "Not connected";
  walletBalanceEl.textContent = "--";
  connectBtn.style.display = "inline-block";
  disconnectBtn.style.display = "none";
}

connectBtn.addEventListener("click", connectWallet);
disconnectBtn.addEventListener("click", disconnectWallet);
