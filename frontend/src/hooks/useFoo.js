import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
	Connection,
	Keypair,
	sendAndConfirmTransaction,
} from "@solana/web3.js";
import { useMemo } from "react";
import { MODE, RPC_ENDPOINT } from "../config";
import { WEB3JS_SECRET_KEY } from "../secrets";

// TODO Find a proper name
export const useFoo = () => {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const web3jsStuff = useMemo(() => {
		if (MODE !== "web3js") {
			return {};
		}

		const keypair = Keypair.fromSecretKey(
			Uint8Array.from(JSON.parse(WEB3JS_SECRET_KEY))
		);
		const connection = new Connection(RPC_ENDPOINT, "confirmed");
		return {
			keypair,
			connection,
		};
	}, []);

	const pub_sendTx = async (tx) => {
		if (MODE === "web3js") {
			await sendAndConfirmTransaction(web3jsStuff.connection, tx, [
				web3jsStuff.keypair,
			]);
		} else if (MODE === "walletAdapter") {
			if (!publicKey) throw new WalletNotConnectedError();

			const {
				context: { slot: minContextSlot },
				value: { blockhash, lastValidBlockHeight },
			} = await connection.getLatestBlockhashAndContext();

			const signature = await sendTransaction(tx, connection, {
				minContextSlot,
			});

			await connection.confirmTransaction({
				blockhash,
				lastValidBlockHeight,
				signature,
			});
		} else {
			throw new Error("hey invalid mode");
		}
	};

	return {
		sendTx: pub_sendTx,
		publicKey: MODE === "web3js" ? web3jsStuff.keypair.publicKey : publicKey,
	};
};
