import { INSTANCE_V3 } from "../../config/axios";
import { getConfig } from "../../config/api";
const { CLUSTER } = getConfig();
export const harvesterService = {
    getAll: async () => {
        const res: any =  await INSTANCE_V3.get(`/k8s/clusters/${CLUSTER}/v1/harvester/metrics.k8s.io.nodes`)
        return res.data?.data
    },
    getUserTemplates: async () => {
      const res: any = await INSTANCE_V3.get(`/k8s/clusters/${CLUSTER}/v1/configmaps/default`)
      return res.data
    }
}