import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { MoonLoader } from 'react-spinners';

import DefaultErrorFallback from './FetchErrorFallback';

interface FetchBoundaryProps {
  children: ReactNode;
  loadingFallback?: ReactNode;
  onReset?: () => void;
}

const FetchBoundary = ({
  children,
  loadingFallback = <MoonLoader color="#7752FE" size={40} />,
}: FetchBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={DefaultErrorFallback}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default FetchBoundary;
