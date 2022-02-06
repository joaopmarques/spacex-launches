import * as styles from "../../utils/defaultStyles";

const LaunchFilter = (props) => {  
  return (
    <button
      className={`${props.className} ${styles.button}`}
      onClick={() => props.handleFilter(props.timeExp)}
    >
      {props.filterShowTimePeriod ? `Hide ${props.timeExp} launches` : `Show ${props.timeExp} launches`}
    </button>
  );

}

export default LaunchFilter;