# 📌 Ethereum & L2 Wallet Balance Checker

## 📝 Overview
This is a **React.js** application that connects to an Ethereum wallet (MetaMask, Rabby, Coinbase Wallet, etc.), retrieves the wallet address, and displays **ETH balances** from multiple networks, including:

- **Ethereum Mainnet**
- **Arbitrum**
- **Optimism**
- **Polygon**
- **Base (Coinbase's L2)**
- **Vana**

The app also allows users to disconnect their wallets and revoke permissions to prevent automatic reconnection.

---

## 🚀 Features
- ✅ **Wallet Connection**: Connect MetaMask, Rabby, Coinbase Wallet, and other Ethereum-compatible wallets.
- ✅ **Multi-Chain Balance Fetching**: Fetch ETH balances from Ethereum + Layer 2 networks.
- ✅ **Error Handling**: Displays user-friendly error messages (e.g., rejected connection requests).
- ✅ **Disconnect & Revoke Wallet Permissions**: Ensures secure disconnection and prevents auto-reconnection.

---

## 📂 Project Structure
```
📦 eth-wallet-checker
 ┣ 📂 src
 ┃ ┣ 📜 App.js           # Main React component (UI)
 ┃ ┣ 📜 walletService.js # Handles wallet connection, fetching balances, and disconnection
 ┃ ┣ 📜 index.js         # React entry point
 ┣ 📜 package.json       # Dependencies and project settings
 ┣ 📜 README.md          # Project documentation
 ┗ 📜 .gitignore         # Ignore unnecessary files
```

---

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Varshiva1/eth-wallet-checker.git
cd eth-wallet-checker
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start the Development Server
```bash
npm start
```
The app will run at: **`http://localhost:3000`**

---

## 🔹 How It Works?
1. **Click "Connect Wallet"** – Opens a popup to select a wallet (MetaMask, Rabby, etc.)
2. **Approve the connection** – Fetches wallet address & ETH balances from all supported chains
3. **Click "Disconnect Wallet"** – Clears wallet info and prevents auto-reconnection

---

## 🖥 Technologies Used
- **React.js** – Frontend framework
- **Ethers.js** – Interact with Ethereum & L2 chains
- **MetaMask / Rabby / Coinbase Wallet** – Wallet connection

---

## 🔗 RPC Endpoints
The app retrieves balances from the following **public RPC endpoints**:

| Chain      | RPC URL |
|------------|--------------------------------------------------|
| Ethereum   | `https://eth.llamarpc.com` |
| Arbitrum   | `https://arb1.arbitrum.io/rpc` |
| Optimism   | `https://mainnet.optimism.io` |
| Polygon    | `https://polygon-rpc.com` |
| Base       | `https://mainnet.base.org` |
| Vana       | `https://rpc.vana.com` |

---

## 🛠 Future Enhancements
- 🚀 **Support for ERC-20 Token Balances** (e.g., USDT, DAI, WETH)
- 🚀 **Transaction History Display** for all supported chains
- 🚀 **Ability to Send ETH & Tokens** from the wallet

---

## 📜 License
This project is open-source and available under the **MIT License**.

---

## 💡 Contributing
Feel free to fork the repository, create feature branches, and submit pull requests!

1. **Fork the repo**
2. **Create a new branch**
3. **Make your changes**
4. **Submit a pull request**

---

## 🙌 Acknowledgments
Special thanks to **Ethers.js**, **MetaMask**, and the **Ethereum Developer Community** for providing great tools and documentation! 🚀
