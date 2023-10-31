'use server';

import { LOKI_HOST, LOKI_PORT, LOKI_APPLICATION, LOKI_ANNOTATION_TYPE } from '@/constants';

const CONN_STR = `http://${LOKI_HOST}:${LOKI_PORT}/loki/api/v1/push`;

interface LokiPushBody {
  streams: [
    {
      stream: LokiStreamLabels;
      values: LokiStreamValue[];
    },
  ];
}

interface LokiStreamLabels {
  [label: string]: string;
}

type LokiStreamValue = [string, string];

interface ServerActionResponse {
  status: number;
  error?: string;
  response?: string;
}

export const createAnnotation = async (annotation: string): Promise<ServerActionResponse> => {
  const body: LokiPushBody = {
    streams: [
      {
        stream: {
          application: LOKI_APPLICATION,
        },
        values: [
          // Loki requires timestamps in nanoseconds
          [String(Date.now() * 1e6), annotation],
        ],
      },
    ],
  };

  console.log(JSON.stringify(body, null, 2));

  try {
    const response = await fetch(CONN_STR, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status >= 400) {
      return { status: response.status, response: await response.text() };
    }

    return { status: response.status, response: `Annotation written` };
  } catch (e) {
    return { status: 500, response: (e as Error).message };
  }
};
