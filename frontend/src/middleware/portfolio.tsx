//New Entry
const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_API_BASE_URL : "";

export const newPortfolioEntry : any = async (newEntry : Object) => {
    console.log(newEntry)

    const response = await fetch(`${BASE_URL}/api/portfolio/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(newEntry),
            credentials: 'include',
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.log(await response.status);
        throw new Error("Entry creation failed");
    }
}

export const allPortfolioEntries : any = async () => {
    const response = await fetch(`${BASE_URL}/api/portfolio/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
    });

    if (response.ok) {
        console.log("Entries Acquired")
        return await response.json();
    } else {
        console.log(await response.status);
        throw new Error("Acquisition of entries failed");
    }
}

export const getPortfolioEntry : any = async (id : string) => {
    const response = await fetch(`${BASE_URL}/api/portfolio/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
    });

    if (response.ok) {
        console.log("Entry Acquired")
        return await response.json();
    } else {
        console.log(await response.status);
        throw new Error("Acquisition of entries failed");
    }
}

export const updatePortfolioEntry : any = async (updatedEntry : Object, id : string) => {
    console.log("accessed");

    const response = await fetch(`${BASE_URL}/api/portfolio/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(updatedEntry),
        credentials: 'include',
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.log(await response.status);
        throw new Error("Entry creation failed");
    }
}

export const deletePortfolioEntry : any = async (id : string) => {
    const response = await fetch(`${BASE_URL}/api/portfolio/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
    });

    if (response.ok) {
        console.log("Entry deleted")
        return await response.json();
    } else {
        console.log(await response.status);
        throw new Error("Acquisition of entries failed");
    }
}
