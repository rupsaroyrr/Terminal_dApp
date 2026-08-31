# Contributing to Stellar Network Payment Terminal (Terminal dApp)

Thank you for your interest in contributing to the **Stellar Network Payment Terminal**! We welcome contributions from developers, designers, security researchers, and Web3 enthusiasts.

This guide outlines our development workflow, coding standards, testing requirements, and pull request submission guidelines.

---

## 📜 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Coding Standards](#-coding-standards)
- [Smart Contract Development](#-smart-contract-development)
- [Testing Requirements](#-testing-requirements)
- [Submitting Pull Requests](#-submitting-pull-requests)
- [Reporting Issues & Vulnerabilities](#-reporting-issues--vulnerabilities)

---

## 🤝 Code of Conduct

We aim to foster an inclusive, respectful, and collaborative environment. Please adhere to the following principles when participating in our community:
- Use welcoming and inclusive language.
- Respect differing technical viewpoints and constructive feedback.
- Focus on what is best for the community and overall security of the protocol.

---

## 🚀 Getting Started

### Prerequisites
Before contributing, ensure you have the following installed locally:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Rust Toolchain**: `rustup target add wasm32-unknown-unknown`
- **Soroban CLI**: `cargo install --locked soroban-cli`
- **Freighter Browser Extension**: Configured for **Stellar Testnet**

### Environment Setup

1. **Fork & Clone the Repository**:
   ```bash
   git clone https://github.com/rupsaroyrr/Terminal_dApp.git
   cd Terminal_dApp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Launch Local Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 🔄 Development Workflow

1. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or fix/your-bug-fix
   ```

2. **Branch Naming Conventions**:
   - `feature/` — New frontend features, UI modules, or CLI commands.
   - `fix/` — Bug fixes or patch releases.
   - `contract/` — Rust/Soroban smart contract updates or test suites.
   - `docs/` — Documentation updates or walkthrough additions.

---

## 🎨 Coding Standards

### JavaScript / React
- We use **React 19** and **Vite 5**.
- Follow functional component patterns with standard hooks (`useState`, `useEffect`, `useCallback`, `useContext`).
- Keep UI styling aligned with the **Dystopian Cyberpunk & Glassmorphism** design system (semi-transparent obsidian containers, CRT scanline overlays, CSS tokens in `index.css`).
- Ensure all interactive elements have unique `id` attributes for testing and accessibility.

### Linting
Before committing, verify code quality with ESLint:
```bash
npm run lint
```

---

## 🛠️ Smart Contract Development

Smart contracts are located in the `contracts/` directory:
- `contracts/transcendence-contract` — Relief Fund Pool
- `contracts/stellar-nft` — Soroban NFT Token Contract
- `contracts/nft-shop` — Decentralized NFT Marketplace (ICC)

### Compiling WASM Binaries
When modifying Rust contract code, compile to target `wasm32-unknown-unknown`:
```bash
cargo build --target wasm32-unknown-unknown --release
```

### On-Chain Security Guidelines
- Ensure all sensitive admin functions verify `admin.require_auth()`.
- Provide zero-panic state validation for user inputs.
- Emit Soroban events for all state-changing contract functions.

---

## 🧪 Testing Requirements

We enforce test coverage for utility logic, price oracle fallbacks, and command history helpers using **Vitest**.

### Run Unit Tests
```bash
npm run test
```

### Writing Tests
When adding new utility services or contract proxy handlers, create a corresponding test file in `src/utils/*.test.js`:
- Include positive execution assertions.
- Include failure/graceful fallback handling assertions (e.g. RPC timeouts or malformed inputs).

---

## 📥 Submitting Pull Requests

1. **Verify Builds & Tests**:
   Before opening a PR, ensure all verification steps pass locally:
   ```bash
   npm run lint
   npm run test
   npm run build
   ```

2. **Commit Message Guidelines**:
   Use clear, descriptive commit messages:
   - `feat: add SEP-0007 split payment QR generator`
   - `fix: resolve Horizon rate limit handling in Hunters Protocol`
   - `docs: update CLI command reference in documentation.md`

3. **Open Pull Request**:
   - Push your branch to GitHub (`git push origin feature/your-feature-name`).
   - Open a PR against the `main` branch of `rupsaroyrr/Terminal_dApp`.
   - Provide a clear summary of changes, screenshot/GIF of UI changes (if applicable), and list of verified test cases.

---

## 🛡️ Reporting Issues & Vulnerabilities

- **Bug Reports**: Open an issue on GitHub with steps to reproduce, expected vs actual behavior, and system environment.
- **Security Disclosures**: For critical vulnerabilities in smart contracts or authentication handling, please disclose responsibly by contacting the maintainers directly at `rupsaroy.rr@gmail.com`.

---
*Thank you for helping build the future of decentralized payments on Stellar!*
