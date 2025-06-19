import "./Home.css";
import SearchForm from "../components/SearchForm";
import PokemonThumbnails from "../components/PokemonThumbnails";
import InitialLoading from "../components/InitialLoading";

function Home({
  isInitialLoading,
  types,
  handleTypes,
  text,
  handleText,
  pokemonsToShow,
  randomIcons,
}) {
  return (
    <>
      <div className="sticky top-0 z-50 bg-sky-300 shadow-md py-5">
        <h1>ポケモン図鑑</h1>
        <SearchForm
          text={text}
          handleText={handleText}
          types={types}
          handleTypes={handleTypes}
        />
      </div>

      {/* 読み込み時ローディングアニメーション表示 */}
      {isInitialLoading ? (
        <InitialLoading randomIcons={randomIcons} />
      ) : (
        <div className="app-container flex flex-col items-center justify-center min-height: 100vh py-4 px-2 bg-sky-100">
          <div className="pokemon-container flex flex-col items-center justify-center m-auto max-w-full">
            <div className="flex flex-wrap items-center pt-5 justify-center">
              {Array.isArray(pokemonsToShow) &&
                pokemonsToShow.map((pokemon, i) => (
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
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
