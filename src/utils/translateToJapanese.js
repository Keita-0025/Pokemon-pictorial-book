
import pokemonNameJson from "../data/pokemonNames.json";
import pokemonTypeJson from "../data/pokemonTypes.json";

const translateToJapanese = (name, type) => {
    const jpName = pokemonNameJson.find(
        (pokemon) => pokemon.en.toLocaleLowerCase() === name
    )?.ja ?? "不明";
    const jpType = pokemonTypeJson[type];
    console.log(jpName,jpType);
    return { name: jpName, type: jpType };
};


export default translateToJapanese