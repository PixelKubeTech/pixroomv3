import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";

const IncDecCounter = () => {
    const [counter, setCounter] = useState(0)
    const [disableDec, setDisableDec] = useState(true)

    const handleIncrement = () => {
        setCounter(counter + 1)
        if (counter > 0)
            setDisableDec(false)
    };

    const handleDecrement = () => {
        setCounter(counter - 1)
        if (counter == 1)
            setDisableDec(true)

    };


    return (
        <ButtonGroup size="small" aria-label="small outlined button group">
            <Button disabled={disableDec} onClick={handleDecrement}>-</Button>
            <Button disabled>{counter}</Button>
            <Button onClick={handleIncrement}>+</Button>
        </ButtonGroup>
    );

}
export default IncDecCounter;
