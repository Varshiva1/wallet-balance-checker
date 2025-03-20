import React, { useState } from "react";
import { ethers } from "ethers";

function App() {
    const [walletAddress, setWalletAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function connectWallet() {
        try {
            if (!window.ethereum) {
                setErrorMessage("No Ethereum wallet detected! Install MetaMask or another wallet.");
                return;
            }

            // Show wallet selection popup (MetaMask, Coinbase, Rabby, etc.)
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []); // Open wallet selection popup

            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            setWalletAddress(address);
            setErrorMessage(""); // Clear errors if successful
            getBalance(address);
        } catch (error) {
            if (error.code === "ACTION_REJECTED") {
                setErrorMessage("Connection rejected by the user.");
            } else {
                setErrorMessage("Error connecting wallet: " + error.message);
            }
        }
    }

    async function getBalance(address) {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const balance = await provider.getBalance(address);
            setBalance(ethers.formatEther(balance)); // Convert Wei to ETH
        } catch (error) {
            setErrorMessage("Error fetching balance: " + error.message);
        }
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Ethereum Wallet Balance Checker</h1>
            <button onClick={connectWallet}>Connect Wallet</button>
            {walletAddress && (
                <div>
                    <p><strong>Wallet Address:</strong> {walletAddress}</p>
                    <p><strong>Balance:</strong> {balance} ETH</p>
                </div>
            )}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
}

export default App;
