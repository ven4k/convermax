import { FC } from "react"
import { useAppSelector } from "../../store/hooks";
import { typeOfDate } from "../../enums";
import { ISelectBlock } from "./SelectBlock";



export const Daily: FC<ISelectBlock> = ({ handleInputMinutesChange, handleInputChange }: ISelectBlock) => {
    const state = useAppSelector(state => state.schedule);

    return (
        <>
            {state.radioChecked === typeOfDate.Daily && (
                <>
                    <label htmlFor='dailyHour'>Hours</label>
                    <input type='number' id='dailyHour' min='-1' value={state.inputHourValue} onChange={(e) => handleInputChange(e, 23)} />
                    <label htmlFor='eachMinutes'>Each Minutes</label>
                    <input id='eachMinutes' type='number' min='-1' value={state.inputMinutesValue} onChange={handleInputMinutesChange} />
                    
                </>
            )}
        </>
    )
}