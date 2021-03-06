  import React from 'react';

import * as util from "../../utils/util";
import * as styles from "../../utils/defaultStyles";

const LaunchArticle = (props) => {
  const { mission } = props;
  return (
    <article className="relative my-6 px-5 py-4 rounded-md overflow-hidden bg-slate-50 shadow-sm">
      <header className="relative grid gap-2 grid-cols-3 grid-rows-2 bg-slate-300 p-5 -m-5 mb-10">
        {mission.links.patch.small && (
          <img className="object-scale-down h-40 w-40 row-span-2" src={mission.links.patch.small} alt={`${mission.name} mission patch`} />
        )}
        <h3 className="col-span-2 sm:text-2xl md:text-2xl xl:text-3xl font-bold text-slate-700 flex items-end">{mission.name}</h3>
        <div className="col-span-2 items-top">
          <span className="text-slate-500 bg-slate-200 px-1 rounded-sm inline-block">
            {mission.flight_number}
          </span>
        </div>
        <button className="absolute -bottom-5 right-2 h-10 w-10 rounded-full bg-rose-50 shadow-lg" title="Favorite this mission">❤️</button>
      </header>
      <span className="block text-md font-bold text-slate-600 -mt-6 mb-3 -ml-1">⚙️ Specs</span>
      <div className={styles.inlineItem}><strong>Launch date</strong>{util.getFormattedDate(mission.date_utc, mission.date_precision)}</div>
      {!props.isFutureLaunch &&
        <div className={styles.inlineItem}><strong>Mission status</strong>{mission.success ? (
          <span className={`!bg-emerald-200 !text-emerald-600 ${styles.label}`}>✅ Successful</span>
        ) : (
          <span className={`!bg-rose-200 !text-rose-600 ${styles.label}`}>❌ Failure</span>
        )}
        </div>
      }
      <div className={styles.inlineItem}><strong>Rocket</strong>{mission.rocket.name}</div>
      <div className={styles.inlineItem}><strong>Launchpad</strong>{mission.launchpad.name}</div>
      {(!props.isFutureLaunch && mission.details) && (
        <>
          <span className="block text-md font-bold text-slate-600 mt-5 -mb-1 -ml-1">🗒️ Summary</span>
          <div className={`text-sm leading-6 mt-5 ${styles.inlineItem}`}>{mission.details}</div>
        </>
      )}
    </article>
  );
}

export default LaunchArticle;