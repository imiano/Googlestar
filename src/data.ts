import { LessonModule, GlossaryTerm } from "./types";

export const BADGES = [
  { id: "blockchain_pioneer", title: "Blockchain Pioneer", desc: "Completed Module 1: What is Blockchain?", icon: "Compass" },
  { id: "tokenomics_wizard", title: "Tokenomics Wizard", desc: "Designed a balanced token distribution model in the Lab", icon: "Coins" },
  { id: "whitepaper_scribe", title: "Whitepaper Scribe", desc: "Drafted a complete, watermarked educational whitepaper", icon: "BookOpen" },
  { id: "security_sentinel", title: "Security Sentinel", desc: "Aced all scenarios in the Security Academy", icon: "ShieldAlert" },
  { id: "governance_statesman", title: "DAO Statesman", desc: "Simulated and passed a community governance proposal", icon: "Users" },
];

export const DAILY_FACTS = [
  "Bitcoin was created by an anonymous person or group of people using the pseudonym Satoshi Nakamoto in 2008.",
  "Ethereum introduced 'smart contracts', which are self-executing contracts with the terms of the agreement directly written into code lines.",
  "In Proof of Stake (PoS), validators are chosen to create new blocks based on the number of coins they hold and are willing to 'stake' as collateral.",
  "Gas Fees are the payments made by users to compensate for the computing energy required to process and validate transactions on a blockchain network.",
  "A DAO (Decentralized Autonomous Organization) is run by smart contracts and collective community voting, without a centralized leader.",
  "Unlike centralized money, cryptocurrencies utilize distributed ledgers so that no single government or entity controls the supply.",
];

export const INSPIRATIONAL_QUOTES = [
  "The blockchain is an incorruptible digital ledger of economic transactions that can be programmed to record not just financial transactions but virtually everything of value. — Don & Alex Tapscott",
  "Whereas most technologies tend to automate workers on the periphery doing menial tasks, blockchains automate away the center. — Vitalik Buterin",
  "Crypto is not just about digital money. It is about redesigning coordination, trust, and ownership. — Coin Dev Mentor",
];

export const CASE_STUDIES = [
  {
    name: "EcoChain (ECO)",
    industry: "Environmental Conservation",
    ticker: "ECO",
    mission: "To incentivize global carbon offset actions by distributing reward tokens for verified tree plantation and recycling.",
    maxSupply: "500,000,000",
    theme: "Green Tech",
    distribution: "45% Community Rewards, 20% Eco-Fund Treasury, 20% Core Team, 15% Strategic Partners",
    strength: "High community alignment, clear real-world utility proxy."
  },
  {
    name: "GameGuild Token (GGT)",
    industry: "Gaming & Esports",
    ticker: "GGT",
    mission: "Powering in-game item transactions, player tournaments, and decentralized game development voting across allied indie RPG games.",
    maxSupply: "1,000,000,000",
    theme: "Retro Arcade",
    distribution: "50% Play-to-Earn Rewards, 25% Ecosystem Fund, 15% Developers, 10% Seed Backers",
    strength: "Dynamic micro-transaction simulation with high circulating velocity."
  },
  {
    name: "HealthShare (HLT)",
    industry: "Healthcare Data",
    ticker: "HLT",
    mission: "Enabling patients to securely encrypt and lease their anonymized health tracker data to researchers in exchange for health utility tokens.",
    maxSupply: "100,000,000",
    theme: "Clinical Aqua",
    distribution: "40% Data Providers, 30% Research Grants, 20% Tech Infrastructure, 10% Clinical Advisors",
    strength: "Highly focused on security and privacy compliance considerations."
  }
];

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "Blockchain",
    category: "Basics",
    definition: "A shared, immutable ledger that facilitates the process of recording transactions and tracking assets in a network."
  },
  {
    term: "Smart Contract",
    category: "Basics",
    definition: "A self-executing program that automatically runs when predetermined conditions are met on a blockchain network."
  },
  {
    term: "Tokenomics",
    category: "Tokenomics",
    definition: "The science of token economy, encompassing the creation, distribution, supply constraints, and incentives of a cryptocurrency."
  },
  {
    term: "Proof of Work (PoW)",
    category: "Consensus",
    definition: "A consensus algorithm where miners compete to solve complex mathematical puzzles to validate transactions and earn block rewards."
  },
  {
    term: "Proof of Stake (PoS)",
    category: "Consensus",
    definition: "A consensus algorithm where validators are selected to create blocks based on the amount of cryptocurrency they lock up (stake)."
  },
  {
    term: "Gas Fee",
    category: "Basics",
    definition: "A fee paid by users to execute transactions or smart contracts on network blockchains, compensating validators for compute power."
  },
  {
    term: "DAO",
    category: "Governance",
    definition: "Decentralized Autonomous Organization. A group of people organized around collective rules enforced on-chain via smart contracts."
  },
  {
    term: "Liquidity",
    category: "Tokenomics",
    definition: "The ease with which a token can be converted into another token or cash without affecting its market price."
  },
  {
    term: "Circulating Supply",
    category: "Tokenomics",
    definition: "The number of tokens that are publicly available and actively circulating in the market."
  },
  {
    term: "Max Supply",
    category: "Tokenomics",
    definition: "The absolute maximum number of tokens that will ever exist for a particular cryptocurrency."
  },
  {
    term: "Inflation",
    category: "Tokenomics",
    definition: "The rate at which new tokens are minted and added to the circulating supply, potentially decreasing individual token value if demand is constant."
  },
  {
    term: "Rug Pull",
    category: "Security",
    definition: "A scam where developers hype up a project, attract user funds, and then suddenly drain all liquidity or abandon the project."
  },
  {
    term: "Phishing",
    category: "Security",
    definition: "An attack where malicious actors impersonate legitimate projects (like a fake wallet site) to steal users' private keys or seed phrases."
  },
  {
    term: "Seed Phrase",
    category: "Security",
    definition: "A sequence of 12 to 24 random words generated by a crypto wallet that serves as the backup key to access all funds. Never share it."
  },
  {
    term: "Audit",
    category: "Security",
    definition: "A thorough review of a smart contract's code by third-party security experts to find and fix bugs or vulnerabilities before deployment."
  },
  {
    term: "Whitepaper",
    category: "Basics",
    definition: "A detailed document published by a project's founders explaining its technological architecture, token utility, and roadmap."
  }
];

export const SCENARIO_CHALLENGES = [
  {
    id: "scen_1",
    title: "The Discord Support DM",
    situation: "You just joined the Discord group for an exciting new Web3 project. Immediately, a user named 'CoinDevSupport_Mod' DMs you: 'Welcome! Our system shows your wallet needs calibration to receive the active airdrop. Click this secure link coin-dev-airdrop-claim.net and input your 12-word recovery phrase to activate.' What do you do?",
    options: [
      { text: "Click the link and fill out the form carefully.", correct: false, XP: 0, feedback: "Incorrect. Supporting personnel will NEVER ask for your recovery phrase. This is a classic phishing scam." },
      { text: "Block the user, report them to the server moderators, and never share your seed phrase.", correct: true, XP: 30, feedback: "Excellent! Direct messages offering support links that ask for private keys or seed phrases are 100% malicious scams." }
    ]
  },
  {
    id: "scen_2",
    title: "Unvetted Code & No Audits",
    situation: "An anonymous developer launches 'SuperYielder Token' claiming 1,000% annual returns on staking. The smart contract source code is unverified on block explorers, and when asked about a third-party security audit, the developer replies: 'Audits are too slow and expensive. Trust the community.' How do you assess this?",
    options: [
      { text: "Invest high amounts early to benefit from the 1,000% returns before others.", correct: false, XP: 0, feedback: "Incorrect. Unaudiated smart contracts with anonymous founders promising extreme returns are highly prone to backdoors and exit scams (rug pulls)." },
      { text: "Avoid the project. High unaudiated yields combined with non-transparent code represent extreme risks of capital loss.", correct: true, XP: 30, feedback: "Correct! Smart contract audits are a fundamental requirement for project safety to protect user funds from critical exploits." }
    ]
  },
  {
    id: "scen_3",
    title: "The Twitter 'Double Your Coins' Promo",
    situation: "You see a verified Twitter account that looks exactly like a popular crypto founder tweeting: 'To celebrate our new token release, we are holding a 5,000 ETH giveaway! Send any amount between 0.1 to 5 ETH to our promotional address, and we will send you double the amount back instantly!' What is your action?",
    options: [
      { text: "Send 0.2 ETH to double it quickly.", correct: false, XP: 0, feedback: "Incorrect. Verified accounts are frequently hacked to run 'double-your-money' scams. No legitimate project will ever ask you to send funds first to receive a gift." },
      { text: "Ignore the tweet and check the official website. Report the hacked handle.", correct: true, XP: 30, feedback: "Correct! This is a typical 'advance-fee' scam designed to play on FOMO. Legitimate builders never request upfront deposits." }
    ]
  }
];

export const LESSON_MODULES: LessonModule[] = [
  {
    id: 1,
    title: "Blockchain Basics",
    shortDesc: "Understand blocks, decentralization, and cryptographic ledgers.",
    fullDesc: "Learn the foundational components of blockchain technology—how transactions are chained, what makes data immutable, and why decentralization transforms trust.",
    emoji: "🧱",
    sections: [
      {
        title: "1. What is a Distributed Ledger?",
        content: "Traditional money relies on central ledgers managed by banks. If Bank A says you have $10, that is the single source of truth. A blockchain, however, is a distributed ledger. Every computer (node) in the network maintains an identical copy of the entire ledger. Transactions are grouped into 'blocks' and linked chronologically using cryptography to form a 'chain'."
      },
      {
        title: "2. The Block Structure",
        content: "Every block contains transaction details, a timestamp, and a special cryptographic signature called a 'hash'. Critically, each block also contains the hash of the *previous* block. This creates an unbreakable cryptographic seal: if you alter a single transaction in Block 2, its hash changes, breaking the link with Block 3. This is what makes a blockchain immutable (tamper-proof)."
      }
    ],
    quiz: [
      {
        id: "q1_1",
        question: "What makes a blockchain ledger tamper-proof (immutable)?",
        options: [
          "It is hosted in a secret high-security server.",
          "Every block contains the cryptographic signature (hash) of the previous block.",
          "Only government regulators can edit the ledger.",
          "Transactions are written in invisible ink."
        ],
        correctIndex: 1,
        explanation: "Because each block includes the previous block's hash, changing old transactions invalidates all subsequent blocks, which is immediately rejected by the network nodes."
      },
      {
        id: "q1_2",
        question: "What is a network node in blockchain terminology?",
        options: [
          "A transaction fee paid by users.",
          "A cryptographic signature key.",
          "Any computer connected to the blockchain network that helps store or validate transactions.",
          "A type of physical crypto coin."
        ],
        correctIndex: 2,
        explanation: "Nodes are the decentralized computers that validate blocks and maintain the ledger, ensuring no single server can control the network."
      }
    ]
  },
  {
    id: 2,
    title: "Coins vs Tokens",
    shortDesc: "Grasp the difference between native assets and smart contract tokens.",
    fullDesc: "Discover why Ether is a coin but Shiba Inu is a token. Understand gas utility, custom standards, and digital assets.",
    emoji: "🪙",
    sections: [
      {
        title: "1. Cryptographic Coins",
        content: "A 'Coin' is a cryptocurrency that is native to its own independent blockchain network. Examples include Bitcoin (BTC) on the Bitcoin blockchain, Ether (ETH) on Ethereum, and SOL on Solana. Coins are primarily used to pay transaction gas fees, secure the network consensus, or store value."
      },
      {
        title: "2. Cryptographic Tokens",
        content: "A 'Token' does *not* have its own separate blockchain. Instead, it is built on top of an existing blockchain platform using smart contracts. For example, ERC-20 tokens are built on Ethereum. Tokens can represent utility (access to an app), governance (voting rights), or ownership of assets (NFTs)."
      }
    ],
    quiz: [
      {
        id: "q2_1",
        question: "What is the key difference between a Coin and a Token?",
        options: [
          "Coins are digital, while tokens can be physically printed.",
          "Coins operate on their own native blockchain, whereas tokens are built on existing blockchains using smart contracts.",
          "Tokens are always more expensive than coins.",
          "Coins cannot be traded on exchanges."
        ],
        correctIndex: 1,
        explanation: "Native assets like ETH or BTC are Coins. Custom tokens like UNI or LINK are created via smart contracts running on host networks."
      },
      {
        id: "q2_2",
        question: "What is the most famous standard for creating custom utility tokens on Ethereum?",
        options: [
          "ERC-20",
          "HTTP-3",
          "BTC-12",
          "SQL-2026"
        ],
        correctIndex: 0,
        explanation: "ERC-20 is the standard interface specification for fungible tokens on the Ethereum network, dictating how transfer, balance, and approval methods behave."
      }
    ]
  },
  {
    id: 3,
    title: "How Networks Work",
    shortDesc: "Compare Ethereum, Solana, and Bitcoin architectures.",
    fullDesc: "Explore how different blockchains solve the blockchain trilemma: Balancing security, scalability, and decentralization.",
    emoji: "🌐",
    sections: [
      {
        title: "1. Diverse Blockchain Architectures",
        content: "Different blockchains are engineered for different target properties. Bitcoin prioritizes maximum security and absolute decentralization, making transactions slower but highly secure. Ethereum adds programmability (smart contracts) but experiences congestion. Solana sacrifices some decentralized parameters to achieve high speeds and ultra-low fees through unique historical sequencing."
      },
      {
        title: "2. Layer 2 Scaling Networks",
        content: "Because Layer 1 blockchains (like Ethereum) have capacity limits, Layer 2 networks (like Polygon or Arbitrum) are built on top. They bundle transactions together, process them rapidly off-chain for cents, and submit the final state back to the secure Layer 1. This keeps security high while dropping costs."
      }
    ],
    quiz: [
      {
        id: "q3_1",
        question: "What is the 'Blockchain Trilemma' coined by Vitalik Buterin?",
        options: [
          "The challenge of choosing between Bitcoin, Ethereum, or Dogecoin.",
          "The three keys needed to unlock a private crypto vault.",
          "The trade-off between Decentralization, Security, and Scalability, where a network usually optimizes for two at the cost of the third.",
          "The process of converting code into standard smart contracts."
        ],
        correctIndex: 2,
        explanation: "The Trilemma states that it is extremely difficult to achieve high decentralization, flawless security, and high transaction speeds (scalability) simultaneously on a single Layer 1 network."
      }
    ]
  },
  {
    id: 4,
    title: "Consensus Mechanisms",
    shortDesc: "Master Proof of Work and Proof of Stake validators.",
    fullDesc: "Differentiate how networks agree on the correct order of ledger records safely without a middleman.",
    emoji: "⚡",
    sections: [
      {
        title: "1. The Need for Consensus",
        content: "Since there is no central server to approve transactions, how do nodes agree on the true history? A consensus mechanism solves this. It ensures all computers synchronize and prevent 'double-spending' (using the same digital coin twice)."
      },
      {
        title: "2. Proof of Work vs. Proof of Stake",
        content: "Proof of Work (PoW) forces nodes to spend computational energy solving math puzzles to win block creation rights. Proof of Stake (PoS) swaps energy for collateral: nodes 'stake' (lock up) tokens to act as validators. Stakers are chosen at random, and are penalized (slashed) if they try to validate fraudulent blocks."
      }
    ],
    quiz: [
      {
        id: "q4_1",
        question: "Why did Ethereum transition from Proof of Work (PoW) to Proof of Stake (PoS) in 2022?",
        options: [
          "To stop supporting custom smart contracts.",
          "To reduce its energy consumption by over 99.9% while improving scalability and staking utility.",
          "To allow users to mine coins using old graphics cards.",
          "Because Proof of Stake was invented by Satoshi Nakamoto."
        ],
        correctIndex: 1,
        explanation: "PoS removes the need for energy-hungry mining machines, replacing them with a system of validators staking capital as security deposits."
      }
    ]
  }
];
