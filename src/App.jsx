import "./App.css";
import SearchForm from "./components/SearchForm";
import PokemonThumbnails from "./components/PokemonThumbnails";
import usePokemonFetches from "./Hooks/usePokemonFetcher";
import useScrollLoader from "./Hooks/useScrollLoader";

function App() {
  const { getAllPokemons, isLoading, allPokemons } = usePokemonFetches(
    "https://pokeapi.co/api/v2/pokemon?limit=50"
  );
  
  useScrollLoader(isLoading, getAllPokemons)

  return (
    <>
      <h1>ポケモン図鑑</h1>
      <SearchForm />
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
