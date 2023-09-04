export function MoneyFilter(value: number | undefined, removeCurrencyString = false) {
    if (value === undefined)  return ' - '
    if (value < 0) return ' - '

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    let data = formatter.format(value)

    if (removeCurrencyString) data = data.replace('R$', '').trim()

    return data
}
