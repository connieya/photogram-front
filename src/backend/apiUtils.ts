import { client } from "./axios";
import { authHeader, uploadHeader } from "./entity";
import { useNavigate } from "react-router-dom";

interface CreateProps<entityCreateProp> {
  createPayload: entityCreateProp;
}

export function produceAuthAPI<entityCreateProp, returnEntityType>(
  apiPath: string
) {
  return async function ({
    createPayload,
  }: CreateProps<entityCreateProp>): Promise<{ entity: returnEntityType }> {
    try {
      const res: any = await client.post(`/${apiPath}`, createPayload);
      return { entity: res.data };
    } catch (error: any) {
      alert(error.response.data.message);
      console.log("error", error);
      throw error;
    }
  };
}

export function produceCreateAPI<entityCreateProp, returnEntityType>(
  apiPath: string
) {
  return async function ({
    createPayload,
  }: CreateProps<entityCreateProp>): Promise<{ entity: returnEntityType }> {
    try {
      const res: any = await client.post(`/${apiPath}`, createPayload, {
        headers: authHeader(),
      });
      return { entity: res.data };
    } catch (error: any) {
      console.log("error =>!!", error);
      if (error.response.status === 400) {
        alert(error.response.data.data.content);
      }
      throw error;
    }
  };
}
export function produceProfileAPI<entityCreateProp, returnEntityType>(
  apiPath: string
) {
  return async function ({
    createPayload,
  }: CreateProps<entityCreateProp>): Promise<{ entity: returnEntityType }> {
    try {
      const res: any = await client.put(`/${apiPath}`, createPayload, {
        headers: uploadHeader(),
      });
      return { entity: res.data };
    } catch (error: any) {
      const navigate = useNavigate();
      console.log("error =>", error);
      if (error.status === 401) {
        alert("로그인이 만료 되었습니다. 다시 로그인 해주세요");
        navigate("/signin");
      }
      throw error;
    }
  };
}

export function produceUpdateProfileAPI<entityCreateProp, returnEntityType>(
  apiPath: string
) {
  return async function ({
    createPayload,
  }: CreateProps<entityCreateProp>): Promise<{ entity: returnEntityType }> {
    try {
      console.log("createPayload : ", createPayload);
      const res: any = await client.put(`/${apiPath}`, createPayload, {
        headers: authHeader(),
      });
      return { entity: res.data };
    } catch (error: any) {
      const navigate = useNavigate();
      console.log("error =>", error);
      if (error.status === 401) {
        alert("로그인이 만료 되었습니다. 다시 로그인 해주세요");
        navigate("/signin");
      }
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
      const navigate = useNavigate();
      if (error.status === 401) {
        alert("로그인이 만료 되었습니다. 다시 로그인 해주세요");
        navigate("/signin");
      }
      return { entity: error.response.data };
    }
  };
}

export function produceReadAPI<returnEntityType>(apiPath: string) {
  return async function ({
    id,
  }: {
    id: number | undefined;
  }): Promise<{ entity: returnEntityType }> {
    try {
      const res: any = await client.get(`${apiPath}/${id}`, {
        headers: authHeader(),
      });
      return { entity: res.data };
    } catch (error: any) {
      const navigate = useNavigate();
      console.log("error =>", error.response.data);
      if (error.status === 401) {
        alert("로그인이 만료 되었습니다. 다시 로그인 해주세요");
        navigate("/signin");
      }

      return { entity: error.response.data };
    }
  };
}

export function produceGetAPI<returnEntityType>(apiPath: string) {
  return async function (): Promise<{ entity: returnEntityType }> {
    try {
      const res: any = await client.get(`/${apiPath}`, {
        headers: authHeader(),
      });
      return { entity: res.data };
    } catch (error: any) {
      const navigate = useNavigate();
      console.log("error => ", error);
      if (error.status === 401) {
        alert("로그인이 만료 되었습니다. 다시 로그인 해주세요");
        navigate("/signin");
      }
      throw error;
    }
  };
}

export function producePageAPI<returnEntityType>(apiPath: string) {
  return async function ({
    page,
  }: {
    page: number;
  }): Promise<{ entity: returnEntityType }> {
    try {
      const res: any = await client.get(`/${apiPath}?query=${page}`);
      return { entity: res.data };
    } catch (error: any) {
      const navigate = useNavigate();
      console.log("error => ", error);
      if (error.status === 401) {
        alert("로그인이 만료 되었습니다. 다시 로그인 해주세요");
        navigate("/signin");
      }
      throw error;
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
    } catch (error: any) {
      const navigate = useNavigate();
      console.log("error => ", error);
      if (error.status === 401) {
        alert("로그인이 만료 되었습니다. 다시 로그인 해주세요");
        navigate("/signin");
      }
      throw error;
    }
  };
}
