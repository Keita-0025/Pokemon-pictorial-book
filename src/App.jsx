import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import usePokemon from "./Hooks/usePokemons";

function App() {
  const {
    isInitialLoading,
    types,
    text,
    isDetailLoading,
    pokemonDetail,
    pokemonSpecies,
    pokemonsToShow,
    leadMore,
    handleTypes,
    handleText,
    evolutionChainWithImage,
    fetchPokemonDetail,
    randomIcons
  } = usePokemon();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isInitialLoading={isInitialLoading}
              types={types}
              text={text}
              pokemonsToShow={pokemonsToShow}
              leadMore={leadMore}
              handleText={handleText}
              handleTypes={handleTypes}
              randomIcons={randomIcons}
            />
          }
        />

        <Route
          path="/pokemon/:id"
          element={
            <PokemonDetail
              isDetailLoading={isDetailLoading}
              pokemonDetail={pokemonDetail}
              pokemonSpecies={pokemonSpecies}
              evolutionChainWithImage={evolutionChainWithImage}
              fetchPokemonDetail={fetchPokemonDetail}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
