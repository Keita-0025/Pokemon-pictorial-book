import pokemonTypesJson from "../data/pokemonTypes.json";

function TypeCheckBoxes({types,handleTypes}) {

  
  return (
      <div>
        {Object.entries(pokemonTypesJson).map(([key, value]) => (
          <label key={key}>
            <input type="checkbox" value={key} onChange={handleTypes} checked={types.includes(key)}  />
            {value}
          </label>
        ))}
      </div>
  );
}

export default TypeCheckBoxes;
