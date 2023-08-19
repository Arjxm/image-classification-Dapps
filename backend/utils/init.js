import Web3 from 'web3';
import fs from 'fs';


const RPC_URL =  'https://rpc.dev.buildbear.io/arjun';

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const CoreFunctionsHelper = loadJSON('../contracts/utils/CoreFunctionHelper.sol/CoreFunctionHelper.json');
const CoreFunctions  = loadJSON('../contracts/utils/CoreFunctions.sol/CoreFunctions.json');

console.log(CoreFunctions.networks)
export default async function init(){
    const web3 = await new Web3(RPC_URL);
    const networkId = await web3.eth.net.getId();
    const instance = new web3.eth.Contract(
        CoreFunctionsHelper.abi,"0x6920F47d8E6a95BD8dcfff344C267A5577968AB3",
    );

    console.log(instance)

    return {
        web3,
        CoreFunctionsAbi: CoreFunctions.abi,
        CoreFunctions: instance
    }
}


