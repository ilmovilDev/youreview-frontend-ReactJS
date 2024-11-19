import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
    throw new Error("La URL base no está definida. Verifica tu archivo .env.");
}

export const api = axios.create({
    baseURL,
});
