# 🏛️ Hack the Block: Decentralized Arbitration System 🏛️

# Presentation (PPT): (Click Here)[https://docs.google.com/presentation/d/1yc0SMfXb_5eCUw8_SCIiRYlKzYT2zF6RwpZFvS57LFM/edit?usp=sharing] 

Welcome to **Hack the Block**! Where justice meets decentralization through a transparent, fair, and attack-resistant arbitration system powered by blockchain technology.

## 🚀 Overview

In a decentralized world, trustless mechanisms are essential for resolving disputes. **Hack the Block** addresses key challenges in dispute resolution, such as token accumulation, monopoly prevention, and Sybil attack resistance. Our token-based staking mechanism puts jurors' reputations on the line, ensuring that justice is served.

## 🧩 Key Features

### 1. 🎲 **Weighted Juror Selection**
Active jurors with staked tokens can participate, with selection probability weighted by their holdings. This balances influence while allowing smaller stakeholders a chance to be heard.

### 2. 🎡 **Roulette Algorithm**
The selection process uses a visual **Roulette Algorithm**, where each juror’s probability of selection is represented as segments of a spinning wheel. This intuitive approach enhances user engagement while ensuring fair representation.

### 3. 📈 **Logarithmic Algorithm**
Diminishing returns for larger stakes prevent monopolization, encouraging a diverse juror pool and promoting fairness in the selection process.

### 4. 💰 **Dynamic Token Economics**
As demand for tokens increases, their cost rises, deterring accumulation and fostering a decentralized ecosystem.

### 5. 🔒 **Robust Attack Resistance**
- **Weighted Random Selection**: Prevents dominance by large stakeholders.
- **Randomized Juror Pools**: Assigns disputes to multiple independent pools to enhance integrity.

### 6. 🎖️ **Incentive Alignment: Vote for Truth**
Jurors voting with the majority are rewarded, while dissenters face penalties, promoting reasoned and fair decision-making.

### 7. 🛡️ **Sybil Attack Prevention**
A minimum stake requirement deters malicious actors from creating fake accounts, ensuring serious participation.

## 🌐 How It Works

1. **Juror Onboarding**: Jurors stake tokens to join, representing their commitment.
2. **Juror Selection**: Using the **Roulette** and **Logarithmic Algorithms**, a group of jurors is selected based on their staked tokens.
3. **Voting Process**: Jurors cast their votes (either 'X' or 'Y') on disputes.
4. **Token Redistribution**: Majority voters earn tokens, while dissenters lose tokens.
5. **Results Display**: Final results and token standings are displayed, showcasing the outcomes of the arbitration process.

## 📋 Code Overview

### Juror Class

Represents a juror with:
- `name`: Identity of the juror.
- `tokens`: Staked token amount.
- `vote`: The juror’s decision on disputes.

### ArbitrationSystem Class

The core of our arbitration system includes functions for:
- **Initialization**: Setting up jurors and total tokens.
- **Juror Selection**: Implementing weighted selection algorithms.
- **Voting and Outcomes**: Tallying votes and adjusting token balances.
- **Result Display**: Showcasing the voting process and final distribution.

## 📦 Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js
- Hardhat
- Ethers.js
- Solidity
- React.js

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/gdevakrishnan/hack-the-block.git
   cd hack-the-block
npm install
npx hardhat run scripts/deploy.js --network sepolia
npm start
📝 Contributing
We welcome contributions! Please follow these steps to contribute:

Fork the repository.
Create your feature branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.
Please read our CONTRIBUTING.md for detailed guidelines on how to get involved.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
