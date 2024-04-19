import {
  AlexaSkillEvent,
  AlexaSmartHomeEvent,
  APIGatewayEvent,
  CloudWatchEvent,
  CloudWatchLogsEvent,
  CognitoUserPoolEvent,
  DynamoDBStreamEvent,
  KinesisStreamEvent,
  S3Event,
  ScheduledEvent,
  SNSEvent,
  SQSEvent,
} from 'aws-lambda';
import merge from 'lodash.merge';

import alexaSkillEventTemplate from './templates/alexa-skill-event-template.json';
import alexaSmartHomeEventTemplate from './templates/alexa-smart-home-event-template.json';
import apiGatewayTemplate from './templates/api-gateway-event-template.json';
import cloudWatchEventTemplate from './templates/cloud-watch-event-template.json';
import cloudwatchLogEventTemplate from './templates/cloud-watch-log-event-template.json';
import cognitoUserPoolEventTemplate from './templates/cognito-user-pool-event-template.json';
import dynamoTemplate from './templates/dynamo-stream-event-template.json';
import kinesisTemplate from './templates/kinesis-template.json';
import s3Template from './templates/s3-template.json';
import scheduledTemplate from './templates/scheduled-template.json';
import snsTemplate from './templates/sns-template.json';
import sqsTemplate from './templates/sqs-template.json';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type EventDictionary = typeof dictionary;

export const dictionary = {
  'aws:sns': snsTemplate as SNSEvent,
  'aws:sqs': sqsTemplate as SQSEvent,
  'aws:apiGateway': apiGatewayTemplate as APIGatewayEvent,
  'aws:scheduled': scheduledTemplate as ScheduledEvent,
  'aws:s3': s3Template as S3Event,
  'aws:kinesis': kinesisTemplate as KinesisStreamEvent,
  'aws:dynamo': dynamoTemplate as DynamoDBStreamEvent,
  'aws:cloudWatchLog': cloudwatchLogEventTemplate as CloudWatchLogsEvent,
  'aws:alexaSmartHome': alexaSmartHomeEventTemplate as AlexaSmartHomeEvent,
  'aws:alexaSkill': alexaSkillEventTemplate as AlexaSkillEvent,
  'aws:cloudWatch': cloudWatchEventTemplate as CloudWatchEvent,
  'aws:iot': {} as any,
  'aws:cognitoUserPool': cognitoUserPoolEventTemplate as CognitoUserPoolEvent,
  'aws:websocket': apiGatewayTemplate as APIGatewayEvent,
};

export default function createEvent<T extends keyof EventDictionary>(
  eventType: T,
  body: DeepPartial<EventDictionary>[T],
): EventDictionary[T] {
  const event = dictionary[eventType];

  /* c8 ignore next 3 */
  if (!event) {
    return {};
  }

  return merge(structuredClone(event), body);
}
