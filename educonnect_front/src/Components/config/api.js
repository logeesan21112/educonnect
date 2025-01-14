import axios from "axios";

// Define the base URL for the API
export const API_BASE_URL = "http://localhost:5454";

export const api = axios.create({
    baseURL: API_BASE_URL, // Corrected to baseURL
    headers: {  // Corrected to headers
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json"
    }
});
