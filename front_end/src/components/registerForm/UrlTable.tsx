import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import React, { useState } from 'react'
import { useEthers, useNotifications, useContractCall, useContractFunction } from '@usedapp/core'
import { useRegisterUrl } from '../../hooks'
import { utils, constants, BigNumber } from 'ethers'
import URLShortener from '../../chain-info/contracts/URLShortener.json'
import networkMapping from '../../chain-info/deployments/map.json'


const useStyles = makeStyles((theme) => ({
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginUp: '100px',
  },
  box: {
    backgroundColor: 'white',
    borderRadius: '25px',
  },
  header: {
    color: 'white',
  },
}))

function createData(
  id: number,
  url: string,
  buttonId: number,
) {
  return { id, url, buttonId,}
}


export const UrlTable = () => {
  
    const { chainId } = useEthers()
    const { abi } = URLShortener
    const URLShortenerAddress = chainId
      ? networkMapping[String(chainId)]['URLShortener'][0]
      : constants.AddressZero
    const URLShortenerInterface = new utils.Interface(abi)
  
    const [getID] =
      useContractCall({
        abi: URLShortenerInterface,
        address: URLShortenerAddress,
        method: 'registeredKey',
        args: [0],
      }) ?? []
  
    var number = parseInt(getID?._hex, 16) 
  
  const [getURL] =
  useContractCall({
      abi: URLShortenerInterface,
      address: URLShortenerAddress,
      method: 'urlMap',
      args: [number],
  }) ?? []

  const [getClicks] =
  useContractCall({
      abi: URLShortenerInterface,
      address: URLShortenerAddress,
      method: 'retrieveClicksNumber',
      args: [number],
  }) ?? []

  var clicks = parseInt(getClicks?._hex, 16) 


  const rows = [
    createData(number, getURL, clicks)
  ]
  const { account } = useEthers()
  const { notifications } = useNotifications()

  const [uriString, setAmount] = useState<
    number | string | Array<number | string>
  >(0)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value
    setAmount(newAmount)
    console.log(newAmount)
  }

  const { registerURL, state: registerURLState } = useRegisterUrl()
  const handleregisterURLSubmit = () => {
    return registerURL(uriString.toString())
  }
  const isMining = registerURLState.status === 'Mining'

  const classes = useStyles()
  return (
    <Box>
      <h1 className={classes.header}> Analytics </h1>
      <Box className={classes.box}>
        <>
          <div className={classes.tabContent}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">URL</TableCell>
                    <TableCell align="right">Number of Clicks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.url}</TableCell>
                      <TableCell align="right">{row.buttonId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      </Box>
    </Box>
  )
}
