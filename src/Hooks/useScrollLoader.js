import { useEffect } from "react";

const useScrollLoader = (isLoading, handleLoadMore) => {
    useEffect(() => {
        const handleScroll = () => {
            /**
             * 現在の画面のスクロール位置（ページ一番上）
             */
            const scrollTop = document.documentElement.scrollTop;
            /**
             * 表示されている画面の高さ（使用デバイスによって変わる）
             */
            const widowHeight = window.innerHeight;
            /**
             * //ページ全体の高さ
             */
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