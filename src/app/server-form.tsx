import { SubmitButton } from "./_components/form";
import { create } from "./actions";

export function ServerForm() {
  return (
    <form className="w-full space-y-2" action={create}>
      <input
        name="text"
        placeholder="Enter some text"
        className="flex h-10 w-full rounded-md border border-primary bg-transparent px-3 py-2 text-sm"
      />
      <SubmitButton type="submit">Submit Server</SubmitButton>
    </form>
  );
}
