import React, { useState } from "react";
import { ethers } from "ethers";

// RPC URLs for Ethereum & L2 Chains including Base
const RPC_URLS = {
    ethereum: "https://eth.llamarpc.com", // Public Ethereum RPC
    arbitrum: "https://arb1.arbitrum.io/rpc",
    optimism: "https://mainnet.optimism.io",
    polygon: "https://polygon-rpc.com",
    base: "https://mainnet.base.org",
};

function App() {
    const [walletAddress, setWalletAddress] = useState("");
    const [balances, setBalances] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    async function connectWallet() {
        try {
            // Check if any wallet provider is available
            const provider = window.ethereum || window.web3?.currentProvider;
            if (!provider) {
                setErrorMessage("No Ethereum-compatible wallet found. Install MetaMask, Rabby, or another wallet.");
                return;
            }
    
            const ethersProvider = new ethers.BrowserProvider(provider);
            await ethersProvider.send("eth_requestAccounts", []); // Request wallet access
    
            const signer = await ethersProvider.getSigner();
            const address = await signer.getAddress();
    
            setWalletAddress(address);
            setErrorMessage(""); // Clear errors if successful
            getBalances(address);
        } catch (error) {
            if (error.code === "ACTION_REJECTED") {
                setErrorMessage("Connection rejected by the user.");
            } else {
                setErrorMessage("Error connecting wallet: " + error.message);
            }
        }
    }
    

    async function getBalances(address) {
        try {
            let balances = {};
            for (const [chain, rpcUrl] of Object.entries(RPC_URLS)) {
                const provider = new ethers.JsonRpcProvider(rpcUrl);
                const balance = await provider.getBalance(address);
                balances[chain] = ethers.formatEther(balance);
            }
            setBalances(balances);
        } catch (error) {
            setErrorMessage("Error fetching balances: " + error.message);
        }
    }

    function disconnectWallet() {
        setWalletAddress("");
        setBalances({});
        setErrorMessage("");
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Ethereum & L2 Wallet Balance Checker</h1>

            {!walletAddress ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <button onClick={disconnectWallet}>Disconnect Wallet</button>
            )}

            {walletAddress && (
                <div>
                    <p><strong>Wallet Address:</strong> {walletAddress}</p>
                    <h3>Balances:</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {Object.entries(balances).map(([chain, balance]) => (
                            <li key={chain}><strong>{chain.toUpperCase()}:</strong> {balance} ETH</li>
                        ))}
                    </ul>
                </div>
            )}

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
}

export default App;
