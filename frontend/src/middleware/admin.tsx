//New Entry
const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_API_BASE_URL : "";

export const login : any = async (login : Object) => {
    const response = await fetch(`${BASE_URL}/api/admin/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(login),
            credentials: 'include',
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.log(await response.status);
        throw new Error("Login failed");
    }
}

export const logout : any = async () => {
    const response = await fetch(`${BASE_URL}/api/admin/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            credentials: 'include',
    });

    if (response.ok) {
        console.log("Logout successful")
        return await response.json();
    } else {
        console.log(await response.status);
        throw new Error("Logout failed");
    }
}

export const check : any = async () => {
    const response = await fetch(`${BASE_URL}/api/admin/check`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            credentials: 'include',
    });

    if (response.ok) {
        console.log("Verification successful")
        return await response.json();
    } else {
        console.log(await response.status);
        throw new Error("Verification failed");
    }
}


