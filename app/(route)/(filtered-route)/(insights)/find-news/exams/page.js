import { Suspense } from 'react';
import FilterExam from '@/components/suspension/FilterExam';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<p>Loading search params...</p>}>
        <FilterExam />
      </Suspense>
    </div>
  );
}
