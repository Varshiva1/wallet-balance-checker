import React from "react";
import { useWalletService } from "./walletService";

function App() {
    const {
        walletAddress,
        balances,
        errorMessage,
        isConnected,
        connectWallet,
        disconnectWallet,
    } = useWalletService();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Ethereum & L2 Wallet Balance Checker</h1>

            {!isConnected ? (
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