import { resendSignUpCode, signIn } from "aws-amplify/auth";

import { SigninFormData } from "../schemas/signin-schema";
import { redirect } from "next/navigation";
import { getErrorMessage } from "@/lib/helpers";

export async function signin(data: SigninFormData) {
  let redirectLink = "/dashboard";

  try {
    const { isSignedIn, nextStep } = await signIn({
      username: data.email,
      password: data.password
    });

    console.log({ isSignedIn });

    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      await resendSignUpCode({
        username: data.email
      });

      redirectLink = `/confirm?email=${encodeURIComponent(data.email)}`;
    }
  } catch (error) {
    return getErrorMessage(error);
  }

  redirect(redirectLink);
}
