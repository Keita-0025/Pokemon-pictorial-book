import { useEffect, useCallback } from "react";

const useMorePokemons = ({ value, setVisibleCard }) => {
    /**
     * setvisibleCardの値が変更された場合に限り関数が再生成される
     */
    const handleLoadMore = useCallback(() => {
        setVisibleCard(prev => prev + 50);
    }, [setVisibleCard]);

    useEffect(() => {
        setVisibleCard(50);
    }, [value]);

    return handleLoadMore
};

export default useMorePokemons