import { useEffect } from "react";

const useScrollLoader = (isLoading, handleLoadMore) => {
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const widowHeight = window.innerHeight;
            const fullHeight = document.documentElement.offsetHeight;

            if (scrollTop + widowHeight >= fullHeight - 300 && !isLoading) {
                handleLoadMore();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isLoading,handleLoadMore]);
};


export default useScrollLoader