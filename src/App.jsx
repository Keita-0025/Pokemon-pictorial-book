import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import usePokemon from "./Hooks/usePokemons";

function App() {

const {
        allPokemons,
        isLoading,
        types,
        text,
        pokemonsToShow,
        leadMore,
        handleTypes,
        handleText
    }=usePokemon()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isLoading={isLoading} types={types} text={text} pokemonsToShow={pokemonsToShow} leadMore={leadMore} handleText = {handleText} handleTypes={handleTypes}/>} />
        <Route path="/pokemon/:id" element={<PokemonDetail allPokemons={allPokemons} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;