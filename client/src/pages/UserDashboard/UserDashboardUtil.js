export function sortData(dataSet, sort) {
  let sortedData;
  console.log(dataSet);
  switch (sort.justOne) {
    case null:
      sortedData = dataSet;
      break;
    case "redeemed":
      sortedData = dataSet.filter((nodeItem) => nodeItem.redeemed);
      break;
    default:
      sortedData = dataSet.filter(
        (nodeItem) => nodeItem.contract.type === sort.justOne
      );
      break;
  }
  switch (sort.sort) {
    case "expire":
    case "create":
      sortedData.sort((first, second) => {
        let firstDate, secondDate;
        if (sort.sort === "expire") {
          firstDate = first.expireDate;
          secondDate = second.expireDate;
        } else {
          firstDate = first.activeDate;
          secondDate = second.activeDate;
        }

        let firstExp = new Date(firstDate);
        let secondExp = new Date(secondDate);
        if (firstExp < secondExp) {
          return !sort.asc ? -1 : 1;
        } else if (firstExp > secondExp) {
          return !sort.asc ? 1 : -1;
        } else {
          return 0;
        }
      });

      break;
    case "businessName":
      sortedData.sort((first, second) => {
        let firstName = first._node
          ? first._node._business.businessName
          : first.name;
        let secondName = second._node
          ? second._node._business.businessName
          : second.name;
        if (firstName.toUpperCase() < secondName.toUpperCase()) {
          return !sort.asc ? -1 : 1;
        } else if (firstName > secondName) {
          return !sort.asc ? 1 : -1;
        } else {
          return 0;
        }
      });
      break;
    default:
      break;
  }

  /* push expired stuff to the bottom */

  sortedData.sort((first, second) => {
    if (first.redeemed) {
      return 1;
    } else if (second.redeemed) {
      return -1;
    } else {
      return 0;
    }
  });
  return sortedData;
}
