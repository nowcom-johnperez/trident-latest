import https from 'https';
import axios from "axios";
import { getConfig } from './api';
const { BEARERTOKEN, NETWORK_URL_V2, RANCHER_DIRECT_URL, RANCHER_BEARERTOKEN, GITLAB_URL, GITLAB_TOKEN, GITLAB_SOURCE_URL } = getConfig();

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

export const GITLAB_API = axios.create({
    baseURL: GITLAB_URL,
    headers: {
        Authorization: `Bearer ${GITLAB_TOKEN}`,
        'Content-Type': 'application/json'
    }   
})

export const PROXY_GITLAB = axios.create({
    baseURL: GITLAB_SOURCE_URL,
    headers: {
        Authorization: `Bearer ${GITLAB_TOKEN}`
    },
    maxRedirects: 0,
    validateStatus: status => status >= 200 && status < 400
})