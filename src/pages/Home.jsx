import "./Home.css";
import SearchForm from "../components/SearchForm";
import PokemonThumbnails from "../components/PokemonThumbnails";
import { useState, useEffect } from "react";

function Home({
  isInitialLoading,
  types,
  handleTypes,
  text,
  handleText,
  pokemonsToShow,
}) {
  /**
   * ローディングアニメーション用に表示する画像（5つ）を管理する state
   */
  const [randomIcons, setRandomIcons] = useState([]);
  /**
   * assets フォルダ内のすべての loading_icon*.png を取得
   */
  const modules = import.meta.glob("../assets/loading_icon*.png", {
    eager: true,
  });
  /**
   * import.meta.globで取得したモジュールオブジェクトから default（画像URL）だけを取り出す
   */
  const allLoadingIcons = Object.values(modules).map((mod) => mod.default);
  /**
   * 全てのアイコンから5つのランダムアイコンを取得
   */
  const getRandomIcons = (loadingIcon, count = 5) => {
    const shuffled = [...loadingIcon].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  /**
   * 初回レンダリング時にのみランダムな5つの画像を選び、stateにセット
   */
  useEffect(() => {
    const icons = getRandomIcons(allLoadingIcons);
    setRandomIcons(icons);
  }, []);

  return (
    <>
      <h1>ポケモン図鑑</h1>
      <SearchForm
        text={text}
        handleText={handleText}
        types={types}
        handleTypes={handleTypes}
      />
      {/* 読み込み時ローディングアニメーション表示 */}
      {isInitialLoading ? (
        <>
          <div className="flex flex-wrap items-center justify-center gap-4 p-4">
            {/* Skeleton UI（複数カードのプレースホルダー） */}
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="w-40 h-60 p-4 bg-gray-200 rounded-md animate-pulse flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-gray-300 rounded-full mb-4"></div>
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-16 h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          {/* randomIconsにループを回して一つ一つ表示する */}
            {randomIcons.map((icon, i) => {
              return (
                <img
                  key={i}
                  src={icon}
                  alt="loadingpokemons"
                  className={`w-[100px] h-[100px] rotate-3d  delay-${i}`}// 回転アニメーションと個別遅延
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="app-container flex flex-col items-center justify-center min-height: 100vh py-4 px-2">
          <div className="pokemon-container flex flex-col items-center justify-center m-auto max-w-full">
            <div className="flex flex-wrap items-center justify-center">
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
