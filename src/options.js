import { apiKey } from "./env"

const catOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
    }
}

const catAddFavoriteOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
    }
}

const catDeleteFavoriteOptions = {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
    }
}


export { catOptions, catAddFavoriteOptions, catDeleteFavoriteOptions }