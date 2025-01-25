export const displayPriceInRupees = (price) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price)
}

export const displayPriceInTaka = (price) => {
    return new Intl.NumberFormat('bn-BD', {
        style: 'currency',
        currency: 'BDT'
    }).format(price);
};