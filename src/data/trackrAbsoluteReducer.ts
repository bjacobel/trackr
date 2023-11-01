import { TRACKR_ABSOLUTE_CATS } from '@/constants';

export const initialState: TrackrState = TRACKR_ABSOLUTE_CATS.reduce(
  (prev, curr) => ({ ...prev, [curr]: undefined }),
  {},
);

export default function trackrReducer(state: TrackrState, action: TrackrAction) {
  if (action.category && !TRACKR_ABSOLUTE_CATS.includes(action.category)) {
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
