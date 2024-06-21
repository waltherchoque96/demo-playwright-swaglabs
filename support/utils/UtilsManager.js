class Utils{

    verifyAscendingOrder(arrayPrices) {
        let isSorted = true;

        arrayPrices.some((price, i) => {
            if (i < arrayPrices.length - 1 && price > arrayPrices[i + 1]) {
                isSorted = false;
                return true; 
            }
            return false;
        });

        return isSorted;
    }

    verifyDescendingOrder(arrayPrices) {
        return arrayPrices.every((price, i) => 
            i === 0 || price <= arrayPrices[i - 1]);
    }

}

module.exports = new Utils();