import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import {
  translateNameToJapanese,
  translateTypesToJapanese,
} from "../utils/translateToJapanese";

function PokemonDetail({pokemonDetail, pokemonSpecies, evolutionChainWithImage, fetchPokemonDetail, isDetailLoading }) {
  /**
   * URLの :id に対応する値を取得
   */
  const { id } = useParams();
  
  /**
   * idが変更したときのみAPIに詳細にデータを取得する
   */
  useEffect(() => {
    fetchPokemonDetail(id)
  }, [id]);

  /**
   * データを読み込み中に表示する
   */
  if (isDetailLoading) return <p>読み込み中...</p>;
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
