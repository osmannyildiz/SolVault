import {
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
	TransactionInstruction,
} from "@solana/web3.js";
import { PROGRAM_ID } from "../config";
import { generateRandomSeed, numberTo64bitBuffer } from "../utils";

export class SolVault {
	static async sanityCheck(sendTx) {
		const ix = new TransactionInstruction({
			keys: [],
			programId: PROGRAM_ID,
			data: Buffer.concat([
				Buffer.alloc(1, 0), // Instruction type: SanityCheck
			]),
		});

		const tx = new Transaction().add(ix);
		await sendTx(tx);
	}

	static async createVault(sendTx, publicKey) {
		const seed = generateRandomSeed();
		let seedBuffer = Buffer.from(seed);
		const [vaultAccountToInitPk, bump] = PublicKey.findProgramAddressSync(
			[seedBuffer],
			new PublicKey(PROGRAM_ID)
		);
		console.log(
			`Derived ${vaultAccountToInitPk.toBase58()} from ${seed} at ${bump} bump`
		);

		// TODO Get these values from the form
		const temp_lamports = 5 * LAMPORTS_PER_SOL;
		const temp_vaultKeyHash = seed + seed + seed + seed;

		var ixData = Buffer.concat([
			Buffer.alloc(1, 1), // Instruction type: CreateVault
			Buffer.from(seed), // 8 bytes
			Buffer.alloc(1, bump),
			numberTo64bitBuffer(temp_lamports), // 8 bytes
			Buffer.from(temp_vaultKeyHash), // 32 bytes
		]);

		console.log(`Instruction byte train to send: ${ixData}`);

		const ix = new TransactionInstruction({
			keys: [
				{ pubkey: publicKey, isSigner: true, isWritable: true }, // Sender
				{ pubkey: vaultAccountToInitPk, isSigner: false, isWritable: true }, // Vault account to init
				// We don't use this account from the iterator on the program part, but it's still required to be included here
				{
					pubkey: SystemProgram.programId,
					isSigner: false,
					isWritable: false,
				},
			],
			programId: PROGRAM_ID,
			data: ixData,
		});

		const tx = new Transaction().add(ix);
		await sendTx(tx);

		return { vaultAccountToInitPk };
	}
}
