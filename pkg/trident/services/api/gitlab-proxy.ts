import { PROXY_GITLAB } from "../../config/axios";
import axios from "axios";
import { getConfig } from "../../config/api";
const { GITLAB_TOKEN } = getConfig();
export const gitlabProxyService = {
    getImage: async (url: string) => {
      try {
        let res: any = await PROXY_GITLAB.get(`${url}`)
        if (res.status === 302) {
          const redirectUrl = res.headers.location;

          res = axios.get(redirectUrl, {
            headers: {
              'Authorization': `Bearer ${GITLAB_TOKEN}`
            },
            responseType: 'blob'
          })
        }
        return res.data;
      } catch (err) {
        console.log(`err`, err);
        console.log(`ERROR fetching image`, encodeURIComponent(url))
      }
    }
}