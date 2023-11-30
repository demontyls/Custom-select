import React, { FC, useEffect, useRef, useState } from 'react';
import { type IOption, type IGroupControl} from './interfaces';

import GroupControlOption from './components/GroupControl-option/GroupControl-option';
import GroupControlBtns from './components/GroupControl-btns/GroupControl-btns';

import './style.scss'

const GroupControl:FC<IGroupControl> = ({label, values, selected}) => {
  const [options, setOptions] = useState<IOption[]>(values);
  const [isInvalid, setIsInvalid] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(values[selected] ?? null);
  const [inputValue, setInputValue] = useState( '');
  const [show, setShow] = useState(false);
  const wrapperRef: React.RefObject<HTMLDivElement> = useRef(null);
  
  const handlerSetOptions = (e: React.KeyboardEvent<HTMLInputElement> ) => {
    if (e.key === 'Enter') {
      const { value } = e.target as HTMLInputElement;
      const hasElem = Boolean(options.find(option => option.value === value));
      const emptyValue = !value;
      let option = {
        label: value,
        value: value
      } ;
      if (emptyValue || hasElem) {
        setIsInvalid(true);
      } else {
        setIsInvalid(false);
        setOptions([...options, option]);
        setInputValue('');
      }
    }
  }
  
  const hiddenDropDown = (e: any): void => {
    if (wrapperRef.current) {
      !wrapperRef.current.contains(e.target) && setShow(false);
    }
    
    if (wrapperRef.current) {
      !wrapperRef.current.contains(e.target) && setShow(false);
    }
  };
  
  useEffect(() => {
    setInputValue(values[selected]?.value ?? '');
    
    document.addEventListener('click', hiddenDropDown);
    return () => {
      document.removeEventListener('click', hiddenDropDown);
    };
  }, []);
  
  const removeOption = (elem: IOption) =>{
    const newOptions = options.filter(option => option.value !== elem.value);
    if (options.length === 2) {
      setSelectedOption(newOptions[0]);
      setInputValue(newOptions[0].value);
      setOptions(newOptions);
    } else {
      setOptions(newOptions);
      setSelectedOption(null);
      setInputValue('');
    }
  }
  
  const handlerSelectedOption = (elem: IOption) => {
    const isSelected = selectedOption?.value === elem.value;
    if (isSelected) {
      setInputValue('');
      setSelectedOption(null);
    } else {
      setInputValue(elem.value);
      setSelectedOption(elem);
    }
  }
  
  return (
    <div>
      <label className="mb-3">
        {label}
      </label>
      <div ref={wrapperRef} className="group-control">
        <div className="input-wrapper mb-3">
          <input
            placeholder="Введите название"
            value={inputValue}
            className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={(e) => handlerSetOptions(e) }
            onClick={() => setShow(!show)}
            onBlur={() => setInputValue(selectedOption?.value ?? '')}
          />
          <GroupControlBtns removeOption={removeOption} selectedOption={selectedOption} setShow={setShow} show={show} options={options} />
        </div>
        {show &&
          <div className="menu shadow">
            {options.map((option, i)=>
              <GroupControlOption key={i} option={option} selectedOption={selectedOption} setSelectedOption={handlerSelectedOption} />
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default GroupControl;