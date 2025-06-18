import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import fetchJson from "../services/fetchJson";
import createPokemonObject from "../services/fetchPokemons";




const usePokemon = () => {
    /**
    * 全てのポケモン
    */
    const [allPokemons, setAllPokemons] = useState([]);
    /**
    * ポケモンのID
    */
    const fetchedIdsRef = useRef(new Set());
    /**
    * 表示数
    */
    const [visibleCard, setVisibleCard] = useState(50);
    /**
    * 名前検索のテキスト
    */
    const [text, setText] = useState("")
    /**
    * タイプ検索のチェックボックス値
    */
    const [types, setTypes] = useState([])
    /**
    * ポケモンの基本フェッチデータ
    */
    const [pokemonDetail, setPokemonDetail] = useState(null);
    /**
    * ポケモンの補足情報フェッチデータ
    */
    const [pokemonSpecies, setPokemonSpecies] = useState(null);
    /**
    * ポケモン進化の過程（名前・画像）
    */
    const [evolutionChainWithImage, setEvolutionChainWithImage] = useState([]);
    /**
    * 一覧読み込み中
    */
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    /**
    * 詳細読み込み中
    */
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    /**
    * ローディングアニメーション用に表示する画像（5つ）を管理する state
    */
    const [randomIcons, setRandomIcons] = useState([]);


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


    useEffect(() => {
        /**
        * 全てのポケモンを取得
        */
        fetchJson("https://pokeapi.co/api/v2/pokemon?limit=99999")
            .then((data) => {
                if (!data || !data.results) {
                    throw new Error("データが不正です");
                }
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
                setIsInitialLoading(false)
            }
            )
        /**
        * 初回レンダリング時にのみランダムな5つの画像を選び、stateにセット
        */  
        const icons = getRandomIcons(allLoadingIcons);
        setRandomIcons(icons);
        
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

            if (scrollTop + windowHeight >= fullHeight - 1000 && !isInitialLoading) {
                leadMore();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isInitialLoading, leadMore]);


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


    /**
    * クリックされたポケモンの進化前、進化後の名前一覧を返す
    */
    const traverseEvolutionChain = (chainNode) => {
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
    const fetchPokemonDetail = async (id) => {
        setIsDetailLoading(true);
        try {
            /**
            * ポケモン基本情報
            */
            const detail = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${id}`)
            setPokemonDetail(detail);
            /**
            * ポケモン補足情報
            */
            const species = await fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            setPokemonSpecies(species);
            /**
            * species データ内の evolution_chain.url を使って正しい進化チェーンを取得
            */
            const evolution = await fetchJson(species.evolution_chain.url)
            const names = traverseEvolutionChain(evolution.chain);
            /**
            * 全ポケモン（allPokemons）から、進化前、進化後の名前一覧に格納してある、ポケモンのデータのみフィルターする
            */
            const chainData = names
                .map((name) => allPokemons.find((pokemon) => pokemon.name === name))
                .filter(Boolean);

            setEvolutionChainWithImage(chainData);
        } catch (err) {
            console.error("ポケモン詳細取得エラー:", err);
        } finally { setIsDetailLoading(false) };
    };


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




    return {
        isInitialLoading,
        types,
        text,
        isDetailLoading,
        pokemonDetail,
        pokemonSpecies,
        evolutionChainWithImage,
        randomIcons,
        pokemonsToShow,
        handleTypes,
        handleText,
        fetchPokemonDetail
    }
}


export default usePokemon