import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient, trpc } from '@/trpc/server';
import Footer from '../../../modules/home/ui/components/footer';
import { Navbar } from '../../../modules/home/ui/components/navbar';
import { Suspense } from 'react';
import { SearchFilters, SearchFiltersSkeleton } from '@/modules/home/ui/components/search-filters';

interface Props {
  children: React.ReactNode;
};
const Layout = async ({ children }: Props) => {
      const queryClient = getQueryClient();
      void queryClient.prefetchQuery(
          trpc.categories.getMany.queryOptions(),
        );    

      return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<SearchFiltersSkeleton />}>
            <SearchFilters />
          </Suspense>
        </HydrationBoundary>
        <div className="flex-1 bg-[#f4f4f0]">
        {children}
        </div>
        <Footer />
    </div>
  );
}
export default Layout;