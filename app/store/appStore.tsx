import { create } from 'zustand';
import { getEventInstances } from '@/services/EventService';
import { getDeviceInfo } from '@/services/DeviceService';
import { getThemesById } from '@/services/ThemeService';
import { getSpaceInfo } from '@/services/SpaceService';
import { groupBy } from 'lodash';
import { SpaceInfo } from '@/app/interface/SpaceType';
import { DeviceInfo } from '@/app/interface/DeviceInfoType';
import { IEvent } from '@/app/interface/EventType';
import { generateTwoDayMockEvents } from './mockEvents';
import { Interval } from '../interface/Intervals';

interface ThemeData {
  allowBooking: boolean;
  confirmBooking: boolean;
  qrcodeauth: boolean;
  changeEndTime: boolean;
  endBooking: boolean;
  showOrganizer: boolean;
  hideSubject: boolean;
  showAppointmentsForDays: number;
  findRoom: boolean;
  enableFaultReporting: boolean;
  accessSettings: boolean;
  enableLEDStatus: boolean;
  scrollSubject: boolean;
  signageOnAvailability: boolean;
  availableStatusColor: string;
  occupiedStatusColor: string;
  subjectFont: string;
  subjectFontSize: string;
  organizerFont: string;
  organizerFontSize: string;
  upcomingMeetingSubjectFont: string;
  upcomingMeetingSubjectFontSize: string;
  upcomingMeetingOrganizerFont: string;
  upcomingMeetingOrganizerFontSize: string;
  watermarkPlaylist: string;
  signagePlaylist: string;
  languages: any[]; // Adjust the type if you have more details about the structure of `languages`.
  showAppointmentForDays: number;
  startSignageMinute: number;
  stopSignageMinute: number;
  confirmbtnbefore: number;
  confirmbtnafter: number;
}

interface Theme {
  id: number;
  themethumbnail: string;
  themename: string;
  themetype: string;
  themedata: string; // This is a JSON string representation of `themedatajson`.
  logo: string;
  background: string;
  themedatajson: ThemeData;
}


interface AppState {
  macaddress: string | null;
  deviceInfo: DeviceInfo | null;
  themeInfo: Theme | null;
  spaceInfo: SpaceInfo | null;
  events: IEvent[];
  nextMeeting: any | null;
  activeMeeting: any | null; // Current meeting in progress
  upcomingEvents: IEvent[]; 
  intervalsForAnalogClock: Interval[],
  upcomingEventsByDay: Record<string, IEvent[]>;
  loading: boolean;
  selectedDay: number;
  intervalId: ReturnType<typeof setTimeout> | null; // To store the interval ID 
  startPolling: () => void;
  stopPolling: () => void;
  error: string | null;
  deviceConfigured: string; // 'configured' or 'requires_configuration'
  landingPage: 'settings' | 'meeting' | 'meetingbooked'; // Landing page state
  setMacAddress: (mac: string) => void;
  setDeviceInfo: (deviceInfo: DeviceInfo) => void;
  determineLandingPage: () => void; // Landing page determination
  fetchEvents: () => Promise<void>;
  getDevInfo: () => Promise<void>;
  getThemeInfo: () => Promise<void>;
  getSpaceInfo: () => Promise<void>;
  processEvents: () => void;
  setSelectedDay: (day:number) => void;
  loadFromLocalStorage: () => void;
  saveToLocalStorage: () => void;
  clearLocalStorage:() => void;
}

const convertTimeToDegrees = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const adjustedHours = hours % 12; // Convert to 12-hour format
  const hourDegrees = adjustedHours * 30; // Each hour is 30 degrees
  const minuteDegrees = minutes * 0.5;   // Each minute is 0.5 degrees
  const totalDegrees = (hourDegrees + minuteDegrees + 270) % 360;

  return totalDegrees;
};


export const useAppStore = create<AppState>((set, get) => ({
  macaddress: null,
  deviceInfo: null,
  themeInfo: null,
  spaceInfo: null,
  events: [],
  nextMeeting: null,
  activeMeeting: null,
  intervalId: null,
  upcomingEvents: [],
  intervalsForAnalogClock:[],
  upcomingEventsByDay: {},
  loading: false,
  error: null,
  deviceConfigured: 'configured',
  landingPage: 'meeting',
  selectedDay: (new Date()).getDate(),
  setSelectedDay: (day:number) => set({ selectedDay: day }),
  setMacAddress: (mac) => set({ macaddress: mac }),

  setDeviceInfo: (deviceInfo) => set({ deviceInfo }),

  determineLandingPage: () => {
    const { deviceInfo, events } = get();
    const now = new Date().getTime();

    if (!deviceInfo?.spaceId) {
      set({ landingPage: 'settings' });
      return;
    }

    const currentEvent = events.find(
      (event) =>
        new Date(event.bookingDetails.from1).getTime() >= now &&
        new Date(event.bookingDetails.to2).getTime() <= now
    );
    console.log("determining landing page", currentEvent)

    set({ landingPage: currentEvent ? 'meetingbooked' : 'meeting' });
  },
  startPolling: () => {
    const { fetchEvents, intervalId } = get();

    // Avoid creating multiple intervals
    if (intervalId) {
      return;
    }

    const newIntervalId = setInterval(() => {
      fetchEvents();
    }, 60000); // Poll every 60 seconds

    set({ intervalId: newIntervalId });
  },
  stopPolling: () => {
    const {intervalId}  = get();

    if (intervalId) {
      clearInterval(intervalId);
      set({ intervalId: null });
    }
  },
  loadFromLocalStorage: () => {
    const storedMacAddress = localStorage.getItem('macaddress');
    const storedDeviceInfo = localStorage.getItem('deviceInfo');
    const storedThemeInfo = localStorage.getItem('themeInfo');
    const storedEvents = localStorage.getItem('events');
    const storedSpaceInfo = localStorage.getItem('spaceInfo');

    set({
      macaddress: storedMacAddress || null,
      deviceInfo: storedDeviceInfo ? JSON.parse(storedDeviceInfo) : null,
      themeInfo: storedThemeInfo ? JSON.parse(storedThemeInfo) : null,
      events: storedEvents ? JSON.parse(storedEvents) : [],
      spaceInfo: storedSpaceInfo ? JSON.parse(storedSpaceInfo) : null,
    });

    get().processEvents();
    get().determineLandingPage();
  },

  clearLocalStorage:() =>{
    localStorage.clear();
  },

  saveToLocalStorage: () => {
    const { macaddress, deviceInfo, themeInfo, events, spaceInfo } = get();

    if (macaddress) localStorage.setItem('macaddress', macaddress);
    if (deviceInfo) localStorage.setItem('deviceInfo', JSON.stringify(deviceInfo));
    if (themeInfo) localStorage.setItem('themeInfo', JSON.stringify(themeInfo));
    if (events) localStorage.setItem('events', JSON.stringify(events));
    if (spaceInfo) localStorage.setItem('spaceInfo', JSON.stringify(spaceInfo));
  },

  getThemeInfo: async () => {
    const { deviceInfo } = get();

    if (!deviceInfo?.theme) {
      set({ error: 'Theme ID is missing', loading: false });
      return;
    }

    try {
      const request = { Id: deviceInfo.theme };
      const themeInfo = await getThemesById(request);

      if (themeInfo) {
        themeInfo['themedatajson'] = JSON.parse(themeInfo.themedata);
        set({ themeInfo });
        get().saveToLocalStorage();
      }
    } catch (error) {
      set({ error: 'Failed to fetch theme information', loading: false });
    }
  },

  getSpaceInfo: async () => {
    const { deviceInfo } = get();

    if (!deviceInfo?.spaceId) {
      set({ error: 'Space ID is missing', loading: false });
      return;
    }

    try {
      const request = { spaceId: deviceInfo.spaceId };
      const spaceInfoResp = await getSpaceInfo(request);

      if (spaceInfoResp) {
        set({ spaceInfo: spaceInfoResp.data });
        get().saveToLocalStorage();
      }
    } catch (error) {
      set({ error: 'Failed to fetch space information', loading: false });
    }
  },

  fetchEvents: async () => {
    set({ loading: true, error: null });
    const macaddress = get().macaddress;

    if (!macaddress) {
      set({ error: 'MAC address is missing', loading: false });
      return;
    }

    try {
      await get().getDevInfo();
      const { deviceInfo } = get();

      if (!deviceInfo?.calendarId) {
        set({ error: 'Calendar ID is missing', loading: false });
        return;
      }

      await get().getThemeInfo();
      await get().getSpaceInfo();

      const request = { calendarId: deviceInfo.calendarId };
      let events; 
      if(process.env.NEXT_PUBLIC_USE_MOCK_EVENTS && process.env.NEXT_PUBLIC_USE_MOCK_EVENTS==="1" ){
        console.log("use mock events?", process.env.NEXT_PUBLIC_USE_MOCK_EVENTS);
        events = generateTwoDayMockEvents(); 
      } else {
        events = await getEventInstances(request) || [];
      }

      set({ events, loading: false });
      get().saveToLocalStorage();
      get().processEvents();
      get().determineLandingPage();
    } catch (error) {
      set({ error: 'Failed to fetch events', loading: false });
    }
  },

  getDevInfo: async () => {
    const macaddress = get().macaddress;
    if (!macaddress) return;

    try {
      const request = { serialNumber: macaddress };
      const response = await getDeviceInfo(request);

      if (response.success && response.result) {
        const deviceInfo: DeviceInfo = {
          spaceId: response.result.spaceId,
          calendarId: response.result.calendarId,
          theme: response.result.theme,
        };
        set({ deviceInfo });
        get().saveToLocalStorage();
      }
    } catch (error) {
      set({ error: 'Failed to fetch device information', loading: false });
    }
  },

  processEvents: () => {
    const now = new Date();
    const events = get().events;

    const upcomingEvents =  events.filter(
      (event) => new Date(event.bookingDetails.to2) > now
    );

    const d = new Date();
    const nextMeeting = upcomingEvents.length > 0 ? upcomingEvents[d.getDay()] : null;
    const activeMeeting = events.find(
      (event) =>
        new Date(event.bookingDetails.from1) <= now &&
        new Date(event.bookingDetails.to2) >= now
    );

    const upcomingEventsByDay = groupBy(upcomingEvents, (event) => {
      const date = new Date(event.bookingDetails.from1);
      return date.getDate();
    });

    const todaysEvents = upcomingEventsByDay[now.getDate()] || [];

    const intervalsForAnalogClock = todaysEvents.map((event) => ({
      start: convertTimeToDegrees(new Date(event.bookingDetails.from1)),
      end: convertTimeToDegrees(new Date(event.bookingDetails.to2)),
    }));
  
  //clearTimeout(get().intervalId);

  let newTimeoutId: ReturnType<typeof setTimeout> | null = null;
    if (activeMeeting) {
      const activeMeetingEndTime = new Date(activeMeeting.bookingDetails.to2).getTime() - now.getTime();
      newTimeoutId = setTimeout(() => {
        set({ activeMeeting: null });
        get().processEvents(); // Re-evaluate to update `nextMeeting` -> `activeMeeting`
      }, activeMeetingEndTime);
    }
  
    if (nextMeeting && !activeMeeting) {
      const nextMeetingStartTime = new Date(nextMeeting.bookingDetails.from1).getTime() - now.getTime();
      newTimeoutId = setTimeout(() => {
        get().processEvents(); // Re-evaluate to move `nextMeeting` -> `activeMeeting`
      }, nextMeetingStartTime);
    }
    set({
      nextMeeting,
      activeMeeting,
      upcomingEvents,
      upcomingEventsByDay,
      intervalsForAnalogClock,
      intervalId: newTimeoutId,
    });
  },
}));
