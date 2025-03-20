import { ethers } from "ethers";
import { useState } from "react";

// RPC URLs for Ethereum & L2 Chains including Base
const RPC_URLS = {
    ethereum: "https://eth.llamarpc.com", // Public Ethereum RPC
    arbitrum: "https://arb1.arbitrum.io/rpc",
    optimism: "https://mainnet.optimism.io",
    polygon: "https://polygon-rpc.com",
    base: "https://mainnet.base.org",
};

// Custom hook to manage wallet state and logic
export function useWalletService() {
    const [walletAddress, setWalletAddress] = useState("");
    const [balances, setBalances] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    // Connect to the wallet
    async function connectWallet() {
        try {
            if (!window.ethereum) {
                throw new Error("No Ethereum wallet detected! Install MetaMask, Rabby, Coinbase Wallet, etc.");
            }

            // Request wallet connection
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []); // Open wallet selection popup

            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            setWalletAddress(address);
            setIsConnected(true);
            setErrorMessage(""); // Clear errors if successful

            // Fetch balances from Ethereum & L2 chains including Base
            await fetchBalances(address);
        } catch (error) {
            if (error.code === "ACTION_REJECTED") {
                setErrorMessage("Connection rejected by the user.");
            } else {
                setErrorMessage("Error connecting wallet: " + error.message);
            }
        }
    }

    // Fetch balances for all chains
    async function fetchBalances(address) {
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

    // Disconnect the wallet
    async function disconnectWallet() {
        try {
            // Revoke permissions to ensure the popup appears on next connection
            if (window.ethereum) {
                await window.ethereum.request({
                    method: "wallet_revokePermissions",
                    params: [{ eth_accounts: {} }],
                });
                console.log("Permissions revoked successfully.");
            }
        } catch (error) {
            console.log("Error revoking permissions:", error);
        } finally {
            // Clear all state
            setWalletAddress("");
            setBalances({});
            setErrorMessage("");
            setIsConnected(false);
        }
    }

    return {
        walletAddress,
        balances,
        errorMessage,
        isConnected,
        connectWallet,
        disconnectWallet,
    };
}