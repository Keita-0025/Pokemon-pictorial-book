import pokemonTypesJson from "../data/pokemonTypes.json";

function TypeCheckBoxes({selectedTypes,setSelectedTypes}) {
  
  const handleType = (e) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    setSelectedTypes((prev) => 
        isChecked === true
        ? [...prev, value]
        : prev.filter((type) => type !== value)
    );
  };
  return (
    <>
      <h2>{selectedTypes.join('/')}</h2>
      <div>
        {Object.entries(pokemonTypesJson).map(([key, value]) => (
          <label key={key}>
            <input type="checkbox" value={key} onChange={handleType} />
            {value}
          </label>
        ))}
      </div>
    </>
  );
}

export default TypeCheckBoxes;
