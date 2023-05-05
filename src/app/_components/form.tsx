"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export function SubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      className="inline-flex w-full items-center justify-center rounded-md bg-primary p-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      disabled={props.disabled || pending}
    >
      {pending && (
        <div className="mr-1" role="status">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-background border-r-transparent" />
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {props.children}
    </button>
  );
}
