import { TRACKR_CATS } from '@/constants';

interface TrackrAction {
  type: 'set';
  category: string;
  value: number;
}

export interface TrackrState {
  [category: string]: number;
}

export const initialState: TrackrState = TRACKR_CATS.reduce((prev, curr) => ({ ...prev, [curr]: '0' }), {});

export default function trackrReducer(state: TrackrState, action: TrackrAction) {
  if (!TRACKR_CATS.includes(action.category)) {
    return state;
  }

  const newState = { ...state };

  if (action.type === 'set') {
    newState[action.category] = action.value;
  }

  return newState;
}
