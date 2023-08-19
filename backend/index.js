import express from 'express';
import cors from 'cors';
import Miner from "./utils/miner.js";
import display from "./utils/display.js";
import init from "./utils/init.js";
import BN from "bn.js";
import getPrediction from "./utils/model-runner.js";
import { chalkStderr } from 'chalk';


const app = express();
app.use(express.json());
app.use(cors())

//Test
// const instance = await Main.deployed()
// await instance.requestPrediction("QmbG2WJAxUTyewHkDguD2VzvbnLHySshERoXLNdK8m4WxM", 0)

let miner;
let isMining = false;

function startEventListener({ web3, CoreFunctionsAbi, CoreFunctions }) {
  CoreFunctions.events
    .ReceivedRequest({})
    .on("data", (event) => handleNewRequest({ web3, CoreFunctionsAbi, CoreFunctions, event }));
  CoreFunctions.events
    .NewBlock({})
    .on("data", () => handleNewBlock({ web3, CoreFunctionsAbi, CoreFunctions }));
}

function handleNewRequest({ web3, CoreFunctionsAbi, CoreFunctions }) {
  if (!isMining) {
    checkAndMine({ web3, CoreFunctionsAbi, CoreFunctions });
  }
}


function handleNewBlock({ web3, CoreFunctionsAbi, CoreFunctions }) {
  if (isMining) {
    isMining = false;
    console.log("*--New block formed--*");
    checkAndMine({ web3, CoreFunctionsAbi, CoreFunctions });
  }
}

async function checkAndMine({ web3, CoreFunctionsAbi, CoreFunctions }) {

  console.log("**---Waiting to fetch requests--**");

  let canGetVars = await CoreFunctions.methods.canGetVariables().call();
  console.log(canGetVars)
  while (!canGetVars) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second
    canGetVars = await CoreFunctions.methods.canGetVariables().call();
  }

  // All variables are now available, proceed with mining
  startMining({ web3, CoreFunctionsAbi, CoreFunctions });
}

//Get all data from here
async function getVariables({ CoreFunctions }) {
  const vars = await CoreFunctions.methods.getCurrentVariables().call();
  return {
    challenge: vars[0],
    id: vars[1],
    difficulty: vars[2],
    dataPoint: vars[3],
  };
}


async function submitMiningSolution({
  web3, CoreFunctions, CoreFunctionsAbi,
  id,
  prediction,
  nonce,
}) {
  try {

    const stringValue = prediction[0];
    const decimalIndex = stringValue.indexOf(".");
    const integerPart = stringValue.substring(0, decimalIndex);
    const decimalPart = stringValue.substring(decimalIndex + 1);

    const bigNumberValue = new BN(integerPart + decimalPart);


    const encodedFunctionCall = web3.eth.abi.encodeFunctionCall(CoreFunctionsAbi[1], [
      id,
      bigNumberValue,
      nonce,
    ]);
    const tx = await web3.eth.sendTransaction({
      to: CoreFunctions.options.address,
      data: encodedFunctionCall,
      gas: 5000000,
    });
    console.log("Successfully submitted mining solution for request id: ", id);

    return !!tx;
  } catch (err) {
    console.log(
      err,
      "Transaction failed (no panic)"
    );
  }
}

let currentRequest = null

async function startMining({ web3, CoreFunctionsAbi, CoreFunctions }) {
  const { challenge, id, difficulty, dataPoint } = await getVariables({
    CoreFunctions,
  });

  isMining = true;

  currentRequest = {challenge, id, isSubmmited: false}
  console.log("*-------------Started Mining-------------*");
  display({ id, challenge, difficulty });
  const prediction = await getPrediction(dataPoint);

  console.log("Prediction value ", prediction[0])

  const nonce = await miner.findUnderTargetHash(
    web3,
    new BN(challenge.slice(2), 16),
    new BN(difficulty, 10)
  );
  console.log("Found POW solution: ", nonce);
  console.log("Prediction for given request: ", prediction);

  const isSubmittedSol = await submitMiningSolution({ web3, CoreFunctionsAbi, CoreFunctions, id, prediction, nonce });

  if(isSubmittedSol){
    currentRequest = {challenge, id, isSubmmited: true}
  }
}


app.post('/join', async (req, res) => {
  const {minerAddress} = req.body;
  const {  web3, CoreFunctionsAbi, CoreFunctions} = await init();
  miner = new Miner(minerAddress);
  currentRequest = {miner: minerAddress}
  web3.eth.defaultAccount = minerAddress;
  startEventListener({ web3, CoreFunctionsAbi, CoreFunctions });
  await checkAndMine({web3, CoreFunctionsAbi, CoreFunctions});

  if(minerAddress){
    res.status(200).json({message : "you are joined"})
  }
})

app.get('/miner', (req, res) => {
  res.status(200).json(currentRequest);
})

app.listen(5000, () => {
  console.log("Starting the server")
})


