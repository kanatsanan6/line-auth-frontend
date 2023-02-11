import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";
import { nanoid } from "nanoid";

import { auth } from "./firebase";

export const LINE_LOGIN_URL = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${
  process.env.NEXT_PUBLIC_LINE_CLIENT_ID
}&redirect_uri=${
  process.env.NEXT_PUBLIC_LINE_CALLBACK_URL
}&state=${nanoid()}&scope=profile%20openid%20email`;

export const getAccessToken = async (code: string) => {
  const body = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.NEXT_PUBLIC_LINE_CALLBACK_URL,
    client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_LINE_CLIENT_SECRET,
  };

  try {
    const response = await axios.post(
      "https://api.line.me/oauth2/v2.1/token",
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login?id_token=${response.data.access_token}`
    );

    const claimsToken = res.data.token;
    const result = await signInWithCustomToken(auth, claimsToken);
    const tokenResult = await result.user.getIdTokenResult(true);

    console.log(tokenResult.token);
  } catch (error) {
    console.log(error);
  }
};
