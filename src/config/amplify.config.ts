"use client";

import { Amplify, type ResourcesConfig } from "aws-amplify";

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
    userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
    identityPoolId: "ap-south-1:6e9ae7f8-a3a6-4ec5-b7f6-7818b0de906a",
    allowGuestAccess: true,
    loginWith: {
      email: true
    }
  }
};

Amplify.configure(
  {
    Auth: authConfig
  },
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
