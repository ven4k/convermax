import { FC } from "react"
import { useAppSelector } from "../../store/hooks";
import { typeOfDate } from "../../enums";
import { ISelectBlock } from "./SelectBlock";


export const Monthly: FC<ISelectBlock> = ({ handleInputMinutesChange, handleInputChange }: ISelectBlock) => {
    const state = useAppSelector(state => state.schedule);
    return (
        <>
            {state.radioChecked === typeOfDate.Monthly && (
                <>
                    <label htmlFor='dayOfMonth'>Every day of month</label>
                    <input type='number' id='dayOfMonth' min='1' onChange={(e) => handleInputChange(e, state.daysCurrentMonth)} value={state.inputMonthValue} />
                    <label htmlFor='monthHours'>Hours</label>
                    <input type='number' min='-1' value={state.inputHourValue}
                        onChange={(e) => handleInputChange(e, 23)} />
                    <label htmlFor='eachMinutes'>Each Minutes</label>
                    <input id='eachMinutes' type='number' min='-1' value={state.inputMinutesValue} onChange={handleInputMinutesChange} />
                </>
            )}
        </>
    )
}