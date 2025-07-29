"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ConfirmFormData, confirmSchema } from "../schemas/confirm-schema";
import { Button } from "@/components/ui/button";
import {
  handleEmailVerificationCode,
  handleSignupConfirm
} from "../actions/verification.action";

type Props = {
  className?: string;
};

export function ConfirmationForm({ className }: Props) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const form = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmSchema)
  });

  const onSubmit = async (data: ConfirmFormData) => {
    try {
      await handleSignupConfirm(email, data);
    } catch (error) {
      console.error("Error confirming OTP", error);
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-[60vh] h-full w-full items-center justify-center px-4",
        className
      )}
    >
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Verification</CardTitle>
          <CardDescription>
            Send the Verification code to <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-1 space-y-2">
                <Button type="submit" className="w-full">
                  Confirm Signup
                </Button>
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => handleEmailVerificationCode(email)}
                >
                  Send Verification Code
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
