class Utils{

    verifyAscendingOrder(arrayPrices) {
        for (let i = 0; i < arrayPrices.length - 1; i++) {
            if (arrayPrices[i] > arrayPrices[i + 1]) {
                return false;
            }
        }
        return true;
    }

    verifyDescendingOrder(arrayPrices) {
        return arrayPrices.every((price, i) => 
            i === 0 || price <= arrayPrices[i - 1]);
    }
   

}

module.exports = new Utils();