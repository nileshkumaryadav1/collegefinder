import FilterScholarship from '@/components/suspension/FilterScholarship';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>College News</h1>
      <Suspense fallback={<p>Loading search params...</p>}>
        <FilterScholarship />
      </Suspense>
    </div>
  );
}
