import InsightsPageCard from "@/components/suspension/InsightsPageCard";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<p>Loading search params...</p>}>
        <InsightsPageCard />
      </Suspense>
    </div>
  );
}
