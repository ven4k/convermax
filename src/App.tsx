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
  const [indexLoaded, setIndexLoaded] = useState<number>(0)
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

  const cronRegExp = new RegExp(/^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/);

  const handleClickSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIndexLoaded(0);
    setIsRightRegExp(true)
    if (state.radioChecked === typeOfDate.Custom) {
      dispatch(changeCronString(customInputValue))
    }
    if (state.radioChecked === typeOfDate.Once) {
      dispatch(changeCronString(state.dateCron))
    }

    //ДЕНЬ
    switch (state.radioChecked) {
      //День
      case typeOfDate.Daily: {
        //Каждый день в * часов и * минут
        if (state.inputHourValue >= 0 && state.inputMinutesValue >= 0) {
          dispatch(changeCronString(`${state.inputMinutesValue} */${state.inputHourValue} * * *`));
          return setCustomInputValue(`${state.inputMinutesValue} */${state.inputHourValue} * * *`);
        }
        //Каждый день, каждые * часов
        if (state.inputHourValue >= 0 && state.inputMinutesValue < 0) {
          dispatch(changeCronString(`* */${state.inputHourValue} * * *`))
          return setCustomInputValue(`* */${state.inputHourValue} * * *`);
        }
        //Каждый день, каждые * минут
        if (state.inputHourValue < 0 && state.inputMinutesValue >= 0) {
          dispatch(changeCronString(`*/${state.inputMinutesValue} * * * *`))
          return setCustomInputValue(`*/${state.inputMinutesValue} * * * *`);
        }
        //Каждый день, каждую минуту
        if (state.inputHourValue < 0 && state.inputMinutesValue < 0) {
          dispatch(changeCronString(`* * * * *`))
          return setCustomInputValue(`* * * * *`)
        }
        break
      }
      //Неделя
      case typeOfDate.Weekly: {
        //Каждый * день недели в * часов и в * минут
        if (state.inputHourValue >= 0 && state.inputMinutesValue >= 0) {
          dispatch(changeCronString(`${state.inputMinutesValue} ${state.inputHourValue} * * */${state.currentDay}`))
          return setCustomInputValue(`${state.inputMinutesValue} ${state.inputHourValue} * * */${state.currentDay}`)
        }
        //Каждый * день недели, каждые * часов
        if (state.inputHourValue >= 0 && state.inputMinutesValue < 0) {
          dispatch(changeCronString(`* */${state.inputHourValue} * * */${state.currentDay}`));
          return setCustomInputValue(`* */${state.inputHourValue} * * */${state.currentDay}`)

        }
        //Каждый * день недели, каждые * минут
        if (state.inputHourValue < 0 && state.inputMinutesValue >= 0) {
          dispatch(changeCronString(`*/${state.inputMinutesValue} * * * */${state.currentDay}`));
          return setCustomInputValue(`*/${state.inputMinutesValue} * * * */${state.currentDay}`)

        }
        //Каждую минуту в * день недели
        if (state.inputHourValue < 0 && state.inputMinutesValue < 0) {
          dispatch(changeCronString(`* * * * */${state.currentDay}`));
          return setCustomInputValue(`* * * * */${state.currentDay}`)

        }
        break
      }
      //Месяц
      case typeOfDate.Monthly: {
        //Каждый * день месяца в * часов и * минут
        if (state.inputHourValue >= 0 && state.inputMinutesValue >= 0) {
          dispatch(changeCronString(`${state.inputMinutesValue} ${state.inputHourValue} */${state.inputMonthValue} * *`));
          return setCustomInputValue(`${state.inputMinutesValue} ${state.inputHourValue} */${state.inputMonthValue} * *`)

        }
        //Каждый * день месяца, каждые * часов
        if (state.inputHourValue > 0 && state.inputMinutesValue < 0) {
          dispatch(changeCronString(`* */${state.inputHourValue} */${state.inputMonthValue} * *`))
          return setCustomInputValue(`* */${state.inputHourValue} */${state.inputMonthValue} * *`)

        }
        //Каждый * день недели, каждые * минут
        if (state.inputHourValue < 0 && state.inputMinutesValue >= 0) {
          dispatch(changeCronString(`*/${state.inputMinutesValue} * */${state.inputMonthValue} * *`))
          return setCustomInputValue(`*/${state.inputMinutesValue} * */${state.inputMonthValue} * *`)

        }
        //Каждую минуту в * день месяца
        if (state.inputHourValue < 0 && state.inputMinutesValue < 0) {
          dispatch(changeCronString(`* * */${state.inputMonthValue} * *`));
          return setCustomInputValue(`* * */${state.inputMonthValue} * *`);
        }
        break
      }
      default: {
        return console.log(state.cronString)
      }
    }
    console.log('312')

  }

  const handleLoadClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIndexLoaded(1)
  }
  const handleCustomInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    cronRegExp.test(e.target.value) ? setIsRightRegExp(true) : setIsRightRegExp(false);
    setCustomInputValue(e.target.value);
  }
  return (
    <div className='app'>
      <form>
        <div className='schedule'>
          <CheckboxBlock />
          <SelectBlock handleInputChange={handleInputChange} handleInputMinutesChange={handleInputMinutesChange} />
        </div>
        <span className='description'>* -1 in inputs = empty field</span>
        <span className='description'>* To change the cron input, select the custom radio button</span>
        {indexLoaded === 1 && (
          <span className='prevSchedule'>Loaded previous schedule</span>
        )}
        <div className='btnsBlock'>
          <button onClick={handleLoadClick} disabled={state.cronString.length<2}>Load</button>
          <button onClick={handleClickSave} 
          disabled={(state.radioChecked === typeOfDate.Custom && !isRightRegExp) 
          || (state.radioChecked === typeOfDate.Weekly && !state.currentDay) 
          || state.radioChecked === typeOfDate.Once && !state.dateCron }>Save</button>
        </div>
        <input type='text' disabled={state.radioChecked !== typeOfDate.Custom} value={(state.radioChecked === typeOfDate.Custom)
          ? customInputValue : state.cronString[indexLoaded]} id='cronText'
          onChange={handleCustomInputChange} />
        {!isRightRegExp  && (
          <span className='wrongCron'>Wrong cron expression!</span>
        )}
      </form>
    </div>
  )
}