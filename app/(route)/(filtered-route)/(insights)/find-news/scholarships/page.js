import FilterScholarship from "@/components/suspension/FilterScholarship";
import { Suspense } from "react";

export const metadata = {
  title: "Scholarships Insights",
  description:
    "Get the latest insights and updates on scholarships, colleges, exams, and more with College Finder.",
};

export default function Page() {
  return (
    <div>
      <Suspense fallback={<p>Loading search params...</p>}>
        <FilterScholarship />
      </Suspense>
    </div>
  );
}
