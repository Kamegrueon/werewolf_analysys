import React, { useState } from "react"
import { useHistory, Link } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"

import { SIGN_IN_PARAMS } from "../types"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { signIn } from "../../reducers/userSlice"
import { Spacer } from "../../utils/Spacer"
import { Grid } from "@mui/material"

import { useSnackbar } from 'notistack';
import AlertMessage from "../../utils/AlertMessage"

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6)
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400,
  },
  box: {
    marginTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}))

// サインイン用ページ
const SignIn: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()

  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  
  const dispatch: AppDispatch = useDispatch()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SIGN_IN_PARAMS = {
      email: email,
      password: password
    }

    const res: any = await dispatch(signIn(params))
    
    if(res.type === "user/signIn/fulfilled"){
      history.push("/games")
      console.log("Signed in successfully!")
    } else if(res.type === "user/signIn/rejected"){
      console.log(res);
      AlertMessage(res.payload?.errors, enqueueSnackbar)
    }
  }

  return (
    <>
      <Spacer size={70}/>
      <Grid container justifyContent="center">
        <form noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="Sign In" />
            <CardContent>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email"
                value={email}
                margin="dense"
                onChange={event => setEmail(event.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                margin="dense"
                autoComplete="current-password"
                onChange={event => setPassword(event.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="default"
                disabled={!email || !password ? true : false} // 空欄があった場合はボタンを押せないように
                className={classes.submitBtn}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Box textAlign="center" className={classes.box}>
                <Typography variant="body2">
                  Don't have an account? &nbsp;
                  <Link to="/signup" className={classes.link}>
                    Sign Up now!
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </form>
      </Grid>
    </>
  )
}

export default SignIn