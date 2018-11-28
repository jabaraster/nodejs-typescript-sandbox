import  AWS = require('aws-sdk');
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { HttpStatusCode, HttpStatusCodes } from './http-response';
import { FirstTableRecord } from './types';

import { response, firstTableName, newId } from './util';

AWS.config.update({ region: 'ap-northeast-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();

interface PostData {
  name: string;
  option: any;
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

export const getData: Handler = (event: APIGatewayEvent, context: Context, cb: Callback | undefined) => {
  dynamodb.scan({
    TableName: firstTableName(event.requestContext.stage)
  }, (err, data) => {
    if (err) {
      response(cb, HttpStatusCodes.InternalServerError, err);
      return;
    }
    if (!data.Items) {
      response(cb, HttpStatusCodes.InternalServerError, data);
      return;
    }
    response(cb, HttpStatusCodes.OK, {
      data: data.Items!!.map(resToRec),
      original: data
    });
  });
}
function resToRec(attr: AWS.DynamoDB.DocumentClient.AttributeMap): FirstTableRecord {
  return {
    id: attr["id"] as string,
    name: attr["name"] as string
  };
}

export const postData: Handler = (event: APIGatewayEvent, context: Context, cb: Callback | undefined) => {
  if (event.body == null) {
    response(cb, HttpStatusCodes.BadRequest, {message: 'body is null.'});
    return;
  }
  const req: PostData = JSON.parse(event.body!!);
  if (!req.name) {
    response(cb, HttpStatusCodes.BadRequest, {message: 'property "name" is required.'});
    return;
  }
  const newRecord = {
    TableName: firstTableName(event.requestContext.stage),
    Item: {
      id: newId(),
      name: req.name,
      option: req.option
    }
  };
  dynamodb.put(newRecord, (err, data) => {
    if (err) {
      console.log(err);
      response(cb, HttpStatusCodes.InternalServerError, err);
      return;
    }
    response(cb, HttpStatusCodes.Created, newRecord.Item);
  });
}
