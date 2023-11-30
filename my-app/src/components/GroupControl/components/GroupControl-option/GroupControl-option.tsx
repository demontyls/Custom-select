import React, {FC, memo} from 'react';
import { type IOption } from '../../interfaces';

import './style.scss';

interface IGroupControlOption {
  option: IOption;
  selectedOption: IOption | null;
  setSelectedOption: (value: IOption) => void;
}
const GroupControlOption: FC<IGroupControlOption> = ({option, setSelectedOption, selectedOption}) => {
  const isActive = selectedOption?.value === option.value;
  
  return (
    <div
      className={`option ${isActive && 'active' }`}
      onClick={() => setSelectedOption(option)}>
      <span className="d-block mr-2">
        {option.label}
      </span>
      { isActive && <i className="fa-check icon"/> }
    </div>
  );
};

export default memo(GroupControlOption);