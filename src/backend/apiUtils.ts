import { client } from "./axios";
import { authHeader, uploadHeader } from "./entity";

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

export function produceUploadAPI<entityCreateProp, returnEntityType>(
  apiPath: string
) {
  return async function ({
    createPayload,
  }: CreateProps<entityCreateProp>): Promise<{ entity: returnEntityType }> {
    try {
      console.log("createPayload : ", createPayload);
      const res: any = await client.post(`/${apiPath}`, createPayload, {
        headers: uploadHeader(),
      });
      return { entity: res.data };
    } catch (error: any) {
      console.log("error =>", error);
      alert(error.response.data.message);
      throw error;
    }
  };
}

export function produceQueryAPI<returnEntityType>(apiPath: string) {
  return async function ({
    id,
  }: {
    id: number | undefined;
  }): Promise<{ entity: returnEntityType }> {
    try {
      const res: any = await client.post(`${apiPath}/${id}`, "", {
        headers: authHeader(),
      });
      return { entity: res.data };
    } catch (error: any) {
      console.log("error =>", error.response.data);
      return { entity: error.response.data };
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

export function produceDeleteAPI<returnEntityType>(apiPath: string) {
  return async function ({
    id,
  }: {
    id: number | undefined;
  }): Promise<{ entity: returnEntityType }> {
    try {
      const res: any = await client.delete(`${apiPath}/${id}`, {
        headers: authHeader(),
      });
      return { entity: res.data };
    } catch (error) {
      throw error;
    }
  };
}
