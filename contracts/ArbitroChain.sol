// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ArbitroChain {
    IERC20 public grullToken;
    uint8 constant MAX_ARBITRATORS = 8;

    struct Company {
        string name;
    }

    struct Dispute {
        string companyAName;
        address companyAAddress;
        string companyBName;
        address companyBAddress;
        string issueDescription;
        string category;
        address[] selectedArbitrators;
        mapping(address => bool) votedArbitrators;
        mapping(address => uint8) votes; // 1 = A, 2 = B
        uint256 voteA;
        uint256 voteB;
        bool resolved;
    }

    struct DisputeInfo {
        uint256 id;
        string companyAName;
        string companyBName;
        string issueDescription;
        string category;
        bool resolved;
    }

    mapping(address => Company) public companies;
    mapping(address => uint256) public arbitratorStakes;
    address[] public allArbitrators;
    Dispute[] public disputes;

    event DisputeRaised(
        uint256 indexed disputeId,
        string companyAName,
        address indexed companyA,
        string companyBName,
        address indexed companyB,
        string issueDescription,
        string category
    );

    event DisputeResolved(uint256 indexed disputeId, address winner);

    constructor(address _grullToken) {
        grullToken = IERC20(_grullToken);
    }

    // Arbitrator deposits tokens to be eligible for voting
    function depositStake(uint256 _amount) external {
        require(_amount > 0, "Stake must be positive");
        grullToken.transferFrom(msg.sender, address(this), _amount);
        if (arbitratorStakes[msg.sender] == 0) {
            allArbitrators.push(msg.sender);
        }
        arbitratorStakes[msg.sender] += _amount;
    }

    // Function to check if an address is an arbitrator
    function isArbitrator(address _arbitrator) public view returns (bool) {
        return arbitratorStakes[_arbitrator] > 0;
    }

    // Company A raises a dispute against Company B
    function raiseDispute(
        string memory _companyAName,
        string memory _companyBName,
        string memory _issueDescription,
        string memory _category
    ) external {
        // require(isArbitrator(msg.sender), "Caller is not an arbitrator");

        address _companyB = msg.sender; // The address of Company B is passed as a parameter
        address[] memory selectedArbitrators = selectArbitrators();

        Dispute storage newDispute = disputes.push();
        newDispute.companyAName = _companyAName;
        newDispute.companyAAddress = msg.sender;
        newDispute.companyBName = _companyBName;
        newDispute.companyBAddress = _companyB;
        newDispute.issueDescription = _issueDescription;
        newDispute.category = _category;
        newDispute.selectedArbitrators = selectedArbitrators;

        emit DisputeRaised(
            disputes.length - 1,
            _companyAName,
            msg.sender,
            _companyBName,
            _companyB,
            _issueDescription,
            _category
        );
    }

    // Function to get all disputes
    function getAllDisputes() external view returns (DisputeInfo[] memory) {
        DisputeInfo[] memory disputeInfos = new DisputeInfo[](disputes.length);

        for (uint256 i = 0; i < disputes.length; i++) {
            Dispute storage dispute = disputes[i];
            disputeInfos[i] = DisputeInfo({
                id: i,
                companyAName: dispute.companyAName,
                companyBName: dispute.companyBName,
                issueDescription: dispute.issueDescription,
                category: dispute.category,
                resolved: dispute.resolved
            });
        }

        return disputeInfos;
    }

    // Arbitrators vote for a company (1 for A, 2 for B)
    function vote(uint256 _disputeId, uint8 _vote) external {
        Dispute storage dispute = disputes[_disputeId];
        require(!dispute.votedArbitrators[msg.sender], "Already voted");
        require(
            isArbitratorSelected(_disputeId, msg.sender),
            "Not a selected arbitrator"
        );
        require(_vote == 1 || _vote == 2, "Invalid vote");

        dispute.votedArbitrators[msg.sender] = true;

        if (_vote == 1) {
            dispute.voteA++;
            dispute.votes[msg.sender] = 1;
        } else {
            dispute.voteB++;
            dispute.votes[msg.sender] = 2;
        }

        if (dispute.voteA + dispute.voteB == MAX_ARBITRATORS) {
            resolveDispute(_disputeId);
        }
    }

    // Resolve the dispute based on voting
    function resolveDispute(uint256 _disputeId) internal {
        Dispute storage dispute = disputes[_disputeId];
        require(!dispute.resolved, "Dispute already resolved");

        address winner = dispute.voteA > dispute.voteB
            ? dispute.companyAAddress
            : dispute.companyBAddress;
        uint256 losingVotes = dispute.voteA > dispute.voteB
            ? dispute.voteB
            : dispute.voteA;

        distributeStakes(_disputeId, winner, losingVotes);
        dispute.resolved = true;

        emit DisputeResolved(_disputeId, winner);
    }

    // Distribute stakes using logarithmic redistribution for fairer results
    function distributeStakes(
        uint256 _disputeId,
        address _winner,
        uint256 _losingVotes
    ) internal {
        Dispute storage dispute = disputes[_disputeId];
        uint256 totalLosingStake = 0;

        // Calculate total stake of losing voters
        for (uint256 i = 0; i < MAX_ARBITRATORS; i++) {
            address arbitrator = dispute.selectedArbitrators[i];
            if (
                dispute.votes[arbitrator] ==
                (_winner == dispute.companyAAddress ? 2 : 1)
            ) {
                totalLosingStake += arbitratorStakes[arbitrator];
            }
        }

        // Redistribute stakes among winning voters
        for (uint256 i = 0; i < MAX_ARBITRATORS; i++) {
            address arbitrator = dispute.selectedArbitrators[i];
            if (
                dispute.votes[arbitrator] ==
                (_winner == dispute.companyAAddress ? 1 : 2)
            ) {
                uint256 reward = totalLosingStake / _losingVotes;
                grullToken.transfer(arbitrator, reward);
            }
        }
    }

    // Roulette Wheel Selection of arbitrators
    function selectArbitrators() internal view returns (address[] memory) {
        address[] memory arbitrators = new address[](MAX_ARBITRATORS);
        uint256 totalStake = 0;

        // Calculate total stake of all arbitrators
        for (uint256 i = 0; i < allArbitrators.length; i++) {
            totalStake += arbitratorStakes[allArbitrators[i]];
        }

        require(totalStake > 0, "Total stake must be greater than zero");

        bool[] memory selected = new bool[](allArbitrators.length);

        // Select arbitrators using roulette wheel selection
        for (uint8 j = 0; j < MAX_ARBITRATORS; j++) {
            uint256 randomValue = uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, block.prevrandao, j)
                )
            ) % totalStake;
            uint256 cumulativeStake = 0;

            for (uint256 i = 0; i < allArbitrators.length; i++) {
                if (selected[i]) continue; // Skip already selected arbitrators

                cumulativeStake += arbitratorStakes[allArbitrators[i]];

                if (randomValue < cumulativeStake) {
                    arbitrators[j] = allArbitrators[i];
                    selected[i] = true;
                    break;
                }
            }
        }

        return arbitrators;
    }

    // Helper function to check if an address is selected as an arbitrator for a dispute
    function isArbitratorSelected(
        uint256 _disputeId,
        address _arbitrator
    ) internal view returns (bool) {
        Dispute storage dispute = disputes[_disputeId];
        for (uint256 i = 0; i < MAX_ARBITRATORS; i++) {
            if (dispute.selectedArbitrators[i] == _arbitrator) {
                return true;
            }
        }
        return false;
    }

    // Get the stake held by an arbitrator
    function getArbitratorStake(
        address _arbitrator
    ) external view returns (uint256) {
        return arbitratorStakes[_arbitrator];
    }

    // Get all registered arbitrators (used internally for selection)
    function getAllArbitrators() internal view returns (address[] memory) {
        return allArbitrators;
    }
}

// Deployed contract address: 0x0532A7259F2c82F0FFBb0AA9b19302B26c4B0c07
