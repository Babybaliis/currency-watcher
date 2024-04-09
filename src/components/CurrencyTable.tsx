import React, {useEffect, useMemo, useState} from 'react';
import api from '../api/CurrencyApi';
import {StyledTable, Th} from './CurrencyTableStyle';
import {CurrencyData, MinRowRate, RowRate} from "../../Types";
import CurrencyRow from "./CurrencyRow";


const DataTable: React.FC = () => {
    const rowNames = ['RUB/CUPCAKE', 'USD/CUPCAKE', 'EUR/CUPCAKE', 'RUB/USD', 'USD/EUR', 'EUR/USD'];
    const markets = ['RUB', 'USD', 'EUR'];

    const [first, setFirst] = useState<CurrencyData>();
    const [second, setSecond] = useState<CurrencyData>();
    const [third, setThird] = useState<CurrencyData>();
    const [minRowRates, setMinRowRates] = useState<MinRowRate[]>([])

    useEffect(() => {
        const fetchData = () => {
            api.getFirst(res => setFirst(res));
            api.getSecond(res => setSecond(res));
            api.getThird(res => setThird(res));
        };

        fetchData();
    }, []);

    const mapRate = (ind: number) => (item: CurrencyData | undefined, index: number, array: (CurrencyData | undefined)[]) => {
        const isCupCake = Math.floor((ind / markets.length)) == 0
        const marketInd = ind % markets.length
        const market = markets[marketInd]

        let rate = item?.rates[market]
        if (!isCupCake) {
            const nextInd = ind === rowNames.length - 1 ? marketInd - 1 : marketInd + 1
            const nextMarket = markets[nextInd]
            rate = (item?.rates[market] / item?.rates[nextMarket])
        }
        if (!!rate) {
            rate = rate.toFixed(2)
        }
        return rate
    }

    const rateRows = useMemo(() => {
        return rowNames.map((value, ind) => (
                {
                    rowName: value,
                    rates: [first, second, third].map(mapRate(ind))
                } as RowRate
            )
        )
    }, [first, second, third]);

    const findMinIndex = (minIndex: number, rate: string, index: number, array: string[]) =>
        parseFloat(rate) < parseFloat(array[minIndex]) ? index : minIndex


    useEffect(() => {
        setMinRowRates(
            rateRows.map(value => ({
                    rowName: value.rowName,
                    indexRate: value.rates.reduce(findMinIndex, 0)
                } as MinRowRate)
            )
        );
    }, [rateRows]);

    return (
        <StyledTable>
            <thead>
            <tr>
                <Th>Pair name / market</Th>
                <Th>First</Th>
                <Th>Second</Th>
                <Th>Third</Th>
            </tr>
            </thead>
            <tbody>
            {rateRows.map((value, ind) =>
                <CurrencyRow minRowRates={minRowRates} value={value} ind={ind}/>
            )}
            </tbody>
        </StyledTable>
    );
};

export default DataTable;
