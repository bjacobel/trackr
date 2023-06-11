'use server';

import { OPENTSDB_HOST, OPENTSDB_PORT, TRACKR_RELATIVE_METRIC } from '@/constants';
import { TrackrState } from '@/data/trackrReducer';

const CONN_STR = `http://${OPENTSDB_HOST}:${OPENTSDB_PORT}/api/put`;

export const createTrackrDatapoints = async (data: TrackrState) => {
  const metrics = Object.entries(data).map(([category, value]) => ({
    metric: TRACKR_RELATIVE_METRIC,
    timestamp: Date.now(),
    value,
    tags: {
      category,
    },
  }));

  try {
    const response = await fetch(CONN_STR, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metrics),
    });
    return { status: response.status, response: `${metrics.length} metric datapoints written` };
  } catch (e) {
    console.error(e);
    return { status: 500, error: (e as Error).message };
  }
};
