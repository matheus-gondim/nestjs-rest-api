export interface ResponseObject<U> {
  message: string;
  content?: U;
  total?: number;
  info?: any;
}
