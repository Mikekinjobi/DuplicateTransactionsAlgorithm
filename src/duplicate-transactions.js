function findDuplicateTransactions(transactions) {
  let transactionsCopy = transactions.slice();

  transactionsCopy.sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  let millisecondsInOneMinute = 60000;

  let groupedArray = transactionsCopy.reduce((accTransactions, transaction) => {
    for (let i = 0; i < accTransactions.length; i++) {
      let accTransactionsTime = new Date(transaction.time).getTime();

      if (
        accTransactions[i].some(
          (purchase) =>
            transaction.sourceAccount === purchase.sourceAccount &&
            transaction.targetAccount === purchase.targetAccount &&
            transaction.amount === purchase.amount &&
            transaction.category === purchase.category &&
            accTransactionsTime / millisecondsInOneMinute -
              new Date(purchase.time).getTime() / millisecondsInOneMinute <
              1
        )
      ) {
        accTransactions[i].push(transaction);
        return accTransactions;
      }
    }
    accTransactions.push([transaction]);
    return accTransactions;
  }, []);

  groupedArray = groupedArray.filter((x) => x.length > 1);
  return groupedArray;
}
export default findDuplicateTransactions;
