import { GITLAB_API } from "../../config/axios";
import { getConfig } from "../../config/api";
const { GITLAB_GROUP_ID } = getConfig();

export const wikiService = {
    getAll: async () => {
      const res: any =  await GITLAB_API.get(`groups/${GITLAB_GROUP_ID}/wikis`)
      return res.data
    },
    getById: async (wikiId: string) => {
      const res: any = await GITLAB_API.get(`groups/${GITLAB_GROUP_ID}/wikis/${encodeURIComponent(wikiId)}`)
      return res.data
    }
}