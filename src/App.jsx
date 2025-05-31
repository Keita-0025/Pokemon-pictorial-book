import "./App.css";
import SearchForm from "./SearchForm";
import Button from "./Button";
import PokemonThumbnails from "./PokemonThumbnails";
import { useEffect, useState } from "react";
import pokemonNameJson from "./pokemonNames.json";
import pokemonTypeJson from "./pokemonTypes.json";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);

  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=100");
  const [isLoading, setIsLoading] = useState(false);

  const createPokemonObject = (results) => {
    results.forEach((pokemon) => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      fetch(pokemonUrl)
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          const _image = data.sprites.other["official-artwork"].front_default;
          const _type = data.types[0].type.name;
          const _iconItem = data.sprites.other.dream_world.front_default;
          const jpanese = await translateToJapanese(data.name, _type);
          const newList = {
            iconItem: _iconItem,
            id: data.id,
            name: data.name,
            image: _image,
            type: _type,
            jpName: jpanese.name,
            jpType: jpanese.type,
          };
          setAllPokemons((currentList) =>
            [...currentList, newList].sort((a, b) => a.id - b.id)
          );
        });
    });
  };
  const translateToJapanese = (name, type) => {
    const jpName = pokemonNameJson.find(
      (pokemon) => pokemon.en.toLocaleLowerCase() === name
    ).ja;
    const jpType = pokemonTypeJson[type];
    console.log(jpType);
    return { name: jpName, type: jpType };
  };

  const getAllPokemons = () => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        createPokemonObject(data.results);
        setUrl(data.next);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <>
      <h1>ポケモン図鑑</h1>
      <SearchForm />
      <Button />
      <div className="app-container flex flex-col items-center justify-center min-height: 100vh py-4 px-2">
        <div className="pokemon-container flex flex-col items-center justify-center m-auto max-w-full">
          <div className="flex flex-wrap items-center justify-center">
            {allPokemons.map((pokemon, i) => (
              <PokemonThumbnails
                iconItem={pokemon.iconItem}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                type={pokemon.type}
                key={i}
                jpName={pokemon.jpName}
                jpType={pokemon.jpType}
              />
            ))}
          </div>
          {isLoading ? (
            <div className="load-more">loading naw...</div>
          ) : (
            <button className="load-more bg-blue-400" onClick={getAllPokemons}>
              もっと見る！！
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
