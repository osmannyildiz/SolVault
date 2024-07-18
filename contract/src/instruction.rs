use solana_program::program_error::ProgramError;
use std::str::from_utf8;

#[derive(Debug)]
pub enum Instruction {
    SanityCheck,
    CreateVault {
        seed: String,
        bump: u8,
        lamports: u64,
        vault_key_hash: [u8; 32],
    },
    UnlockVault {
        vault_key: String,
    },
}

impl Instruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (function_flag, rest) = input.split_first().ok_or(ProgramError::BorshIoError(
            "Invalid parameters passed".to_string(),
        ))?;

        match function_flag {
            0 => Ok(Self::SanityCheck),
            1 => {
                // Expected data layout for `rest`:
                // [0..=7] 8 bytes (seed)
                // [8] 1 byte (bump)
                // [9..=16] 8 bytes (lamports)
                // [17..=48] 32 bytes (vault key hash)

                // We always use seeds of length 8
                let seed = from_utf8(rest.get(..8).unwrap()).unwrap().to_string();

                let bump = *rest.get(8).unwrap();

                let lamports = u64::from_be_bytes(rest[9..17].try_into().unwrap());

                let vault_key_hash = rest[17..49].try_into().unwrap();

                Ok(Self::CreateVault {
                    seed,
                    bump,
                    lamports,
                    vault_key_hash,
                })
            }
            2 => {
                // Expected data layout for `rest`:
                // ? bytes (vault key)

                let vault_key = from_utf8(rest).unwrap().to_string();

                Ok(Self::UnlockVault { vault_key })
            }
            _ => Err(ProgramError::BorshIoError(
                "Invalid function flag".to_string(),
            )),
        }
    }
}
