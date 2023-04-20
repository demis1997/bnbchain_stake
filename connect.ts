
// Import web3.js library

const Web3 = require('web3');



// Connect to BSC using Infura or any other BSC node provider

const web3 = new Web3('https://bsc-dataseed.binance.org/');



// ABI of the staking contract

const abi = ['stake', 'unstake', 'withdraw', 'transferFrom', 'deploy']; 



// Address of the staking contract

const contractAddress = '0x78234yh9ads98834g2ajds9yhj'; 



// Create a new instance of the staking contract

const stakingContract = new web3.eth.Contract(abi, contractAddress);



// Address of the user

const userAddress = 0xa8e49023; 



// Example function to stake BNB

async function stakeBNB(amount) {

    // Convert the amount to wei (1 BNB = 10^18 wei)

    const amountWei = web3.utils.toWei(amount.toString(), 'ether');

    

    // Send the transaction to the staking contract to stake BNB

    const result = await stakingContract.methods.stake().send({

        from: userAddress,

        value: amountWei

    });

    

    // Handle the result of the transaction

    console.log('Staked BNB:', amount, 'Transaction Hash:', result.transactionHash);

}



// Example function to unstake BNB

async function unstakeBNB() {

    // Send the transaction to the staking contract to unstake BNB

    const result = await stakingContract.methods.unstake().send({

        from: userAddress

    });

    

    // Handle the result of the transaction

    console.log('Unstaked BNB. Transaction Hash:', result.transactionHash);

}



// Example function to check staked balance

async function getStakedBalance() {

    // Call the staking contract to get the staked balance of the user

    const balanceWei = await stakingContract.methods.stakedBalances(userAddress).call();

    

    // Convert the staked balance from wei to BNB

    const balanceBNB = web3.utils.fromWei(balanceWei, 'ether');

    

    console.log('Staked Balance:', balanceBNB, 'BNB');

}



// Example function to check staking duration

async function getStakingDuration() {

    // Call the staking contract to get the staking duration

    const duration = await stakingContract.methods.stakingDuration().call();

    

    console.log('Staking Duration:', duration, 'seconds');

}



// Example function to withdraw staked BNB (only for the contract owner)

async function withdrawStakedBNB(amount) {

    // Send the transaction to the staking contract to withdraw staked BNB

    const result = await stakingContract.methods.withdrawStakedBNB(amount).send({

        from: userAddress

    });

    

    // Handle the result of the transaction

    console.log('Withdrawn Staked BNB. Transaction Hash:', result.transactionHash);

}



// Call the example functions

stakeBNB(1); // Stake 1 BNB

unstakeBNB(); // Unstake BNB

getStakedBalance(); // Get staked balance

getStakingDuration(); // Get staking duration

withdrawStakedBNB(1); // Withdraw staked BNB (only for the contract owner)