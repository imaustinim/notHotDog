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
    redeemed: data.redeemed,
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
      {parsedData.name} - {parsedData.businessName}
      {/* - {data.contract.type.toUpperCase()} */}
    </>
  );
  switch (data.contract.type) {
    case "gift card":
      parsedData.background = theme.palette.giftcard;
      let gcDateArr = parsedData.endDate.toDateString().split(" ");
      let gcEndDate = gcDateArr[1] + " " + gcDateArr[2] + ", " + gcDateArr[3];
      parsedData.secondary = (
        <>
          {`$${parseFloat(data.contract.remainingValue).toFixed(2)}`}
          {/* // / $${parseFloat(data.contract.value).toFixed(2)}`} */}
        </>
      );
      parsedData.date = (
        <>
          <strong>Expires:</strong> {gcEndDate}
        </>
      );
      break;
    case "ticket":
      let tStartDateArr = parsedData.startDate.toDateString().split(" ");
      let tEndDateArr = parsedData.startDate.toDateString().split(" ");
      let tStartDate =
        tStartDateArr[1] + " " + tStartDateArr[2] + ", " + tStartDateArr[3];
      let tEndDate =
        tEndDateArr[1] + " " + tEndDateArr[2] + ", " + tEndDateArr[3];

      parsedData.background = theme.palette.ticket;
      parsedData.secondary = <></>;
      parsedData.date = (
        <>
          <strong>Time: </strong>{" "}
          {parsedData.startDate.toLocaleTimeString("en-us").split(":00")[0]}
          {parsedData.startDate.toLocaleTimeString("en-us").split(":00")[1]}
          <br />
          <strong>Date: </strong> {tStartDate}
          {/* <strong>End date: </strong>{" "}
          {tEndDate} @ {" "}
          {parsedData.endDate.toLocaleTimeString("en-us").split(":00")[0]}
          {parsedData.endDate.toLocaleTimeString("en-us").split(":00")[1]}
          <br /> */}
        </>
      );
      break;
    case "coupon":
      let cStartDateArr = parsedData.startDate.toDateString().split(" ");
      let cEndDateArr = parsedData.startDate.toDateString().split(" ");
      let cStartDate =
        cStartDateArr[1] + " " + cStartDateArr[2] + ", " + cStartDateArr[3];
      let cEndDate =
        cEndDateArr[1] + " " + cEndDateArr[2] + ", " + cEndDateArr[3];
      parsedData.background = theme.palette.coupon;
      if (data.contract.unit === "percent") {
        parsedData.secondary = <>{data.contract.value}% Off</>;
        parsedData.date = (
          <>
            <strong>Activated:</strong> {cStartDate}
            <br />
            <strong>Expires:</strong> {cEndDate}
          </>
        );
      } else {
        parsedData.secondary = (
          <>${parseFloat(data.contract.value).toFixed(2)} Off</>
        );
        parsedData.date = (
          <>
            <strong>Activated:</strong> {cStartDate}
            <br />
            <strong>Expires:</strong> {cEndDate}
          </>
        );
      }
      break;
    default:
      parsedData.background = theme.palette.error;
      parsedData.secondary = <></>;
      parsedData.date = (
        <>
          <strong>Activated:</strong> {parsedData.startDate.toDateString()} @ [
          {parsedData.startDate.toLocaleTimeString("en-us")}]
          <br />
          <strong>Expires:</strong> {parsedData.endDate.toDateString()} @ [
          {parsedData.endDate.toLocaleTimeString("en-us")}]
          <br />
        </>
      );
      break;
  }
  return parsedData;
}
