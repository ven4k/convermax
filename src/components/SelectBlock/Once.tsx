import { ChangeEvent, FC, useState } from "react";
import { typeOfDate } from "../../enums";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeCronString, changeDateCron, changeDateValue } from "../../store/scheduleSlice";



export const Once: FC = () => {
    const parser = require('cron-parser');
    const [date, setDate] = useState<string>(''); 
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.schedule);

    const OnceDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeDateValue(e.target.value));
        let newTime = new Date(e.target.value);
        let interval = parser.parseExpression('* * * * *');
        let fields = JSON.parse(JSON.stringify(interval.fields));
        fields.hour = [newTime.getHours()];
        fields.minute = [newTime.getMinutes()];
        fields.dayOfWeek = [newTime.getDay()];
        fields.month = [newTime.getMonth()];
        let modifiedInterval = parser.fieldsToExpression(fields);
        let cronString = modifiedInterval.stringify();
        dispatch(changeDateCron(cronString));
        console.log(cronString)
      }
    return (
        <>
            {state.radioChecked === typeOfDate.Once && (
                <>
                    <label htmlFor='fulldate'>Choose Date</label>
                    <input type='datetime-local' id='fulldate' value={state.dateValue} onChange={OnceDateChange}/>
                </>
            )}
        </>
    )
}