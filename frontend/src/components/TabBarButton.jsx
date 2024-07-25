import { cn } from "../utils";

function TabBarButton({ children, tab, activeTab, setActiveTab }) {
	return (
		<button
			type="button"
			className={cn(
				"px-3 py-1 rounded-lg font-medium",
				activeTab === tab && "bg-slate-200"
			)}
			onClick={() => {
				setActiveTab(tab);
			}}
		>
			{children}
		</button>
	);
}

export default TabBarButton;
