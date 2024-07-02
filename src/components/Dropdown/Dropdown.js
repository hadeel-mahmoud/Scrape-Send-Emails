import styles from "./Dropdown.module.css";

export const Dropdown = (props) => {
  return (
    <select
      className={styles.dropdown}
      defaultValue={"DEFAULT"}
      onChange={(event) => {
        props.onDropdownChange(event.target.value);
      }}
    >
      <option value={"DEFAULT"} disabled>
        {props.placeholder}
      </option>
      {props.data.map((option, index) => (
        <option key={index} value={index}>
          {/* attribute needs to be handled because the dropdown can take array of strings or objects */}
          {props.attribute ? option[props.attribute] : option}
        </option>
      ))}
    </select>
  );
};
