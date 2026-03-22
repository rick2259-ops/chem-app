'use client';

import { useEffect } from 'react';
import { hydrateProgressFromSupabase } from '@/lib/storage/progressStorage';

export default function SupabaseHydrator() {
  useEffect(() => {
    hydrateProgressFromSupabase();
  }, []);
  return null;
}
