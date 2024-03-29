import { TRACKR_RELATIVE_CATS } from '@/constants';

export const initialState: TrackrState = TRACKR_RELATIVE_CATS.reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});

export default function trackrReducer(state: TrackrState, action: TrackrAction) {
  if (action.category && !TRACKR_RELATIVE_CATS.includes(action.category)) {
    return state;
  }

  const newState = { ...state };

  if (action.type === 'set' && action.category && action.value !== undefined) {
    newState[action.category] = action.value;
  } else if (action.type === 'clear') {
    return { ...initialState };
  }

  return newState;
}
