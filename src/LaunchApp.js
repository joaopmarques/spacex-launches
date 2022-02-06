import React, { useState, useEffect, useRef } from "react";

import Launches from "./components/Launches";
import LaunchFilter from "./components/LaunchFilter";
import InfoVisibility from "./components/InfoVisibility";

// Import utilities
import * as query from "./utils/query";

function App() {

  // State management
  const [scrollNoticeVisibility, setScrollNoticeVisibility] = useState(true);
  const [launchCap, setLaunchCap] = useState(4);
  const [filterShowFuture, setFilterShowFuture] = useState(true);
  const [filterShowPast, setFilterShowPast] = useState(true);
  const [filterShowSuccessful, setFilterShowSuccessful] = useState(true);
  const [filterShowFailed, setFilterShowFailed] = useState(true);

  // Set a ref to this container
  const sectionRef = useRef();

  // Deal with side effects
  useEffect(() => {
    // Assign ref to constant to prevent cleanup mishaps
    const curRef = sectionRef.current;

    // Scrolling detection logic
    const handleScroll = () => {
      // Stop making requests if the limit has changed
      if (launchCap < query.QUERY_LIMIT) {
        if (curRef) {
          const { scrollTop, scrollHeight, clientHeight } = curRef;
          if (scrollHeight - scrollTop === clientHeight) {
            setLaunchCap(launchCap + 2);
            setTimeout(() => setScrollNoticeVisibility(false), 3000);
          }
        }
      }
    }

    // Add and cleanup scroll event listeners
    curRef.addEventListener('scroll', handleScroll);
    return () => {
      curRef.removeEventListener('scroll', handleScroll)
    };
  }, [launchCap]);

  // Handle filter button input logic
  const handleFilter = (expToEval) => {
    switch (expToEval) {
      case 'future':
        setFilterShowFuture(!filterShowFuture);
        break;
      case 'past':
        setFilterShowPast(!filterShowPast);
        break;
      case 'successful':
        setFilterShowSuccessful(!filterShowSuccessful);
        break;
      case 'failed':
        setFilterShowFailed(!filterShowFailed);
        break;
      default:
        break;
    }
  };

  return (
    <main className="flex flex-col h-screen overflow-hidden bg-slate-300">

      <header className="py-10 px-5 bg-gradient-to-r from-indigo-700 to-sky-600 border-b-4 border-yellow-500 shadow-lg z-10">
        <div className="container mx-auto">
          <h1 className="text-slate-200 sm:text-3xl lg:text-4xl">🛰️ SpaceX Launch Status Mission Control</h1>
        </div>
      </header>

      <InfoVisibility />

      <div className="w-screen flex flex-nowrap p-5 bg-sky-100 border-b border-sky-200">
        <div className="container mx-auto">
          <p className="block mb-2 text-md mr-5 font-bold text-sky-700">Filters</p>
          <div className="flex flex-col divide-y divide-sky-200">
            <div className="flex flex-row align-middle py-2">
              <span className="leading-8 shrink min-w-[25%] text-sm mr-5 text-sky-700">⏳ Timeframe</span>
              <div className="grow flex overflow-hidden rounded-full">
                <LaunchFilter
                  className={!filterShowPast && 'bg-white text-sky-500 hover:bg-sky-200 active:bg-sky-300'}
                  filterType={filterShowPast}
                  handleFilter={handleFilter}
                  expression={'past'}
                />
                <LaunchFilter
                  className={`border-l border-sky-600 ${!filterShowFuture && 'bg-white text-sky-500 hover:bg-sky-200 active:bg-sky-300'}`}
                  filterType={filterShowFuture}
                  handleFilter={handleFilter}
                  expression={'future'}
                />
              </div>
            </div>
            <div className="flex flex-row align-middle py-2">
              <span className="leading-8 shrink min-w-[25%] text-sm mr-5 text-sky-700">💪 Status</span>
              <div className="grow flex overflow-hidden rounded-full">
                <LaunchFilter
                  className={!filterShowSuccessful && 'bg-white text-sky-500 hover:bg-sky-200 active:bg-sky-300'}
                  filterType={filterShowSuccessful}
                  handleFilter={handleFilter}
                  expression={'successful'}
                />
                <LaunchFilter
                  className={`border-l border-sky-600 ${!filterShowFailed && 'bg-white text-sky-500 hover:bg-sky-200 active:bg-sky-300'}`}
                  filterType={filterShowFailed}
                  handleFilter={handleFilter}
                  expression={'failed'}
                />
              </div>
            </div>
            <div className="flex flex-row align-middle py-2">
              <span className="leading-8 shrink min-w-[25%] text-sm mr-5 text-sky-700">📆 Date Interval</span>
              <div className="grow flex overflow-hidden rounded-full">
                calendar goes here
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={sectionRef} className="h-100 overflow-x-hidden overflow-scroll container bg-slate-100 mx-auto mb-auto flex flex-col md:flex-row flex-auto flex-grow">
        {filterShowFuture && (
          <Launches
            launchCap={launchCap}
            isFutureLaunch={true}
            showSuccesses={filterShowSuccessful}
            showFailures={filterShowFailed}
          />
        )}
        {filterShowPast && (
          <Launches
            launchCap={launchCap}
            isFutureLaunch={false}
            showSuccesses={filterShowSuccessful}
            showFailures={filterShowFailed}
          />
        )}
        {!filterShowFuture && !filterShowPast && (
          <div className="block grow p-10">
            <p className="text-md text-center text-slate-700">
              🤷🤷‍♂️🤷‍♀️<br></br>
              What is the present? A thin interval between past and future?<br></br>
              A moment of introspection and inner peace?<br></br>
              <strong className="mt-2 block">Please choose a broader timeframe...</strong>
            </p>
          </div>
        )}
      </div>

      {scrollNoticeVisibility && (
        <aside className="fixed shadow-2xl z-20 bottom-10 left-0 block py-4 px-20 rounded-tr-3xl rounded-br-3xl text-sm font-bold text-slate-200 bg-slate-800">
          ⬇️ Scroll down to check more launches!
        </aside>
      )}

    </main>
  );
}

export default App;
