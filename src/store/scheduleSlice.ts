import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type initStateType = {
    radioChecked: string,
    currentDay: string,
    daysCurrentMonth: number,
    inputMonthValue: number,
    inputHourValue: number,
    inputMinutesValue: number,
    cronString: string[],
    dateCron: string,
    dateValue: string
}


const initialState: initStateType = {
    radioChecked: '',
    currentDay: '',
    daysCurrentMonth: 31,
    inputMonthValue: 1,
    inputHourValue: 0,
    inputMinutesValue: 1,
    cronString: ['* * * * *'],
    dateCron: '',
    dateValue: '',
}


export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        changeRadioChecked: (state, action: PayloadAction<string>) => {
            state.radioChecked = action.payload
        },
        changeInputMinuteValue: (state, action: PayloadAction<number>) => {
            state.inputMinutesValue = action.payload
        },
        changeInputHourValue: (state, action: PayloadAction<number>) => {
            state.inputHourValue = action.payload
        },
        changeInputMonthValue: (state, action: PayloadAction<number>) => {
            state.inputMonthValue = action.payload
        },
        changeCurrentDay: (state, action: PayloadAction<string>) => {
            state.currentDay = action.payload
        },
        changeDaysCurrentMonth: (state, action: PayloadAction<number>) => {
            state.daysCurrentMonth = action.payload
        },
        changeCronString: (state, action: PayloadAction<string>) => {
            if(state.cronString[1] === action.payload){
                state.cronString.reverse();
            }
            if (!state.cronString.includes(action.payload)) {
                state.cronString.unshift(action.payload);
            }

            state.cronString.splice(2);
        },
        changeDateCron: (state, action: PayloadAction<string>) => {
            state.dateCron = action.payload
        },
        changeDateValue: (state, action: PayloadAction<string>) => {
            state.dateValue = action.payload
        }
    },
})
export const { changeRadioChecked, changeInputMinuteValue, changeInputHourValue,
    changeInputMonthValue, changeCurrentDay, changeDaysCurrentMonth, changeCronString, changeDateCron, changeDateValue } = scheduleSlice.actions; 