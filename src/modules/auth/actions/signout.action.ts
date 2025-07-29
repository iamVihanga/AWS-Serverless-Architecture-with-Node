import { getErrorMessage } from "@/lib/helpers";
import { signOut } from "aws-amplify/auth";
import { redirect } from "next/navigation";

export async function handleSignout() {
  try {
    await signOut();

    redirect("/signin");
  } catch (error) {
    console.log(getErrorMessage(error));
  }
}
