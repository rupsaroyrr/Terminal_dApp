# Terminal dApp CLI & Utility Reference

This guide details the command interface, output formatting, and transaction execution helpers for the Terminal dApp.

---

## 1. Available Terminal Commands

| Command | Description | Example Usage |
| :--- | :--- | :--- |
| `help` | Lists all available terminal commands | `help` |
| `status` | Displays network status and Soroban RPC connectivity | `status` |
| `balance <address>` | Queries native XLM and token balances for an address | `balance GAB...` |
| `mint <id> <uri>` | Mints a new Soroban NFT token | `mint 1 ipfs://bafy...` |
| `buy <nft_id> <usd>` | Purchases an listed NFT using automated market pricing | `buy 1 25.0` |
| `clear` | Clears terminal screen buffer | `clear` |

---

## 2. Command History Navigation

The terminal buffer supports command history tracking:
- **Up Arrow (`↑`)**: Navigate to previous command in history.
- **Down Arrow (`↓`)**: Navigate to next command or reset to empty input.
- **Auto-Deduplication**: Consecutive identical commands are automatically merged.

---

## 3. Terminal Output Formatting

The terminal interface parses ANSI escape sequences into styled CSS components:
- `\x1b[32m`: Success messages (Green)
- `\x1b[31m`: Execution errors (Red)
- `\x1b[33m`: Network warnings (Yellow)
- `\x1b[1m`: Bold headers and transaction hashes

---

## 4. Resilience & Retry Strategy

All RPC network transactions utilize exponential backoff retries via `withRetry`:
- **Initial Delay**: 300ms
- **Backoff Factor**: 2.0x
- **Max Retries**: 3 attempts before raising error
