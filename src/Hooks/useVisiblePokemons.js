import { useMemo } from "react";

const useVisiblePokemons = ({ allPokemons, value, visibleCard }) => {
    const filteredPokemons = useMemo(() => {
        return allPokemons.filter((pokemon) => {
            console.log(pokemon.jpName);
            return pokemon.jpName.startsWith(value);
        });
    }, [value, allPokemons])
    const pokemonsToShow =
        value === ""
            ? allPokemons.slice(0, visibleCard)
            : filteredPokemons.slice(0, visibleCard);

    return pokemonsToShow
}

export default useVisiblePokemons