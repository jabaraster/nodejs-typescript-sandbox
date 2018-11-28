import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { HttpStatusCode } from './http-response';
import { v4 } from 'uuid';

export function response(cb: Callback | undefined, statusCode: HttpStatusCode, body: any | null) {
  if (!cb) throw new Error(`callback is undefined.`);
  cb(null, {
    statusCode: statusCode.code(),
    body: body ? JSON.stringify(body) : {}
  });
}

export function firstTableName(stage: string): string {
  return `${stage}_FirstTable`;
}

export function newId(): string {
  return v4();
}
