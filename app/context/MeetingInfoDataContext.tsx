"use client"

import { API_BASE_URL, processMeetingInfo } from '@/services/EventService';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { addOneDay, formatCurrentDateLocal, getCurrentDate } from '../utils/DateUtils';

import axios from 'axios';
import { useParams } from 'next/navigation';

interface MeetingInfoContextProps {
  meetingInfo: any;
  loading: boolean;
  error: any;
  setMeetingDate: ({startDate , endDate} : {startDate: any, endDate: any})  => void;
  fetchMeetingInfo: () => void;
  meetingDate: {
    startDate: any;
    endDate: any;
  };
}

const initialData = {
  meetingInfo: [],
  loading: false,
  error: null,
  setMeetingDate: () => {},
  fetchMeetingInfo: () => {},
  meetingDate: {
    startDate: null,
    endDate: "",
  },
}

export const MeetingInfoContext = createContext<MeetingInfoContextProps>(initialData);

export const useMeetingInfo = () => {
  const context = useContext(MeetingInfoContext);
  if (!context) {
    throw new Error('useMeetingInfo must be used within a MeetingInfoProvider');
  }
  return context;
};

interface MeetingInfoProviderProps {
  children: ReactNode;
  calendarId: string;
}

export const MeetingInfoProvider: React.FC<MeetingInfoProviderProps> = ({ calendarId, children }) => {
  const [meetingDate, setMeetingDate] = useState(initialData.meetingDate);
  const [meetingInfo, setMeetingInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeetingInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const currentDate = getCurrentDate();
      const result1 = addOneDay(currentDate);
      const startTime = result1.startOfDay;
      const endTime = result1.endOfDay;
      const currentTime = formatCurrentDateLocal(new Date());

      const response = await axios.get(`${API_BASE_URL}/event/getinstances`, {
        params: {
          calendarId,
          startTime : meetingDate.startDate ? meetingDate.startDate : startTime,
          endTime : meetingDate.endDate ? meetingDate.endDate : endTime,
        },
      });
      const meetingInfo = await processMeetingInfo(response);
      setMeetingInfo(meetingInfo);
    } catch (e: any) {
      console.log('Error fetching event instances', e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };


  

  useEffect(() => {
    fetchMeetingInfo();
  }, [calendarId, meetingDate]);

  return (
    <MeetingInfoContext.Provider
      value={{
        meetingInfo,
        loading,
        error,
        setMeetingDate,
        fetchMeetingInfo,
        meetingDate,
      }}
    >
      {children}
    </MeetingInfoContext.Provider>
  );
};