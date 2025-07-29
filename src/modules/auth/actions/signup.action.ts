import { signUp } from "aws-amplify/auth";

import { SignupFormData } from "../schemas/signup-schema";
import { getErrorMessage } from "@/lib/helpers";
import { redirect } from "next/navigation";

export async function signup(data: SignupFormData) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: data.email,
      password: data.password,
      options: {
        userAttributes: {
          email: data.email,
          name: data.name
        },
        autoSignIn: true
      }
    });

    console.log({ isSignUpComplete, userId, nextStep });
  } catch (error) {
    return getErrorMessage(error);
  }

  // Pass email as URL parameter
  redirect(`/confirm?email=${encodeURIComponent(data.email)}`);
}
