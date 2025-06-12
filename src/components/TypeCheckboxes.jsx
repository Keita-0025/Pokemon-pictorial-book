import pokemonTypesJson from "../data/pokemonTypes.json";

function TypeCheckBoxes({types,handleTypes}) {

  
  return (
    <>
      <h2>{types.join('/')}</h2>
      <div>
        {Object.entries(pokemonTypesJson).map(([key, value]) => (
          <label key={key}>
            <input type="checkbox" value={key} onChange={handleTypes} />
            {value}
          </label>
        ))}
      </div>
    </>
  );
}

export default TypeCheckBoxes;
