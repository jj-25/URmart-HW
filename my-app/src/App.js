import React, {useState} from 'react';
import './App.scss';
import {transMonth} from './tool';

const App = () => {
  const thisYear = new Date().getFullYear();
  const [inputYear, setInputYear] = useState(thisYear);
  const [isShow, setIsShow] = useState(false);
  const [isError, setIsError] = useState(false);

  const checkYear = value =>{
    // 未輸入或輸入1~9999則pass
    const res = !((value.match(/^[0-9]{0,4}$/g) && Number(value) > 0) || !value);
    setIsError(res);
  };

  const showCalendar = () =>{
    if(!isError){
      let year = document.getElementById('input-year').value;
      setInputYear(year || thisYear);
      setIsShow(true);
    };
  };
  const GenerateCalendar = () => {
    let i=1;
    const res = [];
    while(i<=12){
      res.push(
        <Calendar 
          key={`calendar${i}`}
          propsYear={inputYear}
          propsMonth={`${i}`}
        />
      );
      i++;
    }
    return res;
  }
  return(
    <div className="app-box">
      <div className="year-box">
        <input
          id="input-year"
          maxLength="4" 
          type="text" 
          placeholder={thisYear}
          className={isError?'error-input':''}
          onChange={e=>checkYear(e.target.value)}
          onKeyUp={(e) => e.key==="Enter"?showCalendar():null}
        />
        <button onClick={showCalendar}>Show</button>
      </div>
      {isError?<div className="error-msg">請輸入1 ~ 9999</div>:null}
      {isShow?
        <div className="calendar-box">
          {GenerateCalendar()}
        </div>
      :null}
    </div>
  )
};

const Calendar = ({propsYear,propsMonth}) => {
  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth() + 1;
  const daysInMonth = (propsYear,propsMonth) => new Date(propsYear, propsMonth, 0).getDate();
  const CreateDays = (propsYear,propsMonth,daysInMonth,firstDay) =>{
    const res = [];
    for(let i=1; i<=daysInMonth; i++){
      if(i<=firstDay){
        res.unshift(<li key={`hidden${i}`}className="hidden"></li>);
      };
      let today = (
          Number(propsYear) === thisYear && 
          Number(propsMonth) === thisMonth && 
          i === new Date().getDate()
      );
      res.push(
        <li key={`day${i}`} style={today?{background:'#157ca580'}:null}>{i}</li>
      );
    }
    return res;
  };
  return (
    <div className="calendar">
      <div className="caption">
        <span>{transMonth(propsMonth)}</span>
      </div>
      <ul className="weekdays-row">
        <li>S</li>
        <li>M</li>
        <li>T</li>
        <li>W</li>
        <li>T</li>
        <li>F</li>
        <li>S</li>
      </ul>
      <ul className="week">
        {CreateDays(propsYear,propsMonth,daysInMonth(propsYear,propsMonth),new Date(propsYear,(propsMonth-1),1).getDay())}
      </ul>
    </div>
  );
}

export default App;
