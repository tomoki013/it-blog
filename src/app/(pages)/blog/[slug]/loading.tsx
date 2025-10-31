const SkeletonLoader = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-4 lg:gap-12 animate-pulse">
        <div className="lg:col-span-3">
          {/* Header Skeleton */}
          <header className="mb-12 text-center">
            <div className="relative w-full h-64 md:h-96 rounded-xl bg-muted-foreground/20 mb-8"></div>
            <div className="space-y-4">
              <div className="h-6 w-1/4 mx-auto bg-muted-foreground/20 rounded"></div>
              <div className="h-10 w-3/4 mx-auto bg-muted-foreground/20 rounded"></div>
              <div className="h-4 w-1/2 mx-auto bg-muted-foreground/20 rounded"></div>
            </div>
          </header>

          {/* Body Skeleton */}
          <div className="space-y-6">
            <div className="h-4 bg-muted-foreground/20 rounded"></div>
            <div className="h-4 bg-muted-foreground/20 rounded"></div>
            <div className="h-4 w-5/6 bg-muted-foreground/20 rounded"></div>
            <div className="h-4 w-3/4 bg-muted-foreground/20 rounded"></div>
            <br />
            <div className="h-4 bg-muted-foreground/20 rounded"></div>
            <div className="h-4 w-5/6 bg-muted-foreground/20 rounded"></div>
          </div>
        </div>
        <div className="lg:col-span-1 hidden lg:block">
          {/* TOC Skeleton */}
          <aside className="sticky top-24">
            <div className="h-8 w-3/4 mb-4 bg-muted-foreground/20 rounded"></div>
            <ul className="space-y-3">
              <li className="h-4 w-full bg-muted-foreground/20 rounded"></li>
              <li className="h-4 w-5/6 bg-muted-foreground/20 rounded"></li>
              <li className="h-4 w-3/4 bg-muted-foreground/20 rounded pl-4"></li>
              <li className="h-4 w-full bg-muted-foreground/20 rounded"></li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
