import React, { useState } from "react"
import { useHistory } from "react-router-dom"
// import Cookies from "js-cookie"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"

import { SIGN_UP_PARAMS } from "../../components/types"

import { signUp } from "../../reducers/userSlice";
import { AppDispatch } from '../../store';
import { useDispatch } from "react-redux"
import { Grid } from "@mui/material"
import { Spacer } from "../../utils/Spacer"

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
    maxWidth: 400
  }
}))

// サインアップ用ページ
const SignUp: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  // const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  // const [errorMessages, setErrorMessages] = useState<string[]>([])

  const dispatch: AppDispatch = useDispatch()

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SIGN_UP_PARAMS = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }
    const res:any = await dispatch(signUp(params))
    console.log(res)
    if(res.type === "user/signUp/fulfilled"){
      history.push("/games")
      console.log("Signed in successfully!")
    } else if(res.type === "user/signUp/rejected"){
      console.log('これ',res);
      AlertMessage(res.payload?.errors.fullMessages, enqueueSnackbar)
      // res.payload?.errors.fullMessages.map((message: string) => enqueueSnackbar(message, {anchorOrigin: {horizontal: 'center', vertical: 'top'}, variant: 'error'}))
    }
  }

  return (
    <>
      <Spacer size={70} />
      <Grid container justifyContent="center">
        <form noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="Sign Up" />
            <CardContent>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Name"
                value={name}
                margin="dense"
                onChange={event => setName(event.target.value)}
              />
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
                value={password}
                margin="dense"
                autoComplete="current-password"
                onChange={event => setPassword(event.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password Confirmation"
                type="password"
                value={passwordConfirmation}
                margin="dense"
                autoComplete="current-password"
                onChange={event => setPasswordConfirmation(event.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="default"
                disabled={!name || !email || !password || !passwordConfirmation ? true : false}
                className={classes.submitBtn}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </form>
      </Grid>
    </>
  )
}

export default SignUp