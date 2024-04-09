export interface CurrencyRates {
    RUB: number;
    USD: number;
    EUR: number;

    [key: string]: any
}

export interface CurrencyData {
    rates: CurrencyRates;
    timestamp: number;
    base: string;
    date: string;
}

export interface RowRate {
    rowName: string,
    rates: string[]
}

export interface MinRowRate {
    rowName: string,
    indexRate: number
}