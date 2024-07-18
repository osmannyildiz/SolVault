import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Transaction, TransactionInstruction } from "@solana/web3.js";
import { PROGRAM_ID } from "./config";

function App() {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const callSanityCheck = async () => {
		if (!publicKey) throw new WalletNotConnectedError();

		const instruction1 = new TransactionInstruction({
			keys: [],
			programId: PROGRAM_ID,
			data: Buffer.concat([
				Buffer.alloc(1, 0), // Instruction type: sanity_check
			]),
		});

		const transaction = new Transaction().add(instruction1);

		const {
			context: { slot: minContextSlot },
			value: { blockhash, lastValidBlockHeight },
		} = await connection.getLatestBlockhashAndContext();

		const signature = await sendTransaction(transaction, connection, {
			minContextSlot,
		});

		await connection.confirmTransaction({
			blockhash,
			lastValidBlockHeight,
			signature,
		});

		console.log("hey done");
	};

	return (
		<main>
			<h1>SolVault</h1>
			<WalletMultiButton />
			<button type="button" onClick={callSanityCheck}>
				call sanity_check
			</button>
		</main>
	);
}

export default App;
