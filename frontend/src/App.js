import {useEffect, useState} from "react";
import DashBoard from "./Page/DashBoard";
import {connectMetamask} from "./utils/connectMetamask";
import ConnectToMetaMaskButton from "./components/ConnectToMetaMaskButton";
import {Joiner} from "./Page/Joiner";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [networkId, setNetWorkId] = useState(null);

  const [currentPage, setCurrentPage] = useState('main');

  //Functions
  useEffect(() => {
    connectMetamask(setWeb3, setAccount, setNetWorkId);
  }, []);

  return (
    <div className="p-6 h-screen">
      <div className="flex justify-between">
        <div>
          {account ? (
              <button
                  onClick={() => connectMetamask(setWeb3, setAccount, setNetWorkId)}
                  className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
              >
                Connected to{" "}
                {"0x..." + account[0]?.substr(account[0]?.length - 4)}
              </button>
          ) : (
              <ConnectToMetaMaskButton
                  connect={() => connectMetamask(setWeb3, setAccount, setNetWorkId)}
              />
          )}
        </div>
        <button
            onClick={() => {setCurrentPage('joiner')}}
            data-tooltip-target="tooltip-left"
            data-tooltip-placement="left"
            type="button"
            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
        >
          {currentPage === 'joiner' ? 'joined' : 'join as miner'}
        </button>
      </div>
      <div className= "items-center justify-center">
        {currentPage === 'main' ? <DashBoard web3={web3} account={account} networkId={networkId} /> : <Joiner account={account}/>}
      </div>


    </div>
  );
}

export default App;
