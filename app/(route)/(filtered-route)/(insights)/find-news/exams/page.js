import { Suspense } from "react";
import FilterExam from "@/components/suspension/FilterExam";

export const metadata = {
  title: "Exams Insights",
  description:
    "Get the latest insights and updates on exams, scholarships, colleges, and more with College Finder.",
};

export default function Page() {
  return (
    <div>
      <Suspense fallback={<p>Loading search params...</p>}>
        <FilterExam />
      </Suspense>
    </div>
  );
}
