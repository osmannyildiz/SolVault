import { mdiDiceMultiple, mdiEye } from "@mdi/js";
import Icon from "@mdi/react";

function CreateVault() {
	return (
		<div className="text-center">
			<form className="flex flex-col items-stretch gap-12">
				<div className="flex flex-col items-center gap-2">
					<label htmlFor="create--amount">Amount</label>
					<input
						type="text"
						id="create--amount"
						className="bg-slate-200 rounded-lg text-xl px-4 py-2 self-stretch text-center"
						value={123}
					/>
					<div className="flex justify-center gap-4">
						<button
							type="button"
							className="bg-purple-300 rounded-lg px-3 py-1"
						>
							SOL
						</button>
						<button type="button" className="rounded-lg px-3 py-1">
							Lamports
						</button>
					</div>
				</div>
				<div className="flex flex-col items-center gap-2">
					<label htmlFor="create--key">Key</label>
					<div className="flex self-stretch">
						<input
							type="password"
							id="create--key"
							className="bg-slate-200 rounded-lg rounded-e-none text-xl px-4 py-2 flex-grow"
						/>
						<button
							type="button"
							className="bg-slate-200 px-2 py-2 w-11 flex justify-center items-center hover:bg-slate-300 transition-colors"
						>
							<Icon path={mdiEye} title="Show password" size={1} />
						</button>
						<button
							type="button"
							className="bg-purple-700 text-white rounded-lg rounded-s-none px-2 py-2 w-11 flex justify-center items-center hover:bg-purple-800 transition-colors"
						>
							<Icon
								path={mdiDiceMultiple}
								title="Generate random password"
								size={1}
							/>
						</button>
					</div>
				</div>
				<button
					type="button"
					className="bg-purple-700 text-white rounded-lg px-2 py-2 hover:bg-purple-800 transition-colors"
				>
					Lock 123 SOL
				</button>
			</form>
		</div>
	);
}

export default CreateVault;
