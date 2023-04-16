import { useState } from "react";

type CheckboxProps = {
  checked: boolean;
  children: React.ReactNode;
};

const Checkbox = ({ checked = false, children }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <li>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      <label>{children}</label>
    </li>
  );
};

export default Checkbox;
