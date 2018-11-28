import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { HttpStatusCode, HttpStatusCodes } from './http-response';

interface PostData {
  key: string;
  name: string;
}

export const post: Handler = (event: APIGatewayEvent, context: Context, cb: Callback | undefined) => {
  if (event.body == null) {
    response(cb, HttpStatusCodes.BadRequest, {});
    return;
  }
  const req: PostData = JSON.parse(event.body!!);
  response(cb, HttpStatusCodes.OK, {
    message: "post request accepted.",
    body: event.body
  })
}

export const hello: Handler = (event: APIGatewayEvent, context: Context, cb: Callback | undefined) => {
  response(cb, HttpStatusCodes.OK, {
    message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
    input: event
  });
}

function response(cb: Callback | undefined, statusCode: HttpStatusCode, body: any | null) {
  if (!cb) throw new Error(`callback is undefined.`);
  cb(null, {
    statusCode: statusCode.code(),
    body: body ? JSON.stringify(body) : null
  });
}
