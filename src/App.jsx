import "./App.css";
import SearchForm from "./components/SearchForm";
import PokemonThumbnails from "./components/PokemonThumbnails";
import usePokemonFetches from "./Hooks/usePokemonFetcher";
import useMorePokemons from "./Hooks/useMorePokemons";
import useScrollLoader from "./Hooks/useScrollLoader";
import useVisiblePokemons from "./Hooks/useVisiblePokemons";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [visibleCard, setVisibleCard] = useState(50);
  const { isLoading, allPokemons } = usePokemonFetches(
    "https://pokeapi.co/api/v2/pokemon?limit=99999"
  );

  const handleLoadMore = useMorePokemons({
    value,
    setVisibleCard,
  });

  useScrollLoader(isLoading, handleLoadMore);

  const pokemonsToShow = useVisiblePokemons({
    allPokemons,
    value,
    visibleCard
  })

  

  return (
    <>
      <h1>ポケモン図鑑</h1>
      <SearchForm value={value} changeVal={setValue} />
      <div className="app-container flex flex-col items-center justify-center min-height: 100vh py-4 px-2">
        <div className="pokemon-container flex flex-col items-center justify-center m-auto max-w-full">
          <div className="flex flex-wrap items-center justify-center">
            {pokemonsToShow.map((pokemon, i) => (
              <PokemonThumbnails
                iconItem={pokemon.iconItem}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
                key={i}
                jpName={pokemon.jpName}
                jpTypes={pokemon.jpTypes}
              />
            ))}
          </div>
          {isLoading ? (
            <div className="load-more">loading naw...</div>
          ) : (
            <button className="load-more bg-blue-400" onClick={handleLoadMore}>
              もっと見る！！
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
