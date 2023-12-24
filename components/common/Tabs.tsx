import { useEffect, useRef, useState } from 'react';




export default function Tabs({ tabsData,spaceDetails }: any) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef: any = useRef([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener('resize', setTabPosition);

    return () => window.removeEventListener('resize', setTabPosition);
  }, [activeTabIndex]);

  return (
    <div className='mt-4'>
      <div className="relative">
        <div className="flex justify-between border-b" style={{ borderColor: "#dee2e6" }}>
          {tabsData.map((tab: any, idx: number) => {
            return (
              <button
                key={idx}
                ref={(el) => (tabsRef.current[idx] = el)}
                className={`pt-2 pb-3 px-4 " ${activeTabIndex !== idx && "opacity-30"}`}
                onClick={() => setActiveTabIndex(idx)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <span
          className="absolute bottom-0 block h-1 bg-primary transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>
      <div className="py-0 overflow-y-auto">
        {tabsData.map((data: any, idx: number) => {
          if (idx === activeTabIndex) return <data.component key={idx} spaceDetails = {spaceDetails} />
        })}
      </div>
    </div>
  );
}
