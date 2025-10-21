import axios, { type AxiosInstance } from "axios";
import { buildEncryptedPayload } from "@/utils/crypto";

// 从环境变量获取API配置
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

/**
 * 创建 Axios 实例
 * 包含请求和响应拦截器，支持安全加密传输
 */
export const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 请求拦截器
  client.interceptors.request.use(
    async (config) => {
      // 记录API请求日志
      console.log(
        `API Request: ${config.method?.toUpperCase()} ${config.url}`,
        config.data
      );

      // 启用安全策略时处理
      const appSecurity = (await import("@/config.json")).default.security;
      const enable = appSecurity?.enable;

      if (enable && appSecurity) {
        const payloadField = appSecurity.transport?.payloadField || "payload";
        const headerKey = appSecurity.transport?.headerKey;
        const headerValue = appSecurity.transport?.headerValue;

        if (headerKey && headerValue) {
          config.headers = {
            ...(config.headers || {}),
            [headerKey]: headerValue,
          } as any;
        }

        const method = (config.method || "get").toLowerCase();
        if (method === "get") {
          const rawParams = (config.params as any) || {};
          const encrypted = await buildEncryptedPayload(rawParams);
          config.params = { [payloadField]: encrypted.payload } as any;
        } else {
          const rawData = (config.data as any) || {};
          const encrypted = await buildEncryptedPayload(rawData);
          config.data = { [payloadField]: encrypted.payload } as any;
        }
      }

      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  client.interceptors.response.use(
    (response) => {
      // 记录API响应日志
      console.log(`API Response: ${response.config.url}`, response.data);
      return response;
    },
    (error) => {
      console.error("Response error:", error);
      return Promise.reject(error);
    }
  );

  return client;
};
