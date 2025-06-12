import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import fetchJson from "../services/fetchJson";
import createPokemonObject from "../services/fetchPokemons";
// import useMorePokemons from "./useMorePokemons";



export const usePokemon = () => {
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
    * 表示数
    */
    const [visibleCard, setVisibleCard] = useState(50);
    /**
    * タイプ検索のチェックボックス値
    */
    const [text, setText] = useState("")
    /**
   * 名前検索のテキスト
   */
    const [types, setTypes] = useState([])

    /**
     * ユーザーの入力値でtext（state）を更新する 
     */
    const handleText = (e) => {
        e.preventDefault();
        const inputVal = e.target.value;
        setText(inputVal);
    };



    /**
     * チェックボックスにチェックされたタイプをtypes(state)配列に追加する
     */
    const handleTypes = (e) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
        console.log(isChecked)
        setTypes((prev) =>
            isChecked === true
                ? [...prev, value]
                : prev.filter((type) => type !== value)
        );
    };


    /**
     * 全てのポケモンを取得
     */
    useEffect(() => {
        fetchJson("https://pokeapi.co/api/v2/pokemon?limit=99999")
            .then((data) => {
                if (!data || !data.results) {
                    throw new Error("データが不正です");
                }
                console.log("fetchJson response:", data);
                return createPokemonObject(data.results, fetchedIdsRef.current)
            })
            .then((newPokemons) => {
                return setAllPokemons((currentList) =>
                    [...currentList, ...newPokemons].sort((a, b) => a.id - b.id)
                );
            })
            .catch((error) => {
                console.error("ポケモンのデータ取得失敗エラー：", error)
            })
            .finally(() => {
                setIsLoading(false)
            }
            )
    }, [])


    /**
     * 追加でポケモンを表示
     */
    const leadMore =
        useCallback(() => {
            setVisibleCard(prev => prev + 50);
        }, []);

    /**
     * 検索・絞り込みリセット
     */
    useEffect(() => {
        setVisibleCard(50);
    }, [text, types]);

    /**
     * 無限スクロール
     */
    useEffect(() => {
        const handleScroll = () => {
            /**
             * 現在の画面のスクロール位置（ページ一番上）
             */
            const scrollTop = document.documentElement.scrollTop;
            /**
             * 表示されている画面の高さ（使用デバイスによって変わる）
             */
            const windowHeight = window.innerHeight;
            /**
             * //ページ全体の高さ
             */
            const fullHeight = document.documentElement.offsetHeight;

            if (scrollTop + windowHeight >= fullHeight - 300 && !isLoading) {
                leadMore();
                console.log('calledHandleLoadMore')
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isLoading, leadMore]);


    /**
     *タイプ・入力値でフィルターし、フィルター後の配列を返す関数
     */
    const pokemonsToShow = useMemo(() => {
        return allPokemons.filter((pokemon) => {
            /**
             * 入力されたtextでフィルター
             */
            const textMatch = text.length === 0 || pokemon.jpName.startsWith(text)
            /**
             * チェックボックスに選ばれたタイプでフィルター
             */
            const typeMatch = types.length === 0 || types.every(type => pokemon.types.includes(type));
            return textMatch && typeMatch
        }).slice(0, visibleCard)
    }, [allPokemons, visibleCard, text, types])


    return {
        allPokemons,
        isLoading,
        types,
        text,
        pokemonsToShow,
        leadMore,
        handleTypes,
        handleText
    }
}


export default usePokemon