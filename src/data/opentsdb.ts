'use server';

import { parse } from 'csv-parse';

import {
  LEGACY_MAPPINGS,
  OPENTSDB_HOST,
  OPENTSDB_PORT,
  TRACKR_RELATIVE_CATS,
  TRACKR_RELATIVE_METRIC,
} from '@/constants';
import { TrackrState } from '@/data/trackrRelativeReducer';

const CONN_STR = `http://${OPENTSDB_HOST}:${OPENTSDB_PORT}/api/put`;

interface OpenTsdbMetric {
  metric: string;
  timestamp: number;
  value: number;
  tags: {
    [tagName: string]: string;
  };
}

interface ServerActionResponse {
  status: number;
  error?: string;
  response?: string;
}

const putMetrics = async (metrics: OpenTsdbMetric[]) => {
  const response = await fetch(CONN_STR, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metrics),
  });
  return { status: response.status, response: `${metrics.length} metric datapoints written` };
};

export const createTrackrDatapoints = async (data: TrackrState): Promise<ServerActionResponse> => {
  const metrics = Object.entries(data).map(([category, value]) => ({
    metric: TRACKR_RELATIVE_METRIC,
    timestamp: Date.now(),
    value,
    tags: {
      category,
    },
  }));

  try {
    return putMetrics(metrics);
  } catch (e) {
    console.error(e);
    return { status: 500, error: (e as Error).message };
  }
};

export const backfillFromCsv = async (csv: string): Promise<ServerActionResponse> => {
  return new Promise<{ [column: string]: string }[]>((resolve, reject) => {
    parse(csv, { cast_date: true, columns: true }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  })
    .then(parsedCsv =>
      parsedCsv
        .map(row => {
          const timestamp = new Date(row.Date).setHours(21);

          return Object.entries(row).reduce<OpenTsdbMetric[]>((prev, [category, value]) => {
            const categoryMatchingCase = TRACKR_RELATIVE_CATS.find(
              canonical => canonical.toLowerCase() === category.toLowerCase(),
            );

            if (!categoryMatchingCase) return prev;

            return [
              ...prev,
              {
                metric: TRACKR_RELATIVE_METRIC,
                timestamp,
                value: LEGACY_MAPPINGS[value],
                tags: {
                  category: categoryMatchingCase,
                },
              },
            ];
          }, []);
        })
        .flat(),
    )
    .then(putMetrics)
    .catch(error => {
      console.error(error);
      return { status: 500, error: (error as Error).message };
    });
};
