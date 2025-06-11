import { useMemo } from "react";

const useVisiblePokemons = ({ allPokemons, value, visibleCard, selectedTypes }) => {
        /**
         * value,allpokemons,selectedTypesの値が変更された時のみ再読み込み
         */
    const filteredPokemons = useMemo(() => {
        return allPokemons.filter((pokemon) => {
            /**
             * 入力されたtextでフィルター
             */
            const textMatch = value.length === 0 || pokemon.jpName.startsWith(value)
            /**
             * チェックボックスに選ばれたタイプでフィルター
             */
            const typeMatch = selectedTypes.length === 0 || selectedTypes.every(type => pokemon.types.includes(type));
            return textMatch && typeMatch
        });
    }, [value, allPokemons, selectedTypes])
    const pokemonsToShow = filteredPokemons.slice(0, visibleCard);
    return pokemonsToShow
}

export default useVisiblePokemons
