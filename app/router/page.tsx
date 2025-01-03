'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/app/store/appStore';
import { useRouter, useSearchParams } from 'next/navigation';

const HomePage: React.FC = () => {
  const { macaddress, fetchEvents, setMacAddress, determineLandingPage } = useAppStore();
  const searchParams = useSearchParams();
  useEffect(() => {
    const macAddress = searchParams.get('macaddress');

    if (macAddress && typeof macAddress === 'string' && macaddress !== macAddress) {
      setMacAddress(macAddress);
      fetchEvents().then(() => {
        determineLandingPage(); 
      });
    } else if (macaddress) {
      determineLandingPage(); 
    }
  }, [macaddress, searchParams, setMacAddress, fetchEvents]);

  return (
    <div>
      <h1>Welcome</h1>
      {macaddress ? (
        <p>Using MAC Address: {macaddress}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomePage;
