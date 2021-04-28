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
    expired: new Date() > endDate,
    redeemed: data.redeemed,
    active: !data.redeemed && new Date() < endDate,
  };
  parsedData = createMessage(data, theme, parsedData);
  return parsedData;
}

export function ParseData(data, theme) {
  let startDate = new Date(data.activeDate);
  let endDate = new Date(data.expireDate);
  let parsedData = {
    id: data._id,
    businessName: data._business.businessName,
    avatar: data.avatar,
    name: data.name,
    address: data.address,
    description: data.description,
    startDate: startDate,
    endDate: endDate,
    expired: new Date() > endDate,
    active: new Date() < endDate,
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

  const getPercent = (date) => {
    return (((date.getDate()/30) * ((date.getMonth()+ 1)/12)) * 100).toFixed(0)
  }
  const startPercent = getPercent(parsedData.startDate)
  const endPercent = getPercent(parsedData.endDate)
  const degree = Math.floor(Math.max(startPercent, endPercent)/100 * 360)
  // const background = `linear-gradient(${degree}deg, ${theme.palette.month[parsedData.startDate.getMonth()].dark} ${startPercent}%, ${theme.palette.month[parsedData.endDate.getMonth()].light} ${endPercent}%)`
  // parsedData.background = background

  switch (data.contract.type) {
    case "gift card":
      parsedData.color = theme.palette.giftcard;
      parsedData.background = `linear-gradient(${degree}deg, ${theme.palette.giftcard.light} ${startPercent}%, ${theme.palette.giftcard.dark} ${endPercent}%)`
      let gcDateArr = parsedData.endDate.toDateString().split(" ")
      let gcEndDate = gcDateArr[1] + " " + gcDateArr[2] + ", " + gcDateArr[3]
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
      let tStartDateArr = parsedData.startDate.toDateString().split(" ")
      let tEndDateArr = parsedData.endDate.toDateString().split(" ")
      let tStartDate = tStartDateArr[1] + " " + tStartDateArr[2] + ", " + tStartDateArr[3]
      let tEndDate = tEndDateArr[1] + " " + tEndDateArr[2] + ", " + tEndDateArr[3]
      parsedData.color = theme.palette.ticket;
      parsedData.background = `linear-gradient(${degree}deg, ${theme.palette.ticket.light} ${startPercent}%, ${theme.palette.ticket.dark} ${endPercent}%)`
      parsedData.secondary = (
        <>
          
        </>
      );
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
      let cStartDateArr = parsedData.startDate.toDateString().split(" ")
      let cEndDateArr = parsedData.endDate.toDateString().split(" ")
      let cStartDate = cStartDateArr[1] + " " + cStartDateArr[2] + ", " + cStartDateArr[3]
      let cEndDate = cEndDateArr[1] + " " + cEndDateArr[2] + ", " + cEndDateArr[3]
      parsedData.color = theme.palette.coupon;
      parsedData.background = `linear-gradient(${degree}deg, ${theme.palette.coupon.light} ${startPercent}%, ${theme.palette.coupon.dark} ${endPercent}%)`
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
      parsedData.color = theme.palette.error;
      parsedData.background = `linear-gradient(${degree}deg, ${theme.palette.error.light} ${startPercent}%, ${theme.palette.error.dark} ${endPercent}%)`
      parsedData.secondary = (
        <>
          
        </>
      );

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
  console.log(parsedData.background)
  return parsedData;
}
