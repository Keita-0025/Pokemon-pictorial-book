function PokemonThumbnails({
  id,
  name,
  image,
  type,
  iconItem,
  jpName,
  jpType,
}) {
  const style = `thumb-container ${type}`;
  return (
    <div className={`${style} flex flex-col items-center justify-center py-6 m-1 border border-gray-300 rounded-md w-45 min-w-200px text-center shadow-lg cursor-pointer relative  group duration-200 ease-in hover:scale-115 hover:z-40 `}>
      <div className="number rounded-lg bg-gray-300/30 py-1 px-1.5 ">
        <small>No.0{id}</small>
      </div>
      <img src={iconItem} alt={name} className="icon-image border border-gray-400 rounded-full w-20 h-20 bg-neutral-200 duration-200 ease-in absolute -top-3 -left-3 hidden group-hover:block" />
      <img src={image} alt={name} className="w-30 h-30 mt-3"/>
      <div className="detail-wrapper flex flex-col w-full">
        <h3 className="m-1">{jpName ?? "???"}</h3>
        <h4 className="m-1">{jpType ?? type}</h4>
      </div>
    </div>
  );
}

export default PokemonThumbnails;
