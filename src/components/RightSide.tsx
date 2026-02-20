function RightSide() {
  const currentTime = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="w-full h-full bg-[#181818] flex flex-col p-[5%]">
      <div className="flex justify-between items-center mb-7.5">
        <h1 className="text-3xl font-bold text-white">
          Reflection on the Month of June
        </h1>
        <div className="text-gray-500 cursor-pointer text-2xl">•••</div>
      </div>

      <div className="flex flex-col gap-3.75 mb-10">
        <div className="flex items-center gap-10">
          <div className="w-20 text-gray-500 text-sm">Date</div>
          <div className="text-white text-sm underline decoration-gray-600 underline-offset-4">
            {currentTime}
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="w-20 text-gray-500 text-sm">Folder</div>
          <div className="text-white text-sm underline decoration-gray-600 underline-offset-4">
            Personal
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <p className="text-gray-300 leading-relaxed text-base">
          It's hard to believe that June is already over! Looking back on the
          month, there were a few highlights that stand out to me.
          <br />
          <br />
          One of the best things that happened was getting promoted at work.
          I've been working really hard and it's great to see that effort
          recognized. It's also exciting to have more responsibility and the
          opportunity to contribute to the company in a bigger way. I'm looking
          forward to taking on new challenges and learning as much as I can in
          my new role.
          <br />
          <br />I also had a great time on my vacation to Hawaii. The beaches
          were beautiful and I loved trying all of the different types of
          Hawaiian food. It was nice to relax and get away from the daily grind
          for a bit.
        </p>
      </div>
    </div>
  );
}

export default RightSide;
