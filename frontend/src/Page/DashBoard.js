import { useEffect, useState } from "react";
import axios from "axios";
import keccak from "keccak";
import { Buffer } from "buffer";
import Web3 from "web3";
import UploadCard from "../components/UploadCard";
import PreviewCard from "../components/PreviewCard";
import { connectMetamask } from "../utils/connectMetamask";
import { getIPFSCID } from "../utils/ipfs";
import ResultCard from "../components/ResultCard";
// Contract call
import Main from "../contracts/Main.json";

import ConnectToMetaMaskButton from "../components/ConnectToMetaMaskButton";
import Loading from "../components/Loading";
import CheckPassCodeComponent from "../components/CheckPassCodeComponet";
import CopyToClipboard from "../components/CopyToCilpBoard";
import {bufferToHexString, imageToHex} from "../utils/bufferToHexString";
import {deflated, Inflated} from "../utils/deflate";


//web3
function DashBoard({networkId, web3, account}) {
  //Loading
  const [isLoading, setIsLoading] = useState(false);
  const [cidHash, setCidHash] = useState("");
  const [passCode, setPassCode] = useState("");
  const [reqSend, setReqSend] = useState(false);
  const [userPas, setUserPas] = useState("");
  // web3


  // image
  const [selectedFile, setSelectedFile] = useState(null);
  // result
  const [prediction, setPrediction] = useState(null);

  const getPredictionResult = async () => {
    try {
      if (!networkId || !web3 || !account) {
        console.error("Missing required data");
        return;
      }
      const network = Main.networks[networkId];
      if (!network) {
        console.error("Network ID not found in contract");
        return;
      }
      console.log(" Passcode", userPas);
      const address = network.address;
      const contract = new web3.eth.Contract(Main.abi, address);
      const result = await contract.methods.getLatestResponse(userPas).call();
      setPrediction(result);
    } catch (e) {
      console.error(e);
    }
  };

  // Image handle
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleContractCall = async () => {
    setIsLoading(true);
    try {
      if (!networkId || !selectedFile || !web3 || !account) {
        console.error("Missing required data");
        return;
      }
      const network = Main.networks[networkId];
      if (!network) {
        console.error("Network ID not found in contract");
        return;
      }

      const address = network.address;
      const contract = new web3.eth.Contract(Main.abi, address);
      await contract.methods
        .requestPrediction(cidHash, 0)
        .send({ from: account[0] });
      setReqSend(true);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };


  const genPassWord = async () => {


    const reader = new FileReader();
    reader.onloadend = async () => {
      setIsLoading(true);
      const buffer = reader.result;
      const decoder = new TextDecoder();
      const hex = bufferToHexString(buffer);
      const dhex = await deflated(hex)
      console.log("HEx string"  , hex);
      console.log("dHEx string"  , dhex);

      // const newHex = await Inflated(dhex)
      const cid = await getIPFSCID(selectedFile);
      setCidHash(cid);
      const hash = Web3.utils.keccak256(cid);
      setPassCode(hash);
      setIsLoading(false);
    }
    reader.readAsArrayBuffer(selectedFile);


  };

  console.log(cidHash);

  return (
    <div className="">
      {selectedFile ? (
        reqSend ? (
          prediction ? (
            <ResultCard
              image={URL.createObjectURL(selectedFile)}
              handleContractCall={() => {}}
              result={
                prediction.toString() === '0'
                  ? "covid detected"
                  : "no covid detected"
              }
            />
          ) : (
            <CheckPassCodeComponent
              handleGetResult={getPredictionResult}
              handleInputChange={(e) => {
                setUserPas(e.target.value);
              }}
              password={userPas}
            />
          )
        ) : isLoading ? (
          <div className="h-full flex items-center justify-center">
            (<Loading />)
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <CopyToClipboard text={passCode} />
            <PreviewCard
              image={URL.createObjectURL(selectedFile)}
              handleContractCall={passCode ? handleContractCall : genPassWord}
              btnFuncName={passCode ? "Send Request" : "Create passcode"}
              con={passCode ? true : false}
            />
          </div>
        )
      ) : (
        <div className="h-full flex items-center justify-center">
          <UploadCard handleChange={handleFileSelect} />
        </div>
      )}
    </div>
  );
}

export default DashBoard;
