import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  translateNameToJapanese,
  translateTypesToJapanese,
} from "../utils/translateToJapanese";
import fetchJson from "../services/fetchJson";

function PokemonDetail({ allPokemons }) {
  /**
   * URLの :id に対応する値を取得
   */
  const { id } = useParams();
  /**
   * ポケモンの基本フェッチデータ
   */
  const [pokemonDetail, setPokemonDetail] = useState(null);
  /**
   * ポケモンの補足情報フェッチデータ
   */
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  /**
   * ポケモンの進化前と進化後フェッチデータ
   */
  const [evolutionChain, setEvolutionChain] = useState(null);
  /**
   * ポケモン進化の過程（名前・画像）
   */
  const [evolutionChainWithImage, setEvolutionChainWithImage] = useState([]);
  /**
   * 読み込み中
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * クリックされたポケモンの進化前、進化後の名前一覧を返す
   */
  function traverseEvolutionChain(chainNode) {
    const result = [];

    function traverse(node) {
      result.push(node.species.name);
      node.evolves_to.forEach(traverse);
    }
    traverse(chainNode);
    return result;
  }

  /**
   * idが変更したときのみAPIに詳細にデータを取得する
   */
  useEffect(() => {
    setIsLoading(true);
    fetchJson(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((data) => {
        setPokemonDetail(data);
        return fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      })
      .then((data) => {
        setPokemonSpecies(data);
        /**
         * species データ内の evolution_chain.url を使って正しい進化チェーンを取得
         */
        return fetchJson(data.evolution_chain.url);
      })
      .then((data) => {
        setEvolutionChain(data);
        const names = traverseEvolutionChain(data.chain);
        /**
         * 全ポケモン（allPokemons）から、進化前、進化後の名前一覧に格納してある、ポケモンのデータのみフィルターする
         */
        const chainData = names
          .map((name) => allPokemons.find((pokemon) => pokemon.name === name))
          .filter(Boolean);

        setEvolutionChainWithImage(chainData);
      })
      .catch((err) => {
        console.error("ポケモン詳細取得エラー:", err);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  /**
   * データを読み込み中に表示する
   */
  if (isLoading) return <p>読み込み中...</p>;
  if (!pokemonDetail || !pokemonSpecies)
    return <p>ポケモンの情報が取得できませんでした。</p>;

  return (
    <>
      
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold">
          {translateNameToJapanese(pokemonDetail.name)}
        </h2>
        <img
          src={pokemonDetail.sprites.front_default}
          alt={pokemonDetail.name}
        />
        {/* id */}
        <div className="flex gap-2">
          <span className="text-lg font-semibold">id:</span>
          <p>{pokemonDetail.id.toString().padStart(2, "0")}</p>
        </div>

        {/* タイプ */}
        <div className="flex gap-2">
          <span className="text-lg font-semibold">タイプ:</span>
          <p>
            {translateTypesToJapanese(
              pokemonDetail.types.map((t) => t.type.name)
            ).join(", ")}
          </p>
        </div>

        {/* 高さ */}
        <div className="flex gap-2">
          <span className="text-lg font-semibold">高さ:</span>
          <p>{pokemonDetail.height}</p>
        </div>

        {/* 重さ */}
        <div className="flex gap-2">
          <span className="text-lg font-semibold">重さ:</span>
          <p>{pokemonDetail.weight}</p>
        </div>

        {/* 説明 */}
        <div className="flex gap-2 mt-2">
          <span className="text-lg font-semibold">説明:</span>
          <p>
            {pokemonSpecies.flavor_text_entries
              .find((entry) => entry.language.name === "ja")
              ?.flavor_text.replace(/\n|\f/g, " ")}
          </p>
        </div>

        {/* 進化の流れ */}
        <div className="mt-2">
          <span className="text-lg font-semibold">進化の流れ:</span>
          {evolutionChainWithImage.map((pokemon) => (
            <div key={pokemon.id}>
              <Link to={`/pokemon/${pokemon.id}`}>
                <p>{pokemon.jpName}</p>
                <img src={pokemon.image} alt={pokemon.image} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PokemonDetail;
