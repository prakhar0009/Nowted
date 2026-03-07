const NoteSkeleton = () => {
  return (
    <div className="w-full p-5 rounded-xl border border-middle-active/5 bg-secondary-hover flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="h-3 w-2/3 rounded-full bg-primary/10" />
        <div className="h-3 w-5 rounded-full bg-primary/10" />
      </div>

      <div className="flex justify-between items-center">
        <div className="h-2.5 w-1/4 rounded-full bg-primary/10" />
        <div className="h-2.5 w-1/3 rounded-full bg-primary/10" />
      </div>
    </div>
  );
};

export default NoteSkeleton;
