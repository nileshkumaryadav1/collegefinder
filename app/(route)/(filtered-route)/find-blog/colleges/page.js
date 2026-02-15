import { Suspense } from "react";
import FilterCollege from "@/components/suspension/FilterCollege";

export const metadata = {
  title: "Colleges News",
  description:
    "Get the latest news and updates on colleges, scholarships, exams, and more with College Finder.",
};

export default function Page() {
  return (
    <div>
      <Suspense fallback={<p>Loading search params...</p>}>
        <FilterCollege />
      </Suspense>
    </div>
  );
}
