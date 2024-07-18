import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";

const RPC_ENDPOINT = "http://localhost:8899";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ConnectionProvider endpoint={RPC_ENDPOINT}>
			<WalletProvider wallets={[]} autoConnect>
				<WalletModalProvider>
					<App />
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	</React.StrictMode>
);
