import { client } from "./axios";

interface CreateProps<entityCreateProp> {
  createPayload: entityCreateProp;
}

export function produceCreateAPI<entityCreateProp, returnEntityType>(
  apiPath: string
) {
  return async function ({
    createPayload,
  }: CreateProps<entityCreateProp>): Promise<{ entity: returnEntityType }> {
    try {
      console.log("createPayload : ", createPayload);
      const res: any = await client.post(`/${apiPath}`, createPayload);
      return { entity: res.data };
    } catch (error: any) {
      console.log("error =>", error);
      alert(error.response.data.message);
      throw error;
    }
  };
}
