import { ChangeEvent, FC } from "react"
import { Daily } from "./Daily"
import { Weekly } from "./Weekly"
import { Monthly } from "./Monthly"
import { Once } from "./Once"
import './SelectBlock.scss';

export interface ISelectBlock {
    handleInputMinutesChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>, num: number) => void;
}
export const SelectBlock: FC<ISelectBlock> = ({ handleInputMinutesChange, handleInputChange }: ISelectBlock) => {
    return (
        <div className='selectBlock'>
            <Daily handleInputMinutesChange={handleInputMinutesChange} handleInputChange={handleInputChange} />
            <Weekly handleInputMinutesChange={handleInputMinutesChange} handleInputChange={handleInputChange} />
            <Monthly handleInputMinutesChange={handleInputMinutesChange} handleInputChange={handleInputChange} />
            <Once />
        </div>
    )
}