import React from 'react';
import './App.css';
import GroupControl from './components/GroupControl/GroupControl';

import { type IOption } from './components/GroupControl/interfaces';

function App() {
  const values:IOption[] = [
    {
      label: '32 сезон',
      value: '32 сезон'
    },
    {
      label: 'TodoGit',
      value: 'TodoGit'
    },
  ]
  
  const label = 'Вариант 1';
  
  const selected = 1;
  
  return (
    <div className="App">
      <div className="w-25 m-auto mt-5">
        <GroupControl label={label} selected={selected} values={values} />
        <GroupControl label={'Вариант 2'} selected={0} values={[]} />
      </div>
    </div>
  );
}

export default App;
