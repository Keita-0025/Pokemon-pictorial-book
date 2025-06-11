import { useState, useEffect, useRef } from "react";
import fetchJson from "../services/fetchJson";
import createPokemonObject from "../services/fetchPokemons";

const usePokemonFetches = (initialUrl) => {
  /**
   * 全てのポケモン
   */
  const [allPokemons, setAllPokemons] = useState([]);
  /**
   * 読み込み中
   */
  const [isLoading, setIsLoading] = useState(false);
  /**
   * ポケモンのID
   */
  const fetchedIdsRef = useRef(new Set());
/**
 * 全てのポケモンを取得する関数
 */
  const getAllPokemons = async () => {

    setIsLoading(true);
    try {
      const data = await fetchJson(initialUrl);
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

  return { isLoading, allPokemons };
};

export default usePokemonFetches;
