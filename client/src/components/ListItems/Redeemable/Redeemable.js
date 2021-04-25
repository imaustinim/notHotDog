export function ParseData(data, theme) {
  console.log(data);
  let parsedData = {
    businessName: data.businessName,
    avatar: data.avatar,
    name: data.name,
  };
  let startDate = new Date(data.activeDate.$date);
  let endDate = new Date(data.expireDate.$date);
  switch (data.type) {
    case "gift card":
      parsedData.background = theme.palette.giftcard;
      parsedData.primary = (
        <>
          <strong>{data.businessName}</strong>
          <em> - {data.type.toUpperCase()}</em>
        </>
      );
      parsedData.secondary = (
        <>
          {`$${parseFloat(data.contract.remainingValue).toFixed(
            2
          )} / $${parseFloat(data.contract.value).toFixed(2)}`}
          <br />
          <strong>Expires:</strong>
          {endDate.toDateString()}
          <br />
        </>
      );
      break;
    case "ticket":
      parsedData.background = theme.palette.ticket;
      parsedData.primary = (
        <>
          <strong>{data.businessName}</strong>
          <em> - {data.type.toUpperCase()}</em>
        </>
      );
      parsedData.secondary = (
        <>
          <strong>Start date:</strong>
          {startDate.toDateString()} @ [{startDate.toLocaleTimeString("en-us")}]
          <br />
          <strong>End date:</strong>
          {endDate.toDateString()} @ [{endDate.toLocaleTimeString("en-us")}]
          <br />
        </>
      );
      break;
    case "coupon":
      parsedData.background = theme.palette.coupon;
      parsedData.primary = (
        <>
          <strong>{data.businessName}</strong>
          <em> - {data.type.toUpperCase()}</em>
        </>
      );
      parsedData.secondary = (
        <>
          <strong>Activated:</strong>
          {startDate.toDateString()}
          <br />
          <strong>Expires:</strong>
          {endDate.toDateString()}
          <br />
        </>
      );
      break;
    default:
      parsedData.background = theme.palette.error.light;
      parsedData.primary = (
        <>
          <strong>{data.businessName}</strong>
          <em> - {data.type.toUpperCase()}</em>
        </>
      );
      parsedData.secondary = (
        <>
          <strong>Activated:</strong>
          {startDate.toDateString()} @ [{startDate.toLocaleTimeString("en-us")}]
          <br />
          <strong>Expires:</strong>
          {endDate.toDateString()} @ [{endDate.toLocaleTimeString("en-us")}]
          <br />
        </>
      );
      break;
  }
  return parsedData;
}
