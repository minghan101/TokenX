import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';
import { Web3Provider } from '@ethersproject/providers';  // ethers v6.0

const { parseEther } = ethers;
export const TransactionContext = React.createContext();
const { ethereum } = window;
console.log(ethereum);

//Access the blockchain

const getEthereumContract = async () => {
    if (ethereum) {
        const provider = new Web3Provider(ethereum); //injecyed Ethereum provider like MetaMask
        const signer = provider.getSigner();
        const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log({
            provider,
            signer,
            transactionContract,
        });
        return transactionContract;
    }
    return null;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [formData, setFormData] = useState({ addressTo: '', amount: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value })); //????
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                // getAllTransactions();
            } else {
                console.log("No accounts found");
            }

            console.log(accounts);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")
        }

    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")
        }
    }

    const sendTransaction = async () => {
        //entire logic of sending transactions
        try {
            if (!ethereum) return alert("Please install metamask");

            //get the data from the form
            const { addressTo, amount, keyword, message } = formData; // access to form data variables
            const transactionContract = await getEthereumContract();
            const parsedAmount = parseFloat(amount); // to convert to hex value
            if (isNaN(parsedAmount) || parsedAmount <= 0) return alert("Invalid amount entered");
            const parsedAmountInWei = ethers.parseEther(amount.toString()); // Convert to wei

            console.log('Form amount:', amount);
            console.log('Parsed Amount in ETH:', parseFloat(amount));
            console.log('Parsed Amount in Wei:', parsedAmountInWei.toString());
            console.log('Value being sent:', parsedAmountInWei.toString());

            // ########## HEXVALUE CONVERSION!!!! MUST HAVE
            const hexValue = `0x${BigInt(parsedAmountInWei).toString(16)}`; // IMPORTANT!!!! THE VALUE MUST CONVERT
            console.log('Hexadecimal Value:', hexValue);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //Go google this hex to decimal (which is 2100 Gwei)
                    value: hexValue, // need to convert to hex value
                }]
            });

            const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmountInWei, message, keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])


    return (
        <TransactionContext.Provider value={{ transactionCount, connectWallet, currentAccount, isLoading, sendTransaction, handleChange, formData, setFormData }}>
            {children}
        </TransactionContext.Provider>
    );
}