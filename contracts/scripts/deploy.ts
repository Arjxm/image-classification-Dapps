import { ethers } from "hardhat";

async function main() {

  //libs
  // const RequestDataStorageLib = await ethers.deployContract("RequestDataStorageLib");
  // await RequestDataStorageLib.waitForDeployment();
  // const RequestDataStorageLibAddress  = await RequestDataStorageLib.getAddress();
  // console.log("RequestDataStorageLibAddress", RequestDataStorageLibAddress);

  // const TokenTransferLib = await ethers.deployContract("TokenTransferLib");
  // await TokenTransferLib.waitForDeployment();
  // const TokenTransferLibAddress  = await TokenTransferLib.getAddress();
  // console.log("TokenTransferLibAddress", TokenTransferLibAddress);

  // const GetRequestDataLib = await ethers.deployContract("GetRequestDataLib");
  // await GetRequestDataLib.waitForDeployment();
  // const GetRequestDataLibAddress  = await GetRequestDataLib.getAddress();
  // console.log("GetRequestDataLibAddress", GetRequestDataLibAddress);

  // const coreFunctionsLib = await ethers.deployContract("CoreFunctionsLib");
  // await coreFunctionsLib.waitForDeployment();
  // const coreFunctionsLibAddress  = await coreFunctionsLib.getAddress();
  // console.log("coreFunctionsLib", coreFunctionsLibAddress);


  //contract

  // const GetRequestData = await ethers.deployContract("GetRequestData");
  // await GetRequestData.waitForDeployment();
  // const GetRequestDataAddress = await GetRequestData.getAddress()
  // console.log("GetRequestData", await GetRequestData.getAddress())

  const coreFunctions = await ethers.deployContract("CoreFunctions");
  await coreFunctions.waitForDeployment();
  console.log("coreFunctions", await coreFunctions.getAddress())

  // const coreFunctionsHelper = await ethers.deployContract("CoreFunctionHelper");
  // await coreFunctionsHelper.waitForDeployment();
  // console.log("coreFunctionsHelper", await coreFunctionsHelper.getAddress())

  // const main = await ethers.deployContract("Main", [coreFunctionsHelper.getAddress()]);
  // await main.waitForDeployment();

  // console.log(
  //   `main ${main.target}`
  // );

  
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
