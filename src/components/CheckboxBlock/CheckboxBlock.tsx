import { ChangeEvent, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { typeOfDate } from "../../enums";
import {
    changeCurrentDay, changeDaysCurrentMonth, changeInputHourValue,
    changeInputMinuteValue, changeInputMonthValue, changeRadioChecked
} from "../../store/scheduleSlice";
import './CheckboxBlock.scss';

export const CheckboxBlock: FC = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.schedule);

    //Изменение типа повтора, каждый день или каждый день недели ...
    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeRadioChecked(e.target.value));
        if (state.radioChecked !== e.target.value) {
            dispatch(changeInputMonthValue(1))
            dispatch(changeInputHourValue(0))
            dispatch(changeInputMinuteValue(1))
            dispatch(changeCurrentDay(''))
        }
        currMonth();
    }
    //Проверка, количества дней в месяце и високосный ли год
    function currMonth() {
        if (new Date().getMonth() % 2 === 0) {
            dispatch(changeDaysCurrentMonth(30))
        }
        if (new Date().getMonth() % 2 !== 0) {
            dispatch(changeDaysCurrentMonth(31))
        }
        if (new Date().getMonth() === 2) {
            dispatch(changeDaysCurrentMonth(28))
        }
        if (new Date().getFullYear() + 4 % 2 === 0 && new Date().getMonth() === 2) {
            dispatch(changeDaysCurrentMonth(29))
        }
    }
    return (
        <div className='checkboxBlock'>
            <div className='checkboxItem'>
                <label htmlFor='daily'>Daily</label>
                <input id='daily' type="radio" value={typeOfDate.Daily} name='time'
                    checked={state.radioChecked === typeOfDate.Daily ? true : false} onChange={handleRadioChange} />
            </div>
            <div className='checkboxItem'>
                <label htmlFor='weekly'>Weekly</label>
                <input id='weekly' type="radio" value={typeOfDate.Weekly} name='time'
                    checked={state.radioChecked === typeOfDate.Weekly ? true : false} onChange={handleRadioChange} />
            </div>
            <div className='checkboxItem'>
                <label htmlFor='monthly'>Monthly</label>
                <input id='monthly' type="radio" value={typeOfDate.Monthly} name='time'
                    checked={state.radioChecked === typeOfDate.Monthly ? true : false} onChange={handleRadioChange} />
            </div>
            <div className='checkboxItem'>
                <label htmlFor='once'>Once</label>
                <input id='once' type="radio" value={typeOfDate.Once} name='time'
                    checked={state.radioChecked === typeOfDate.Once ? true : false} onChange={handleRadioChange} />
            </div>
            <div className='checkboxItem'>
                <label htmlFor='custom'>Custom</label>
                <input id='custom' type="radio" value={typeOfDate.Custom} name='time'
                    checked={state.radioChecked === typeOfDate.Custom ? true : false} onChange={handleRadioChange} />
            </div>
        </div>
    )
}