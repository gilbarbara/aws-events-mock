import createEvent from '../src';

describe('create an AlexaSkill event', () => {
  it('should return a valid event', () => {
    const event = createEvent('aws:alexaSkill', {
      request: {
        type: 'CanFulfillIntentRequest',
      },
      context: {
        System: {
          device: {
            deviceId: 'myDevice',
          },
        },
      },
    });

    expect(event?.request?.type).toBe('CanFulfillIntentRequest');
    expect(event?.context?.System?.device?.deviceId).toBe('myDevice');
  });
});

describe('create an AlexaSmartHome event', () => {
  it('should return a valid event', () => {
    const event = createEvent('aws:alexaSmartHome', {
      payload: {
        switchControlAction: 'TURN_OFF',
      },
    });

    expect(event?.payload?.switchControlAction).toBe('TURN_OFF');
  });
});

describe('create an ApiGateway event()', () => {
  it('should return a valid event', () => {
    const event = createEvent('aws:apiGateway', {
      body: JSON.stringify({
        first_name: 'Sam',
        last_name: 'Smith',
      }),
    });
    const parsedBody = JSON.parse(event.body || '');

    expect(parsedBody.first_name).toBe('Sam');
    expect(parsedBody.last_name).toBe('Smith');
    expect(event.httpMethod).toBe('GET');
  });
});

describe('create a CloudWatch event()', () => {
  it('should return a valid event', () => {
    const event = createEvent('aws:cloudWatch', {
      'detail-type': 'Something has been deleted.',
      region: 'us-east-1',
    });

    expect(event['detail-type']).toBe('Something has been deleted.');
    expect(event.region).toBe('us-east-1');
  });
});

describe('create CloudWatchLog event', () => {
  it('should return a valid event', () => {
    const event = createEvent('aws:cloudWatchLog', {
      awslogs: {
        data: 'Some gzipped, then base64 encoded data',
      },
    });

    expect(event?.awslogs?.data).toBe('Some gzipped, then base64 encoded data');
  });
});

describe('create a CognitoPool event()', () => {
  it('should return a valid event', () => {
    const event = createEvent('aws:cognitoUserPool', {
      userName: 'notAJ',
    });

    expect(event.userName).toBe('notAJ');
  });
});

describe('create an Iot event()', () => {
  it('should return a valid event', () => {
    const event = createEvent('aws:iot', {
      this: {
        can: {
          be: 'anything I want',
        },
      },
    });

    expect(event.this.can.be).toBe('anything I want');
  });
});

describe('create a Kinesis event', () => {
  it('should return a valid event', () => {
    const event = createEvent('aws:kinesis', {
      Records: [
        {
          kinesis: {
            data: Buffer.from('kinesis test').toString('base64'),
          },
        },
      ],
    });

    expect(Buffer.from(event?.Records?.[0]?.kinesis?.data ?? '', 'base64').toString('ascii')).toBe(
      'kinesis test',
    );
  });
});

describe('create a S3 Event()', () => {
  it('should return a valid event', () => {
    const event = createEvent('aws:s3', {
      Records: [
        {
          s3: {
            bucket: {
              name: 'my-bucket-name',
            },
            object: {
              key: 'object-key',
            },
          },
        },
      ],
    });

    expect(event?.Records?.[0]?.s3?.bucket?.name).toBe('my-bucket-name');
    expect(event?.Records?.[0]?.s3?.object?.key).toBe('object-key');
    expect(event?.Records?.[0]?.eventName).toBe('ObjectCreated:Put');
  });

  it('should return a valid event without side-effect', () => {
    const event = createEvent('aws:s3', {
      Records: [
        {
          s3: {
            bucket: {
              name: 'my-bucket-name',
            },
            object: {
              key: 'object-key',
            },
          },
        },
      ],
    });

    const event2 = createEvent('aws:s3', {
      Records: [
        {
          s3: {
            bucket: {
              name: 'my-bucket-name',
            },
            object: {
              key: 'object-key-2',
            },
          },
        },
      ],
    });

    expect(event?.Records?.[0]?.eventName).toBe('ObjectCreated:Put');
    expect(event?.Records?.[0]?.s3?.bucket?.name).toBe('my-bucket-name');
    expect(event?.Records?.[0]?.s3?.object?.key).toBe('object-key');

    expect(event2?.Records?.[0]?.s3?.object?.key).toBe('object-key-2');
  });
});

describe('create a Scheduled event()', () => {
  it('should return a valid event', () => {
    const event = createEvent('aws:scheduled', {
      region: 'us-west-2',
    });

    expect(event.region).toBe('us-west-2');
    expect(event['detail-type']).toBe('Scheduled Event');
  });
});

describe('create a SNS event', () => {
  it('should return a valid event', () => {
    const event = createEvent('aws:sns', {
      Records: [
        {
          Sns: {
            Message: 'trigger-email',
          },
        },
      ],
    });

    expect(event?.Records?.[0]?.Sns?.Message).toBe('trigger-email');
    expect(event?.Records?.[0]?.Sns?.Type).toBe('Notification');
  });
});

describe('create a SQS event', () => {
  it('should return a valid event', () => {
    const event = createEvent('aws:sqs', {
      Records: [
        {
          body: JSON.stringify({
            foo: 'bar',
          }),
        },
      ],
    });

    expect(event?.Records?.[0]?.body).toBe('{"foo":"bar"}');
    expect(event?.Records?.[0]?.eventSource).toBe('aws:sqs');
  });
});

describe('create a WebSocket Event()', () => {
  it('should return a valid event', () => {
    const event = createEvent('aws:websocket', {
      body: JSON.stringify({
        first_name: 'Sam',
        last_name: 'Smith',
      }),
      requestContext: {
        connectedAt: 123,
        connectionId: 'abc123',
      },
    });
    const parsedBody = JSON.parse(event.body || '');

    expect(parsedBody.first_name).toBe('Sam');
    expect(parsedBody.last_name).toBe('Smith');
    expect(event?.requestContext?.connectedAt).toBe(123);
    expect(event?.requestContext?.connectionId).toBe('abc123');
  });
});
