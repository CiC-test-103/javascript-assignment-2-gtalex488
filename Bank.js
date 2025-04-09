// 🏦 Bank and Account System
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }
// Create a bank account and store in bank accounts array
    createAccount(name, initialDeposit) {
        if (initialDeposit <= 0) {
            console.log("Initial deposit must be greater than zero!");
            return;
        } 
        const newAccount = new Account(name, initialDeposit);
        this.accounts.push(newAccount);
        return newAccount;
    }
}
// Create individual bank account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this._transactionHistory = []; // Keeps a record of all transactions
    }

// transaction history getter   
    get transactionHistory() {
        return this._transactionHistory;
    }  
// Deposit method    
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount; 
            this._transactionHistory.push({transactionType: 'Deposit', amount: amount});
            console.log(`${this.name} deposited ${amount}. Balance: ${this.balance}                    `);
        } else {
            console.log("Deposit amount cannot be negative. Please enter a positive number.");
        }
    }
// withdrawal method
    withdraw(amount) {
        if (amount < 0) {
            console.log(`Invalid withdrawal amount. Please enter a positive number.`);
        }
        else if (this.balance === 0 || amount > this.balance) {
            console.log(`Insufficient funds. Your balance is ${this.balance}. Please deposit some amount.`);
        }
        else {
            this.balance -= amount;
            this._transactionHistory.push({transactionType: 'Withdrawal', amount: amount});
            console.log(`${this.name} withdraws ${amount}. New balance: ${this.balance}`);
        } 
     }
// Transfer method
    transfer(amount, recipientAccount) {
        if (amount <= 0) {
            console.log("Transfer amount must be greater than zero.");
            return;
        }
        if (amount > this.balance) {
            console.log(`You do not have enough balance to transfer.`);
            return;
        }
        this.balance -= amount;
        this._transactionHistory.push({
            transactionType: 'Transfer',
            amount: amount,
            to: recipientAccount.name
        });
        recipientAccount.balance += amount;
        recipientAccount._transactionHistory.push({
            transactionType: 'Received',
            amount: amount,
            from: this.name
        });
        console.log(`Transferred ${amount} from ${this.name} to ${recipientAccount.name}.`);
    }    
// Return 
    checkBalance() {
        return this.balance;
    }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
 function testBankOperations() {
     const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);
 
    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

   // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

 module.exports = testBankOperations;

// //<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


 console.log(testBankOperations());

