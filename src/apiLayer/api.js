import axios from "axios";

// Function to get the token dynamically
const getToken = () => localStorage.getItem("token");
const token = localStorage.getItem("token");

// Create an Axios instance for Firestore
export const axiosInstance = axios.create({
  baseURL:
    "https://firestore.googleapis.com/v1/projects/socioverse-a50bc/databases/(default)/documents/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create an Axios instance for Firebase Auth
export const axiosAuthInstance = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests to add the Authorization token dynamically
axiosAuthInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create an Axios instance for Firebase Storage
export const axiosStorageInstance = axios.create({
  baseURL:
    "https://firebasestorage.googleapis.com/v0/b/socioverse-a50bc.appspot.com/o/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests to add the Authorization token dynamically
axiosStorageInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
