import * as styles from "../../utils/defaultStyles";

const LaunchFilter = (props) => {  
  return (
    <button
      className={`${props.className} ${styles.button} flex-1`}
      onClick={() => props.handleFilter(props.expression)}
    >
      {props.filterType ? `Hide ${props.expression} launches` : `Show ${props.expression} launches`}
    </button>
  );

}

export default LaunchFilter;