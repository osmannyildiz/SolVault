import { TABS } from "../constants";
import TabBarButton from "./TabBarButton";

function TabBar({ activeTab, setActiveTab }) {
	return (
		<div className="tab-bar fixed top-0 left-0 right-0 h-20 flex justify-center items-center gap-8">
			<TabBarButton
				tab={TABS.CREATE_VAULT}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			>
				Create Vault
			</TabBarButton>
			<TabBarButton
				tab={TABS.UNLOCK_VAULT}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			>
				Unlock Vault
			</TabBarButton>
		</div>
	);
}

export default TabBar;
