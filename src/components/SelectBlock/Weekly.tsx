import { FC } from "react";
import { dayOfWeek, typeOfDate } from "../../enums";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeCurrentDay } from "../../store/scheduleSlice";
import { ISelectBlock } from "./SelectBlock";


export const Weekly: FC<ISelectBlock> = ({ handleInputMinutesChange, handleInputChange }: ISelectBlock) => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.schedule);
    return (
        <>
            {state.radioChecked === typeOfDate.Weekly && (
                <>
                    <select onChange={(e) => dispatch(changeCurrentDay(e.target.value))}>
                        <option>Select day</option>
                        <option value='1'>{dayOfWeek.Monday}</option>
                        <option value='2'>{dayOfWeek.Tuesday}</option>
                        <option value='3'>{dayOfWeek.Wednesday}</option>
                        <option value='4'>{dayOfWeek.Thursday}</option>
                        <option value='5'>{dayOfWeek.Friday}</option>
                        <option value='6'>{dayOfWeek.Saturday}</option>
                        <option value='0'>{dayOfWeek.Sunday}</option>
                    </select>
                    <label htmlFor='weeklyHours'>Hours</label>
                    <input disabled={!state.currentDay ? true : false} id='weeklyHours' type='number' min='-1' value={state.inputHourValue} onChange={(e) => handleInputChange(e, 23)} />
                    <label htmlFor='eachMinutes'>Each Minutes</label>
                    <input disabled={!state.currentDay ? true : false} id='eachMinutes' type='number' min='-1' value={state.inputMinutesValue} onChange={handleInputMinutesChange} />

                </>
            )}
        </>
    )
}