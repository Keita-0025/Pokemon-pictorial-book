
import pokemonNameJson from "../data/pokemonNames.json";
import pokemonTypeJson from "../data/pokemonTypes.json";


/**
 * 名前だけ日本語に変換 
 * */ 
const translateNameToJapanese = (name) => {
  return pokemonNameJson.find(
    (pokemon) => pokemon.en.toLowerCase() === name.toLowerCase()
  )?.ja ?? "不明";
};

/**
 * タイプ配列を日本語に変換
 */
const translateTypesToJapanese = (types) => {
  return types.map((type) => pokemonTypeJson[type] ?? "不明");
};

/**
 * 両方まとめて変換
 */
const translateToJapanese = (name, types) => {
  const jpName = translateNameToJapanese(name);
  const pokemonTypes = translateTypesToJapanese(types);
  return { name: jpName, type: pokemonTypes };
};


export{translateToJapanese,translateNameToJapanese,translateTypesToJapanese} 