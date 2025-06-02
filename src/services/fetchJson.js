const fetchJson = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HPPT error! status:${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("Fetch error", error);
        return null;
    }
};

export default fetchJson;