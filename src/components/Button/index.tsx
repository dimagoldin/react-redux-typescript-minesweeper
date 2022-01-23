import React from "react";
import { Cell, CellState, CellValue } from "../../types";

import './Button.scss';

interface CellButtonProps {
    cell: Cell
    colIndex: number
    rowIndex: number
    onClick(): void;
}

const Button: React.FC<CellButtonProps> = ({ cell, rowIndex, colIndex, onClick }) => {

    const renderContent = (): React.ReactNode => {
        if (cell.state === CellState.visible) {
            if (cell.value === CellValue.bomb) {
                return (<span role="img" aria-label="bomb">
                    💣
                </span>)
            }
        } else if (cell.state === CellState.flagged) {
            return (<span role="img" aria-label="flag">
                🚩
            </span>)
        }

        return null;
    }

    return <div className={`Button ${cell.state === CellState.visible ? "visible" : ""
        }`} onClick={onClick} >
        {renderContent()}
    </div>
}

export default Button;