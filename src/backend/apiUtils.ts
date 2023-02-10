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
      const res: any = await client.post(`/${apiPath}`, createPayload);
      return { entity: res.data };
    } catch (error) {
      throw error;
    }
  };
}
