const MEETING_CALENDER_DATE = "meeting_calender_date";

type CalenderType = {
  meetingDate: string | null;
};

export function calenderReducer(state: CalenderType, action) {
    switch (action.type) {
      case MEETING_CALENDER_DATE:
        return {
          ...state,
          meetingDate: action.payload,
        };
      default:
        return state;
    }
  }