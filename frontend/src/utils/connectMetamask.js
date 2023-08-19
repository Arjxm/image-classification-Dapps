import Web3 from 'web3';

export const connectMetamask = async (setWeb3, setAccount, setNetWorkID) => {
    try{
        if( window.ethereum !== 'undefined'){
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3Instance = new Web3(window.ethereum);
            const accounts = await web3Instance.eth.getAccounts();
            const networkID = await web3Instance.eth.net.getId();
            setAccount(accounts);
            setWeb3(web3Instance);
            setNetWorkID(networkID)
              // Handle account change event
            window.ethereum.on('accountsChanged', async (newAccounts) => {
                setAccount(newAccounts);
            });
        }else{
            alert("MetaMask not installed")
        }
    }catch (e){
        console.log(e);
    }
}
