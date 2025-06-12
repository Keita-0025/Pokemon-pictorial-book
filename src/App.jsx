import "./App.css";
import SearchForm from "./components/SearchForm";
import PokemonThumbnails from "./components/PokemonThumbnails";
import usePokemon from "./Hooks/usePokemons";

function App() {
  const {
    isLoading,
    types,
    handleTypes,
    text,
    handleText,
    leadMore,
    pokemonsToShow,
  } = usePokemon();
  

  return (
    <>
      <h1>ポケモン図鑑</h1>
      <SearchForm
        text={text}
        handleText={handleText}
        types={types}
        handleTypes={handleTypes}
      />
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
            <button className="load-more bg-blue-400" onClick={leadMore}>
              もっと見る！！
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
