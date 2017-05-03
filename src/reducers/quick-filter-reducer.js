import ActionTypes from '../constants/action-types';

let initialState = [
  {
    label: "Announcements",
    active: false,
    type: "announcement"
  },

  {
    label: "Lectures",
    active: false,
    type: "lecture"
  },

  {
    label: "Workshops",
    active: false,
    type: "workshop"
  },

  {
    label: "Assignments",
    active: false,
    type: "assignment"
  }
];

export default function(state = initialState, action = {}) {
  switch(action.type) {
    case ActionTypes.QUICK_FILTER.ENABLE_FILTER:
      return state.map((filter, index) => {
        return (index === action.payload)
          ? { ...filter, active: true }
          : filter;
      });
    case ActionTypes.QUICK_FILTER.DISABLE_FILTER:
      return state.map((filter, index) => {
        return (index === action.payload)
          ? { ...filter, active: false }
          : filter;
      });

    default:
      return state;
  }
}