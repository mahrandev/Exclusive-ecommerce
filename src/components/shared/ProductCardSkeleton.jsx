import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="group font-poppins w-full max-w-sm">
      <div className="bg-secondary-gray relative h-60 w-full p-4">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-5 w-1/4" />
        </div>
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
