# 🗄️ SolVault

> 📌 **Status Update, July 26:** "Create Vault" implemented, now we're working on "Unlock Vault"

SolVault lets users create vaults and store lamports in them. Each vault has a unique address and a secret key. The key is required to withdraw the funds stored inside a vault.

![Screenshot](https://github.com/osmannyildiz/SolVault/blob/main/assets/screenshot.png?raw=true)
*(Development version. UI is subject to change)*

Thanks to its versatility, SolVault could come in handy in many different scenarios. Some examples:

- **Money Transfer:** Since anyone with the correct key can unlock a vault, users can use SolVault as a medium to transfer funds securely. The depositing user can transfer the vault address and key via any method (e-mail, instant messaging, or even a messenger pigeon 🕊️).
- **Reward Delivery**: For events like lotteries or hackathons, you can send the reward in form of a vault. This way, you won't even need to ask the winner for their wallet address; just give them the vault address and the key. There won't be any problem if the winner doesn't have a wallet at the moment; since the withdraw is on-demand, they can create their wallet and withdraw their reward, whenever is suitable for them.
- **Cold Wallet**: If you wish to securely keep your funds away from your main wallet, you can deposit them on a vault. Your funds will be locked in until you unlock the vault with its key.
