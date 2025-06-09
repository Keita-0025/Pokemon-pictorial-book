import translateToJapanese from "../utils/translateToJapanese";
import fetchJson from "./fetchJson";


const createPokemonObject = async (results, fetchedIds) => {
    const newPokemonObj = results.map(async (pokemon) => {
        const pokemonUrl = pokemon.url
        const data = await fetchJson(pokemonUrl);
        console.log(data)
        if(!data) return; //nullガード

        const _image = data.sprites.other["official-artwork"].front_default;
        const _type = data.types[0]?.type.name;
        const _type2 = data.types[1]?.type.name;
        const types = [_type,_type2].filter(Boolean)
        const _iconItem = data.sprites.other.dream_world.front_default;
        const _id = data.id;
        const jpanese = await translateToJapanese(data.name, types);

        if (fetchedIds.has(_id)) return;
        fetchedIds.add(_id);

        const newList = {
            iconItem: _iconItem,
            id: _id,
            name: data.name,
            image: _image,
            types,
            jpName: jpanese.name,
            jpTypes: jpanese.type,
        };
        return newList;
    });
    return (await Promise.all(newPokemonObj)).filter(Boolean);
    
};

export default createPokemonObject