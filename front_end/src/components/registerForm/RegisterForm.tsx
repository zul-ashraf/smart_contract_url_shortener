import { Box, makeStyles } from '@material-ui/core'
import React, { useState } from "react"
import { useEthers } from "@usedapp/core"
import { Button, Input, CircularProgress } from "@material-ui/core"
import { useRegisterUrl } from "../../hooks"

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
    height: '100px',
  },
  header: {
    color: 'white',
  },
}))

export const RegisterForm = () => {
  const { account } = useEthers()

  const [uriString, setAmount] = useState<number | string | Array<number | string>>(0)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value
    setAmount(newAmount)
    console.log(newAmount)
  }

  
  const { registerURL, state: registerURLState } = useRegisterUrl()
    const handleregisterURLSubmit = () => {
      if(!validURL(uriString.toString())){
        alert("Can Only Register URL")
        return
      }
      return registerURL(uriString.toString())
  }
  const isMining = registerURLState.status === "Mining"

  

  const classes = useStyles()
  return (
    <Box>
      <h1 className={classes.header}> Register URL </h1>
      <Box className={classes.box}>
        <>
          <div className={classes.tabContent}>
            <Input 
            placeholder="Enter URL Here" 
            onChange={handleInputChange}  />
            <Button
              variant="outlined"
              onClick={handleregisterURLSubmit}
              color="primary"
              size="medium"
              disabled={isMining}
            >
              {isMining ? <CircularProgress size={26} /> : 'Register URL!!!'}
            </Button>
            
          </div>
        </>
      </Box>
    </Box>
  )
}

function validURL(string: string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
