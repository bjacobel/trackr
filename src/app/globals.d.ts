interface TrackrAction {
  type: 'set' | 'clear';
  category?: string;
  value?: number;
}

interface TrackrState {
  [category: string]: number;
}

type TrackrMetric = TRACKR_RELATIVE_METRIC | TRACKR_ABSOLUTE_METRIC;
