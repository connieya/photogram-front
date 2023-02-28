import { client } from "./axios";
import { authHeader } from "./entity";

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

export function produceReadAPI<returnEntityType>(apiPath: string) {
  return async function ({
    id,
  }: {
    id: number;
  }): Promise<{ entity: returnEntityType }> {
    try {
      const res: any = await client.get(`${apiPath}/${id}`, {
        headers: authHeader(),
      });
      return { entity: res.data };
    } catch (error: any) {
      console.log("error =>", error.response.data);
      return { entity: error.response.data };
    }
  };
}
