import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import TabBar from "./TabBar";

function Header({ activeTab, setActiveTab }) {
	return (
		<header>
			<div className="fixed top-0 left-0 right-0 h-20 px-6 flex justify-between items-center">
				<div className="flex items-center gap-3">
					<img src="/solvault-icon.svg" alt="SolVault icon" />
					<h1 className="text-2xl font-medium">SolVault</h1>
				</div>
				<WalletMultiButton />
			</div>
			<TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
		</header>
	);
}

export default Header;
