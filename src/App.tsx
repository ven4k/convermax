import { ChangeEvent, MouseEvent, FC, useState } from 'react';
import { SelectBlock } from './components/SelectBlock/SelectBlock';
import { CheckboxBlock } from './components/CheckboxBlock/CheckboxBlock';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { changeInputHourValue, changeInputMinuteValue, changeInputMonthValue, changeCronString } from './store/scheduleSlice';
import { typeOfDate } from './enums';
import './App.scss';

export const App: FC = () => {
  const [customInputValue, setCustomInputValue] = useState<string>('* * * * *')
  const [isRightRegExp, setIsRightRegExp] = useState(true);

  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.schedule);



  //Изменение количества часов или дней 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, num: number) => {
    if (num === state.daysCurrentMonth) {
      Number(e.currentTarget.value) > num ? dispatch(changeInputMonthValue(num)) : dispatch(changeInputMonthValue(Number(e.target.value)));
    }
    if (num === 23) {
      Number(e.currentTarget.value) > num ? dispatch(changeInputHourValue(num)) : dispatch(changeInputHourValue(Number(e.target.value)))
    }
    return num
  }

  //Изменение количества минут
  const handleInputMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    return Number(e.currentTarget.value) > 59 ? dispatch(changeInputMinuteValue(59)) : dispatch(changeInputMinuteValue(Number(e.currentTarget.value)))
  }

  const handleClickSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //ДЕНЬ
    switch (state.radioChecked) {
      //День
      case typeOfDate.Daily: {
        //Каждый день в * часов и * минут
        if (state.inputHourValue >= 0 && state.inputMinutesValue >= 0) {
          dispatch(changeCronString(`${String(state.inputMinutesValue)} */${String(state.inputHourValue)} * * *`))
          return console.log(`${state.inputMinutesValue} */${state.inputHourValue} * * *`)
        }
        //Каждый день, каждые * часов
        if (state.inputHourValue >= 0 && state.inputMinutesValue < 0) {
          dispatch(changeCronString(`* */${String(state.inputHourValue)} * * *`))
          return console.log(`* */${state.inputHourValue} * * *`)
        }
        //Каждый день, каждые * минут
        if (state.inputHourValue < 0 && state.inputMinutesValue >= 0) {
          dispatch(changeCronString(`*/${String(state.inputMinutesValue)} * * * *`))
          return console.log(`*/${state.inputMinutesValue} * * * *`)
        }
        //Каждый день, каждую минуту
        if (state.inputHourValue < 0 && state.inputMinutesValue < 0) {
          dispatch(changeCronString(`* * * * *`))
          return console.log(`* * * * *`)
        }
        break
      }
      //Неделя
      case typeOfDate.Weekly: {
        //Каждый * день недели в * часов и в * минут
        if (state.inputHourValue >= 0 && state.inputMinutesValue >= 0) {
          dispatch(changeCronString(`${String(state.inputMinutesValue)} ${String(state.inputHourValue)} * * */${String(state.currentDay)}`))
          return console.log(`${state.inputMinutesValue} ${state.inputHourValue} * * */${state.currentDay}`)
        }
        //Каждый * день недели, каждые * часов
        if (state.inputHourValue >= 0 && state.inputMinutesValue < 0) {
          dispatch(changeCronString(`* */${String(state.inputHourValue)} * * */${String(state.currentDay)}`))
          return console.log(`* */${state.inputHourValue} * * */${state.currentDay}`)
        }
        //Каждый * день недели, каждые * минут
        if (state.inputHourValue < 0 && state.inputMinutesValue >= 0) {
          dispatch(changeCronString(`*/${String(state.inputMinutesValue)} * * * */${String(state.currentDay)}`));
          return console.log(`*/${state.inputMinutesValue} * * * */${state.currentDay}`)
        }
        //Каждую минуту в * день недели
        if (state.inputHourValue < 0 && state.inputMinutesValue < 0) {
          dispatch(changeCronString(`* * * * */${String(state.currentDay)}`));
          return console.log(`* * * * */${state.currentDay}`)
        }
        break
      }
      //Месяц
      case typeOfDate.Monthly: {
        //Каждый * день месяца в * часов и * минут
        if (state.inputHourValue >= 0 && state.inputMinutesValue >= 0) {
          dispatch(changeCronString(`${String(state.inputMinutesValue)} ${String(state.inputHourValue)} */${String(state.inputMonthValue)} * *`))
          return console.log(`${state.inputMinutesValue} ${state.inputHourValue} */${state.inputMonthValue} * *`);
        }
        //Каждый * день месяца, каждые * часов
        if (state.inputHourValue > 0 && state.inputMinutesValue < 0) {
          dispatch(changeCronString(`* */${String(state.inputHourValue)} */${String(state.inputMonthValue)} * *`))
          return console.log(`* */${state.inputHourValue} */${state.inputMonthValue} * *`);
        }
        //Каждый * день недели, каждые * минут
        if (state.inputHourValue < 0 && state.inputMinutesValue >= 0) {
          dispatch(changeCronString(`*/${String(state.inputMinutesValue)} * */${String(state.inputMonthValue)} * *`))
          return console.log(`*/${state.inputMinutesValue} * */${state.inputMonthValue} * *`);
        }
        //Каждую минуту в * день месяца
        if (state.inputHourValue < 0 && state.inputMinutesValue < 0) {
          dispatch(changeCronString(`* * */${String(state.inputMonthValue)} * *`))
          return console.log(`* * */${state.inputMonthValue} * *`);
        }
        break
      }
      default: {
        return console.log(state.cronString)
      }
    }

  }

  const handleLoadClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isRightRegExp) {
      console.log(customInputValue)
      return dispatch(changeCronString(customInputValue))
    }
  }
  const handleCustomInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cronRegExp = new RegExp(/^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/);
    cronRegExp.test(e.target.value) ? setIsRightRegExp(true) : setIsRightRegExp(false);
    setCustomInputValue(e.target.value)
  }
  return (
    <div className='app'>
      <form>
        <div className='schedule'>
          <CheckboxBlock />
          <SelectBlock handleInputChange={handleInputChange} handleInputMinutesChange={handleInputMinutesChange} />
        </div>
        <span className='description'>*-1 in inputs = empty field</span>
        <div className='btnsBlock'>
          <button disabled={state.radioChecked !== typeOfDate.Custom} onClick={handleLoadClick}>Load</button>
          <button onClick={handleClickSave}>Save</button>
        </div>
        <input type='text' value={customInputValue} id='cronText'
          disabled={state.radioChecked !== typeOfDate.Custom} onChange={handleCustomInputChange} />
        {!isRightRegExp && (
          <span className='wrongCron'>Wrong cron expression!</span>
        )} 
      </form>
    </div>
  )
}