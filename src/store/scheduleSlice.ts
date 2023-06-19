import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type initStateType = {
    radioChecked: string,
    onceDate: string,
    currentDay: string,
    daysCurrentMonth: number,
    inputMonthValue: number,
    inputHourValue: number,
    inputMinutesValue: number,
    cronString: string,
    customInputValue: string
}


const initialState: initStateType = {
    radioChecked: '',
    onceDate: '',
    currentDay: '',
    daysCurrentMonth: 31,
    inputMonthValue: 1,
    inputHourValue: 0,
    inputMinutesValue: 1,
    cronString: '',
    customInputValue: '* * * * *',
}


export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        changeRadioChecked: (state, action:PayloadAction<string>) => {
            state.radioChecked = action.payload
        },
        changeInputMinuteValue: (state, action:PayloadAction<number>) => {
            state.inputMinutesValue = action.payload
        },
        changeInputHourValue: (state, action:PayloadAction<number>) => {
            state.inputHourValue = action.payload
        },
        changeInputMonthValue: (state, action:PayloadAction<number>) => {
            state.inputMonthValue = action.payload
        },
        changeCurrentDay: (state, action:PayloadAction<string>) => {
            state.currentDay = action.payload
        },
        changeDaysCurrentMonth: (state, action:PayloadAction<number>) => {
            state.daysCurrentMonth = action.payload
        },
        changeCronString: (state, action:PayloadAction<string>) => {
            state.cronString = action.payload
        }
    },
})
export const { changeRadioChecked, changeInputMinuteValue, changeInputHourValue,
    changeInputMonthValue, changeCurrentDay, changeDaysCurrentMonth, changeCronString } = scheduleSlice.actions; 