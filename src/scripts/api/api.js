class Api {
    get = async (endpoint) => {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = response.json()
        return data
    };

    post = async (endpoint, body) => {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = response.json()
        console.log(data)
        return data
    }
}

export const api = new Api