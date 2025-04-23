import FilterScholarship from '@/components/suspension/FilterScholarship';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<p>Loading search params...</p>}>
        <FilterScholarship />
      </Suspense>
    </div>
  );
}
