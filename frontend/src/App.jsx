import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
	LAMPORTS_PER_SOL,
	Transaction,
	TransactionInstruction,
} from "@solana/web3.js";

const PROGRAM_ID = "6cdKeKCgC7Vw1eTxUEp3NvAXxaTBmd1P7htjCyqsxJvN";

function App() {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const getBalance = async () => {
		if (!publicKey) throw new WalletNotConnectedError();
		const lamports = await connection.getBalance(publicKey);
		const sol = lamports / LAMPORTS_PER_SOL;
		console.log(`hey you have ${sol} sol`);
	};

	const callTheProgram = async () => {
		if (!publicKey) throw new WalletNotConnectedError();

		const instruction1 = new TransactionInstruction({
			keys: [],
			programId: PROGRAM_ID,
			// data: Buffer.alloc(0),
			data: undefined,
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
			<h1>test</h1>
			<WalletMultiButton />
			<button type="button" onClick={getBalance}>
				get balance
			</button>
			<button type="button" onClick={callTheProgram}>
				call the program
			</button>
		</main>
	);
}

export default App;
