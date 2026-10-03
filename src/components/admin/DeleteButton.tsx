"use client";

export default function DeleteButton({
  action,
  id,
  label = "Delete",
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  label?: string;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm("Delete this permanently? This can't be undone.")) {
            e.preventDefault();
          }
        }}
        className="text-[14px] text-red-700 underline underline-offset-2 hover:opacity-70"
      >
        {label}
      </button>
    </form>
  );
}