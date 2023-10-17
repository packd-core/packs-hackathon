# Packs Main Repo

## Local Hardhat Node Setup

### Setup

Change directory to the contracts folder:

```bash
cd packages/contracts
```

Install dependencies if not already installed:

```bash
yarn install
```

Start the local hardhat node:

```bash
yarn start
```

Keep this terminal open and running.

In a new terminal, same directory, deploy the contracts:

```bash
yarn deploy
```

**Note down the address of the deployed contract, you will need it later.**

### Fund Account with ETH

To send some ETH to your account, run the hardhat task:

```bash
yarn hardhat send:eth --account 0x....01 --amount 1 --network localhost
```

Replace the account with your own, and the amount with the desired amount.

### Mint Test Tokens

To mint some test ERC20 tokens, run the hardhat task:

```bash
yarn hardhat mint:erc20 --account 0x....01 --tokenaddress 0x....02 --amount 1000 --network localhost
```

Replace the account with your own, and the tokenaddress with the address of the deployed ERC20 contract. Amount is optional, default is 1000.

### Mint Test NFTs

To mint some test ERC721 token, run the hardhat task:

```bash
yarn hardhat mint:erc721 --account 0x....01 --tokenaddress 0x....02 --tokenid 0 --network localhost
```

Replace the account with your own, and the tokenaddress with the address of the deployed ERC721 contract. Tokenid is optional, default is 0. Increment it to mint more tokens.

## DEV NOTES

To generate frontend hooks run on the app folder:

```bash
yarn generate
```

Please commit types
