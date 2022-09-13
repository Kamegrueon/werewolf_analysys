import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosBase from "axios";
import { RootState } from "../store";

import Cookies from "js-cookie"
import { SIGN_IN_PARAMS, SIGN_UP_PARAMS } from "../components/types"
import applyCaseMiddleware from "axios-case-converter"

const options = {
  ignoreHeaders: true 
}

const client = applyCaseMiddleware(axiosBase.create({
  baseURL: `${process.env.REACT_APP_API_DOMEIN}/api/v1/`
}), options)

client.defaults.withCredentials = true

// サインアップ（新規アカウント作成）
export const signUp = createAsyncThunk(
  'user/signUp',
  async (params: SIGN_UP_PARAMS) => {
    const res = await client.post("auth", params)
    console.log('signup res',res)
    if(res.status === 200){
      Cookies.set("_access_token", res.headers["access-token"])
      Cookies.set("_client", res.headers["client"])
      Cookies.set("_uid", res.headers["uid"])
    }
    return res.data
  }
)

export const signIn = createAsyncThunk(
  'user/signIn',
  async (params: SIGN_IN_PARAMS) => {
    const res = await client.post("auth/sign_in", params)
    if(res.status === 200){
      Cookies.set("_access_token", res.headers["access-token"])
      Cookies.set("_client", res.headers["client"])
      Cookies.set("_uid", res.headers["uid"])
    }
    console.log(res)
    return res.data
  }
)

export const signOut = createAsyncThunk(
  'user/signOut',
  async () => {
    if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
    const res = await client.delete("auth/sign_out", { headers: {
      "access-token": Cookies.get("_access_token") || "",
      "client": Cookies.get("_client") || "",
      "uid": Cookies.get("_uid") || ""
    }})

    if(res.data.success === true){
      Cookies.remove("_access_token")
      Cookies.remove("_client")
      Cookies.remove("_uid")
    }
    console.log(res)
    return res.data
  }
)



export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async () => {
    const res = await client.get("auth/sessions", 
    { headers: 
      {
        "access-token": Cookies.get("_access_token") || "",
        "client": Cookies.get("_client") || "",
        "uid": Cookies.get("_uid") || ""
      }
    })
    console.log('getCurrent',res)
    return res.data
  }
)

const initialState = {
    isSignedIn: false,
    currentUser: {
      id: 0,
      uid: '',
      provider: '',
      email: '',
      name: '',
      nickname: '',
      image: '',
      allowPasswordChange: false,
      created_at: '',
      updated_at: '',
    }
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(
      signUp.fulfilled,
      (state, action: any) => {
        return {
          ...state,
          isSignedIn: true,
          currentUser: action.payload.data
        }
      }
    );
    builder.addCase(
      getCurrentUser.fulfilled,
      (state, action: any) => {
        if (action.payload?.isLogin === true) {
          return {
            ...state,
            isSignedIn: true,
            currentUser: action.payload.data
          }
        } else {
          return console.log("No current user")
        }
      }
    );
    builder.addCase(
      signIn.fulfilled,
      (state, action: any) => {
        return {
          ...state,
          isSignedIn: true,
          currentUser: action.payload.data
        }
      }
    );
    builder.addCase(
      signOut.fulfilled,
      (state) => {
        return {
          ...state,
          isSignedIn: false,
          currentUser: initialState.currentUser
        }
      }
    );
  }
})

// export const { setLoading } = userSlice.actions

export const selectCurrentUser = (state: RootState) => state.user.currentUser
export const selectIsSignedIn = (state: RootState) => state.user.isSignedIn

export default userSlice.reducer