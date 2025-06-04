import { useState, useEffect, useRef } from "react";
import fetchJson from "../services/fetchJson";
import createPokemonObject from "../services/fetchPokemons";

const usePokemonFetches = (initialUrl) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchedIdsRef = useRef(new Set());

  const getAllPokemons = async () => {

    setIsLoading(true);
    try {
      const data = await fetchJson(initialUrl);
      console.log(data);
      const newPokemons = await createPokemonObject(
        data.results,
        fetchedIdsRef.current
      );
      setAllPokemons((currentList) =>
        [...currentList, ...newPokemons].sort((a, b) => a.id - b.id)
      );
    } catch (error) {
      console.log("ポケモンデータ取得失敗", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllPokemons();
  }, []);

  return { getAllPokemons, isLoading, allPokemons };
};

export default usePokemonFetches;
