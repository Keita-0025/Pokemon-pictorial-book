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
    <div className={style}>
      <div className="number">
        <small>#0{id}</small>
      </div>
      <img src={iconItem} alt={name} className="icon-image" />
      <img src={image} alt={name} />
      <div className="detail-wrapper">
        <h3>{jpName ?? "???"}</h3>
        <h4>{jpType ?? type}</h4>
      </div>
    </div>
  );
}

export default PokemonThumbnails;
