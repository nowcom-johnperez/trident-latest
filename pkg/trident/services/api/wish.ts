import { INSTANCE_V2 } from "../../config/axios";

export const wishService = {
    makeAwish: async (data: any) => {
        const res: any =  await INSTANCE_V2.post(`/apis/packetlifter.dev/v1/namespaces/default/makewishs`, data)
        return res.items
    }
}