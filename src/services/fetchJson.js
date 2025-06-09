const fetchJson = async (url, option, maxRtries = 3, delay = 1000) => {
    const retries = Number.isInteger(option) && option > 0 ? option : maxRtries;
    for (let i = 0; i < retries; i++) {
        console.log(`🔁 Try ${i + 1} of ${retries}`);
        try {
            const res = await fetch(url);
            const obj = await res.json()
            console.log(obj)
            if (!res.ok) {
                throw new Error(`HPPT error! status:${res.status}`);
            }
            return obj
        } catch (error) {
            console.error(`Fetch error(attempt ${i + 1}/${retries}):`, error);
            if (i === retries - 1) {
                return null;
            }
            await new Promise(res => setTimeout(res, delay))
        }
    }
};

export default fetchJson;