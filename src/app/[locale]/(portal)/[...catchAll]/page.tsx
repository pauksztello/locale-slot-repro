import { notFound } from "next/navigation";

// Same as the real app: a not-found catch-all whose param name matches the slot's.
export const instant = false;

export default function CatchAllPage() {
  notFound();
}
