import https from 'https';
import axios from "axios";
import { BEARERTOKEN, NETWORK_URL_V2, RANCHER_DIRECT_URL, RANCHER_BEARERTOKEN } from "./api";

export const INSTANCE_V2 = axios.create({
    baseURL:    NETWORK_URL_V2,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Bypass certificate validation
    headers:    { Authorization: `Bearer ${ BEARERTOKEN }`, 'Accept': 'application/json' }
});

export const INSTANCE_V3 = axios.create({
    baseURL: RANCHER_DIRECT_URL,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Bypass certificate validation
    headers:    { Authorization: `Bearer ${ RANCHER_BEARERTOKEN }`, 'Accept': 'application/json' }
})