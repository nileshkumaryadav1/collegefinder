import { Suspense } from 'react';
import FilterCollege from '@/components/suspension/FilterCollege';

export default function Page() {
  return (
    <div>
      <h1>College News</h1>
      <Suspense fallback={<p>Loading search params...</p>}>
        <FilterCollege />
      </Suspense>
    </div>
  );
}
