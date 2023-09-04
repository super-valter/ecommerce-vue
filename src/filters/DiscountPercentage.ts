import { MoneyFilter } from "./money";

export function DiscountPercentage(valueA: number | undefined , valueB: number | undefined, useMoneyFilter: boolean = true) {
    if (valueA === undefined || valueB === undefined) return '-'
        const totalValue = valueA - (valueB / 100) * valueA;

    if (!useMoneyFilter) return totalValue;
    if (useMoneyFilter) return MoneyFilter(totalValue);

}
