/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import { useEthers, useContractCall } from '@usedapp/core'
import networkMapping from '../chain-info/deployments/map.json'
import { utils, constants } from 'ethers'
import { RegisterForm, UrlTable } from './registerForm'
import URLShortener from '../chain-info/contracts/URLShortener.json'
import { useRegisterClicks } from '../hooks'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.white,
    textAlign: 'center',
    padding: theme.spacing(4),
  },
}))

var USER_LOCATION: string
var requestFlag = false

export const Main = () => {
  var redirect = false
  var errorMessage = false

  const CHARACTER_LIMIT = 3
  const urlPath = window.location.pathname
  var path = urlPath.split('/').filter((e) => e)
  console.log(path)
  if (path.length > 0) {
    //path exist
    if (
      onlySinglePath(path) &&
      insideCharacterLimit(path[0], CHARACTER_LIMIT) &&
      pathExist(path[0])
    ) {
      redirect = true
    } else {
      errorMessage = true
      //render error message
    }
  }

  

  //Contract set up, ABI
  var redirectCode = ""
  if (redirect) {
    redirectCode = path[0]
  }

  const { account, chainId } = useEthers()
  const { abi } = URLShortener
  const URLShortenerAddress = chainId
    ? networkMapping[String(chainId)]['URLShortener'][0]
    : constants.AddressZero
  const URLShortenerInterface = new utils.Interface(abi)

  const [getURL] = 
    useContractCall({
      abi: URLShortenerInterface,
      address: URLShortenerAddress,
      method: 'urlMap',
      args: [redirectCode],
    }) ?? []

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    USER_LOCATION = 'Not Available'
  }
  const { registerClicks, state: useRegisterClicksState } = useRegisterClicks()

  //Register clicks
  if (redirect && getURL?.length > 0) {
    if (!requestFlag) {
      registerClicks(redirectCode, USER_LOCATION)
      requestFlag = true
    }
    window.location.replace(getURL)
    redirect = false  
  }  

  // if (!requestFlag) {
  //   // delay(3000).then(() => registerClicks("111", "asfdasdf"));
  //   requestFlag = true
  // }

  const classes = useStyles()
  return (
    <>
      <h2 className={classes.title}>Dapp Token App</h2>
      <RegisterForm />
      <UrlTable />
    </>
  )
}

function showPosition(position: any) {
  USER_LOCATION =
    'Latitude: ' +
    position.coords.latitude +
    ' Longitude: ' +
    position.coords.longitude
}

function onlySinglePath(array: Array<string>) {
  return array.length == 1
}
function insideCharacterLimit(path: string, characterLimit: number) {
  return path.length == characterLimit
}
function pathExist(path: string) {
  //find path in blockchain
  return true
}

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}