import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction, TransactionInstruction } from "@solana/web3.js";
import { useMemo, useState } from "react";
import Header from "./components/Header";
import { PROGRAM_ID } from "./config";
import { TABS } from "./constants";
import CreateVault from "./tabs/CreateVault";
import UnlockVault from "./tabs/UnlockVault";

function App() {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const [activeTab, setActiveTab] = useState(TABS.CREATE_VAULT);

	const activeTabJsx = useMemo(() => {
		switch (activeTab) {
			case TABS.CREATE_VAULT:
				return <CreateVault />;
			case TABS.UNLOCK_VAULT:
				return <UnlockVault />;
			default:
				throw new Error("Invalid tab id");
		}
	}, [activeTab]);

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
		<>
			<Header activeTab={activeTab} setActiveTab={setActiveTab} />
			<main className="mt-16">
				<div className="container mx-auto px-6 pt-24 pb-6">
					<div className="max-w-md mx-auto">{activeTabJsx}</div>
				</div>
			</main>
			{/* TODO Remove this div */}
			<div>
				<button type="button" onClick={callSanityCheck}>
					call sanity_check
				</button>
			</div>
		</>
	);
}

export default App;
