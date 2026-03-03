import { Suspense } from "react";
import OfferClient from "./OfferClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-600">Loading...</div>}>
      <OfferClient />
    </Suspense>
  );
}