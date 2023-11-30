import React, {FC, memo} from 'react';
import './style.scss';
import { type IOption } from '../../interfaces';

interface IGroupControlBtns {
  setShow: (value: boolean) => void;
  show: boolean;
  options: IOption[];
  selectedOption: IOption | null;
  removeOption: (value: IOption) => void;
}
const GroupControlBtns: FC<IGroupControlBtns> = ({selectedOption, setShow, show, options, removeOption}) => {
  
  return (
    <div className="control-group">
      {options.length > 1 &&
        selectedOption &&
        <i className="fa-Trash icon" data-role="remove-btn" onClick={() => removeOption(selectedOption)} />
      }
      <i className="fa-chevron-down icon" data-expanded={options.length && show} onClick={() => setShow(!show)} />
    </div>
  );
};

export default memo(GroupControlBtns);