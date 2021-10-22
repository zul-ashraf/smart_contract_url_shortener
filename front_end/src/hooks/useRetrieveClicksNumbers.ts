// import { useState } from "react"
// import { useEthers, useContractCall } from "@usedapp/core"
// import { utils, BigNumber, constants } from "ethers"
// import URLShortener from "../chain-info/contracts/URLShortener.json"
// import networkMapping from "../chain-info/deployments/map.json"

// export const useRetrieveClicksNumber = () => {
//   const { account, chainId } = useEthers()
//   const { abi } = URLShortener
//   const URLShortenerAddress = chainId ? networkMapping[String(chainId)]["URLShortener"][0] : constants.AddressZero
//   const URLShortenerInterface = new utils.Interface(abi)

//   const [retrieveClicksNumber] =
//   useContractCall({
//     abi: URLShortenerInterface,
//     address: URLShortenerAddress,
//     method: "retrieveClicksNumber",
//     args: [account],
//   }) ?? []
//     // //Map urlKey to URL
//     // mapping(uint256 => string) public urlMap;
//     // //Map urlKey to bool
//     // mapping(uint256 => bool) public pathKey;
//     // //Map urlKey to clicks generated
//     // mapping(uint256 => Click[]) public urlClicks;

//     // uint keyCounter;
//     // //Map keyCounter to urlKey
//     // mapping(uint256 => uint256) public registeredKey;

//   return retrieveClicksNumber
// }

export {}
