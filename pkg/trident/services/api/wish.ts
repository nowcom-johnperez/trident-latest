import { INSTANCE_V2 } from "../../config/axios";
import { getConfig } from "../../config/api";
const { API_VERSION, API } = getConfig();

export const wishService = {
    makeAwish: async (data: any) => {
        const res: any =  await INSTANCE_V2.post(`/apis/${API}/${API_VERSION}/namespaces/default/makewishs`, data)
        return res.items
    }
}