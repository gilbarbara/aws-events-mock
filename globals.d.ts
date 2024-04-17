declare module '*.json' {
  const value: any;
  export default value;
}

declare module 'aws-lambda' {
  export interface AlexaSmartHomeEvent {
    header: { [name: string]: string };
    payload: {
      accessToken: string;
      appliance: {
        additionalApplianceDetails: { [name: string]: string };
        applianceId: string;
      };
      switchControlAction: string;
    };
  }

  export interface AlexaSkillEvent {
    context: AlexaSkillContext;
    request: {
      type: string;
    };
    session: AlexaSkillSession;
    version: string;
  }

  export interface AlexaSkillSession {
    application: {
      applicationId: string;
    };
    attributes: {
      [name: string]: string;
    };
    new: boolean;
    sessionId: string;
    user: AlexaSkillUser;
  }

  export interface AlexaSkillContext {
    AudioPlayer: {
      offsetInMilliseconds: number;
      playerActivity: string;
      token: string;
    };
    System: {
      apiAccessToken: string;
      apiEndpoint: string;
      application: {
        applicationId: string;
      };
      device: {
        deviceId: string;
        supportedInterfaces: {
          AudioPlayer: any;
        };
      };
      user: AlexaSkillUser;
    };
  }

  export interface AlexaSkillUser {
    accessToken: string;
    permissions: {
      consentToken: string;
    };
    userId: string;
  }

  export interface AlexaSkillRequest {
    locale: string;
    requestId: string;
    timestamp: string;
    type: string;
  }

  export interface CloudWatchEvent {
    account: string;
    detail: {
      'instance-id': string;
      state: string;
    };
    'detail-type': string;
    id: string;
    region: string;
    resources: string[];
    source: string;
    time: string;
    version: string;
  }
}
export {};
