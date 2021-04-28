export function ParseUserData(data, theme) {
  let startDate = new Date(data.activeDate);
  let endDate = new Date(data.expireDate);
  let parsedData = {
    id: data._id,
    businessName: data._node._business.businessName,
    avatar: data._node._business.avatar,
    name: data._node.name,
    description: data._node.description,
    startDate: startDate,
    endDate: endDate,
  };
  parsedData = createMessage(data, theme, parsedData);
  return parsedData;
}

export function ParseData(data, theme) {
  let startDate = new Date(data.activeDate);
  let endDate = new Date(data.expireDate);
  let parsedData = {
    id: data._id,
    businessName: data.businessName,
    avatar: data.avatar,
    name: data.name,
    address: data.address,
    description: data.description,
    startDate: startDate,
    endDate: endDate,
  };
  parsedData = createMessage(data, theme, parsedData);
  return parsedData;
}

function createMessage(data, theme, parsedData) {
  parsedData.primary = (
    <>
      {parsedData.name} - {parsedData.businessName} -{" "}
      {data.contract.type.toUpperCase()}
    </>
  );
  switch (data.contract.type) {
    case "gift card":
      parsedData.background = theme.palette.giftcard;
      parsedData.secondary = (
        <>
          {`$${parseFloat(data.contract.remainingValue).toFixed(
            2
          )} / $${parseFloat(data.contract.value).toFixed(2)}`}
          <br />
          Expires:
          {parsedData.endDate.toDateString()}
          <br />
        </>
      );
      break;
    case "ticket":
      parsedData.background = theme.palette.ticket;
      parsedData.secondary = (
        <>
          Start date:
          {parsedData.startDate.toDateString()} @
          {parsedData.startDate.toLocaleTimeString("en-us")}
          <br />
          End date:
          {parsedData.endDate.toDateString()} @
          {parsedData.endDate.toLocaleTimeString("en-us")}
          <br />
        </>
      );
      break;
    case "coupon":
      parsedData.background = theme.palette.coupon;
      if (data.contract.unit === "percent") {
        parsedData.secondary = (
          <>
            {data.contract.value}% Off
            <br />
            Activated:
            {parsedData.startDate.toDateString()}
            <br />
            Expires:
            {parsedData.endDate.toDateString()}
            <br />
          </>
        );
      } else {
        parsedData.secondary = (
          <>
            ${parseFloat(data.contract.value).toFixed(2)} Off
            <br />
            Activated:
            {parsedData.startDate.toDateString()}
            <br />
            Expires:
            {parsedData.endDate.toDateString()}
            <br />
          </>
        );
      }
      break;
    default:
      parsedData.background = theme.palette.error;
      parsedData.secondary = (
        <>
          Activated:
          {parsedData.startDate.toDateString()} @ [
          {parsedData.startDate.toLocaleTimeString("en-us")}]
          <br />
          Expires:
          {parsedData.endDate.toDateString()} @ [
          {parsedData.endDate.toLocaleTimeString("en-us")}]
          <br />
        </>
      );
      break;
  }
  return parsedData;
}
