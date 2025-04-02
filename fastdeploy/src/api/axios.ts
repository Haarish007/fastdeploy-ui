import axios from "axios";
import { URL } from "./serverUrl";

export const apiCall = axios.create({
  baseURL: URL.base,
  headers: { 'Content-Type': 'application/json' }
});
