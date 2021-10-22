import { useState } from "react"
import { useEthers, useContractFunction } from "@usedapp/core"
import { constants, utils } from "ethers"
import URLShortener from "../chain-info/contracts/URLShortener.json"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../chain-info/deployments/map.json"

export const useRegisterClicks = () => {
    // address
    // abi
    // chainId
    const { chainId } = useEthers()
    const { abi } = URLShortener
    const URLShortenerAddress = chainId ? networkMapping[String(chainId)]["URLShortener"][0] : constants.AddressZero
    const URLShortenerInterface = new utils.Interface(abi)
    const URLShortenerContract = new Contract(URLShortenerAddress, URLShortenerInterface)

    // register
    const { send: registerClicksSend, state: registerClicksState } =
        useContractFunction(URLShortenerContract, "registerClicks", {
            transactionName: "Register Clicks",
        })
    const registerClicks = (pathKey: string, location: string) => {
        return registerClicksSend(pathKey, location)
    }
    
    const [state, setState] = useState(registerClicksState)
    
    return { registerClicks, state }
}
