import { useState, useEffect } from "react";


const useScreenScrollHandler = (items: { to_element_id: string }[]) => {
    const [activeLinkIndex, setActiveLinkIndex] = useState<number | null>(null);

    useEffect(() => {
        // define the handler of the scroll event
        const handleScroll = () => {
            // whenever a scroll happens we update the activeLinkIndex state
            const scrollPosition = window.scrollY;
            const linkIndex = (items || []).findIndex((item) => {
                // if document.querySelector(link.to undefined return false
                // if not then compare with scrollPosition
                const a = document.querySelector(item.to_element_id);
                if (a) {
                    const b = a.getBoundingClientRect().top + window.pageYOffset;
                    return b > scrollPosition;
                }
                return false;
            });
            setActiveLinkIndex(linkIndex === -1 ? null : linkIndex);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // initialize active link on mount

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [items]);

    return activeLinkIndex;
};


export default useScreenScrollHandler;
