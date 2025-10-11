import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className="container py-8">
      <Skeleton className="mb-6 h-6 w-1/2" />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Skeleton className="mb-4 h-[500px] w-full rounded-lg" />
          <div className="flex gap-4">
            <Skeleton className="h-20 w-20 rounded-md" />
            <Skeleton className="h-20 w-20 rounded-md" />
            <Skeleton className="h-20 w-20 rounded-md" />
          </div>
        </div>
        <div className="space-y-4 lg:col-span-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-24 w-full" />
          <div className="space-y-4 py-6">
            <Skeleton className="h-6 w-1/4" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-12" />
              <Skeleton className="h-10 w-12" />
              <Skeleton className="h-10 w-12" />
            </div>
          </div>
          <div className="flex gap-4 py-6">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 flex-1" />
            <Skeleton className="h-11 w-11" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
