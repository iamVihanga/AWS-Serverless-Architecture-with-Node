import { ConfirmationForm } from "@/modules/auth/components/confirmation-form";
import React, { Suspense } from "react";

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationForm />
    </Suspense>
  );
}
