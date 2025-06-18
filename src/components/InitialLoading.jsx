
function InitialLoading ({randomIcons}) {
    return (
        <>
          <div className="flex flex-wrap items-center justify-center gap-4 p-4">
            {/* Skeleton UI（複数カードのプレースホルダー） */}
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="w-40 h-60 p-4 bg-gray-200 rounded-md animate-pulse flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-gray-300 rounded-full mb-4"></div>
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-16 h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          {/* randomIconsにループを回して一つ一つ表示する */}
            {randomIcons.map((icon, i) => {
              return (
                <img
                  key={i}
                  src={icon}
                  alt="loadingpokemons"
                  className={`w-[100px] h-[100px] rotate-3d  delay-${i}`}// 回転アニメーションと個別遅延
                />
              );
            })}
          </div>
        </>
    )
}

export default InitialLoading