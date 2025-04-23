import { Suspense } from 'react';
import FilterExam from '@/components/suspension/FilterExam';

export default function Page() {
  return (
    <div>
      <h1>College News</h1>
      <Suspense fallback={<p>Loading search params...</p>}>
        <FilterExam />
      </Suspense>
    </div>
  );
}
