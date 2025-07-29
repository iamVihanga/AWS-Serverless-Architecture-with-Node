import { getErrorMessage } from "@/lib/helpers";
import { resendSignUpCode, confirmSignUp } from "aws-amplify/auth";
import { ConfirmFormData } from "../schemas/confirm-schema";
import { redirect } from "next/navigation";

type ReturnT = Promise<{ message: string | null; error: string | null }>;

export async function handleEmailVerificationCode(email: string): ReturnT {
  try {
    await resendSignUpCode({
      username: email
    });

    return { message: "Verification code resent successfully", error: null };
  } catch (error) {
    return { message: null, error: getErrorMessage(error) };
  }
}

export async function handleSignupConfirm(
  email: string,
  data: ConfirmFormData
) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: data.otp
    });

    console.log({ isSignUpComplete, nextStep });
  } catch (error) {
    return getErrorMessage(error);
  }

  redirect("/signin");
}
