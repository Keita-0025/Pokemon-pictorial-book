import { useEffect, useCallback } from "react";

const useMorePokemons = ({ value, setVisibleCard }) => {
    const handleLoadMore = useCallback(() => {
        setVisibleCard(prev => prev + 50);
    }, [setVisibleCard]);

    useEffect(() => {
        setVisibleCard(50);
    }, [value]);

    return handleLoadMore
};

export default useMorePokemons