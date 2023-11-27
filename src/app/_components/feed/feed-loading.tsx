import { Skeleton } from "../ui/skeleton";

export default function FeedLoading() {
  return (
    <main className="flex min-h-screen w-full max-w-[37.5rem] flex-col ">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <article
            key={index}
            className="flex h-[20rem] w-full flex-col gap-4 border p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              <Skeleton className="h-2 w-6 rounded-sm" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-[30rem]" />
              <Skeleton className="h-4 w-[28rem]" />
              <Skeleton className="h-4 w-[27rem]" />
              <Skeleton className="h-4 w-[28rem]" />
              <Skeleton className="h-4 w-[26rem]" />
            </div>
            <div className="flex gap-4">
              {Array(4)
                .fill(0)
                .map((_, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <Skeleton className="h-[20px] w-[20px] rounded-full" />
                    <Skeleton className="h-3 w-[24px]" />
                  </div>
                ))}
            </div>
          </article>
        ))}
    </main>
  );
}
