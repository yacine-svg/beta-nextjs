import type { SearchParams } from "nuqs/server"; 
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/products-list-view";

interface Props {
    params: Promise<{category: string; }>,
    searchParams: Promise<SearchParams>;
};
const page = async({params,searchParams}:Props) => {
    const { category } = await params;
    const filters = await loadProductFilters(searchParams);
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({category,...filters}));


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
           <ProductListView category={category}/>
        </HydrationBoundary>
    );

}
export default page;