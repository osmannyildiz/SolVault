use borsh::{BorshDeserialize, BorshSerialize};
// use solana_program::hash::Hash;
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    msg,
    program::invoke_signed,
    program_error::ProgramError,
    pubkey::Pubkey,
    rent::Rent,
};

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
pub struct VaultAccount {
    pub lamports: u64,
    pub key_hash: [u8; 32],
    pub is_unlocked: bool,
}

pub fn sanity_check() -> Result<(), ProgramError> {
    msg!("✅ It's alive!");
    Ok(())
}

pub fn create_vault(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    seed: String,
    bump: u8,
    lamports: u64,
    vault_key_hash: [u8; 32],
) -> Result<(), ProgramError> {
    let accounts_iter = &mut accounts.iter();
    let sender = next_account_info(accounts_iter)?;
    let vault_account_to_init = next_account_info(accounts_iter)?;

    if **vault_account_to_init.try_borrow_lamports()? > 0 {
        msg!("❌ This vault was already initialized");
        return Err(ProgramError::AccountAlreadyInitialized);
    }

    let vault_account_size = 48;
    let rent_lamports = Rent::default().minimum_balance(vault_account_size as usize);

    let create_vault_account_instruction = solana_program::system_instruction::create_account(
        sender.key,
        vault_account_to_init.key,
        rent_lamports,
        vault_account_size as u64,
        program_id,
    );

    // Sign and submit transaction
    invoke_signed(
        &create_vault_account_instruction,
        &[sender.clone(), vault_account_to_init.clone()],
        &[&[seed.as_bytes(), &[bump]]],
    )?;

    **sender.try_borrow_mut_lamports()? -= lamports;
    **vault_account_to_init.try_borrow_mut_lamports()? += lamports;

    // TODO Store data in vault

    Ok(())
}

pub fn unlock_vault(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    vault_key: String,
) -> Result<(), ProgramError> {
    let accounts_iter = &mut accounts.iter();
    let receiver = next_account_info(accounts_iter)?;
    let vault_account = next_account_info(accounts_iter)?;

    if vault_account.owner != program_id {
        msg!("❌ Given account must be a PDA owned by this program");
        return Err(ProgramError::IllegalOwner);
    }

    // TODO Calculate hash of the given key and compare with vault data

    let mut vault_account_data: VaultAccount =
        BorshDeserialize::deserialize(&mut &vault_account.data.borrow()[..])?;

    vault_account_data.is_unlocked = true;

    vault_account_data.serialize(&mut &mut vault_account.data.borrow_mut()[..])?;

    **vault_account.try_borrow_mut_lamports()? -= vault_account_data.lamports;
    **receiver.try_borrow_mut_lamports()? += vault_account_data.lamports;

    // TODO Delete vault account instead of marking as unlocked (take back the rent fee)

    Ok(())
}
