import { Suspense } from "react";
import FilterExam from "@/components/suspension/FilterExam";

export const metadata = {
  title: "Exams News",
  description:
    "Get the latest news and updates on exams, scholarships, colleges, and more with College Finder.",
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
