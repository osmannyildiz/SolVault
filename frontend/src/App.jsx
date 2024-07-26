import { useMemo, useState } from "react";
import Header from "./components/Header";
import { TABS } from "./constants";
import { useFoo } from "./hooks/useFoo";
import { SolVault } from "./programs/solvault";
import CreateVault from "./tabs/CreateVault";
import UnlockVault from "./tabs/UnlockVault";

function App() {
	const { sendTx } = useFoo();

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
		await SolVault.sanityCheck(sendTx);
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
