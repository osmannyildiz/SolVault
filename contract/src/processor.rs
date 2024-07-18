use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, msg, pubkey::Pubkey};

use crate::functions::{create_vault, sanity_check, unlock_vault};
use crate::instruction::Instruction;

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = Instruction::unpack(instruction_data)?;

    msg!("🐸 Received instruction: {:?}", instruction);

    match instruction {
        Instruction::SanityCheck => {
            sanity_check()?;
        }
        Instruction::CreateVault {
            seed,
            bump,
            lamports,
            vault_key_hash,
        } => {
            create_vault(program_id, accounts, seed, bump, lamports, vault_key_hash)?;
        }
        Instruction::UnlockVault { vault_key } => {
            unlock_vault(program_id, accounts, vault_key)?;
        }
    }

    Ok(())
}
