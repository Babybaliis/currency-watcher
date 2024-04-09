import React from 'react';
import {Td} from "./CurrencyTableStyle";
import {MinRowRate, RowRate} from "../../Types";

interface CurrencyRowProps {
    minRowRates: MinRowRate[],
    value: RowRate,
    ind: number
}

const CurrencyRow = ({minRowRates, ind, value}: CurrencyRowProps) => {
    const minRowRate = minRowRates[ind]
    const {rowName, rates} = value
    return (
        <tr>
            <Td>{rowName}</Td>
            {rates.filter(rate => !!rate)
                .map((rate, i) => {
                        const isMin = !!minRowRate && minRowRate.indexRate === i
                        return (
                            <Td key={`td_${i}_${rate}_${isMin}`} isMin={isMin}>
                                {rate}
                            </Td>
                        )
                    }
                )}
        </tr>
    )
};
export default CurrencyRow;