import "./App.css";
import SearchForm from "./components/SearchForm";
import PokemonThumbnails from "./components/PokemonThumbnails";
import usePokemonFetches from "./Hooks/usePokemonFetcher";
import useScrollLoader from "./Hooks/useScrollLoader";
import {useState, useEffect, useCallback} from "react";

function App() {
  const [value, setValue] = useState("");
  const [visibleCard, setVisibleCard] = useState(50)
  const { getAllPokemons, isLoading, allPokemons } = usePokemonFetches(
    "https://pokeapi.co/api/v2/pokemon?limit=99999"
  );
  
  const handleLoadMore = useCallback(() => {
    if(value === "") {
      setVisibleCard(prev => prev + 50); 
      getAllPokemons()
    } else {
      setVisibleCard(prev => prev + 50);
    }
  },[value, getAllPokemons])

  useScrollLoader(isLoading, handleLoadMore)

  const filteredPokemons = allPokemons.filter(pokemon => {
    console.log(pokemon.jpName)
    return pokemon.jpName.startsWith(value)
  })

  const pokemonsToShow = value === "" ? allPokemons.slice(0,visibleCard) : filteredPokemons.slice(0, visibleCard)



  useEffect(() => {
  setVisibleCard(50);
}, [value]);

  return (
    <>
      <h1>ポケモン図鑑</h1>
      <SearchForm value={value} changeVal={setValue}/>
      <div className="app-container flex flex-col items-center justify-center min-height: 100vh py-4 px-2">
        <div className="pokemon-container flex flex-col items-center justify-center m-auto max-w-full">
          <div className="flex flex-wrap items-center justify-center">
            {pokemonsToShow.map((pokemon, i) => (
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
