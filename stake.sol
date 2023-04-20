
pragma solidity ^0.8.0;

contract StakingContract {

    mapping(address => uint256) public stakedBalances;

    uint256 public stakingDuration;

    address public owner;



    event Staked(address indexed user, uint256 amount);

    event Unstaked(address indexed user, uint256 amount);

    event Withdrawn(address indexed user, uint256 amount);



    constructor(uint256 _stakingDuration) {

        owner = msg.sender;

        stakingDuration = _stakingDuration;

    }



    modifier onlyOwner() {

        require(msg.sender == owner, "Only the contract owner can call this function");

        _;

    }



    function stake() external payable {

        require(msg.value > 0, "Staked amount must be greater than zero");

        stakedBalances[msg.sender] += msg.value;

        emit Staked(msg.sender, msg.value);

    }



    function unstake() external {

        require(stakedBalances[msg.sender] > 0, "No BNB staked");

        require(block.timestamp >= stakingDuration, "Staking duration not yet reached");

        uint256 amount = stakedBalances[msg.sender];

        stakedBalances[msg.sender] = 0;

        payable(msg.sender).transfer(amount);

        emit Unstaked(msg.sender, amount);

    }



    function withdrawStakedBNB(uint256 amount) external onlyOwner {

        require(amount > 0, "Withdrawn amount must be greater than zero");

        require(address(this).balance >= amount, "Not enough balance in the contract");

        payable(owner).transfer(amount);

        emit Withdrawn(owner, amount);

    }



    function getStakedBalance(address user) external view returns (uint256) {

        return stakedBalances[user];

    }



    function updateStakingDuration(uint256 _stakingDuration) external onlyOwner {

        stakingDuration = _stakingDuration;

    }

}

