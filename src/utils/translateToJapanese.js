
import pokemonNameJson from "../data/pokemonNames.json";
import pokemonTypeJson from "../data/pokemonTypes.json";

const translateToJapanese = (name, types) => {
    console.log(types);
    const jpName = pokemonNameJson.find(
        (pokemon) => pokemon.en.toLocaleLowerCase() === name
    )?.ja ?? "不明";
    const pokemonTypes = types.map(type => pokemonTypeJson[type]);

    console.log(jpName,pokemonTypes);
    return { name: jpName, type: pokemonTypes };
};


export default translateToJapanese