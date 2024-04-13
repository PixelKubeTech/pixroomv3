import {createContext,Dispatch,SetStateAction} from 'react'

export type CalenderType = {
  meetingDate: string | null;
};
type Action = {
  type: string;
  payload: any; 
};
export const MeetingContext = createContext<CalenderType|null>(null);
export const MeetingDispatchContext = createContext<Dispatch<Action> | null>(null)
export const MeetingInfoContext = createContext(null)