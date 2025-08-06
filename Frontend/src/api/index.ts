import { createAlova } from "alova";
import VueHook from "alova/vue";
import adapterFetch from "alova/fetch";

export interface ResponseData<T> {
  code: number;
  message: string;
  data: T;
}
export const apiAlova = createAlova({
  baseURL: "http://localhost:8080/api",
  statesHook: VueHook,
  requestAdapter: adapterFetch
});
export const userAlova = createAlova({
  baseURL: "http://127.0.0.1:8080",
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});
export const routerAlova = createAlova({
  baseURL: "http://127.0.0.1:8080/sysMenu",
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});
export const menuAlova = createAlova({
  baseURL: "http://127.0.0.1:8080/sysMenu",
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});
