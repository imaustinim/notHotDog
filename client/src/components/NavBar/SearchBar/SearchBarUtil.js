import EventSeatIcon from "@material-ui/icons/EventSeat";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";

/* 
router.get("/campaigns/getNodes", nodeCtrl.getNodes);
router.get("/campaigns/:id", nodeCtrl.getNode);

// Tokens
router.get("/tokens/getData", nodeItemCtrl.getData);
*/
export async function handleSearchList(user) {
  try {
    let jwt = localStorage.getItem("token");
    if (!jwt) throw new Error();

    let url;
    if (user.businessName) {
      url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/campaigns/getNodes`;
    } else {
      url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/tokens/getData`;
    }

    let res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    if (!res.ok) throw await res.text();
    res = await res.json();
    let dataSet = res.tokens ? res.tokens : res.nodes;
    let options = dataSet.map((each) => {
      let thisOption = createOption(each);
      return thisOption;
    });
    return options;
  } catch (err) {
    console.log(err);
  }
}

function createOption(data) {
  let thisOption = {};
  thisOption.type = data.contract.type;
  thisOption.id = data._id;
  thisOption.title = data._business
    ? data._business.businessName
    : data._node._business.businessName;
  switch (data.contract.type) {
    case "gift card":
      thisOption.icon = <CardGiftcardIcon />;
      thisOption.value = `$${parseFloat(data.contract.remainingValue).toFixed(
        2
      )}`;
      break;
    case "ticket":
      thisOption.icon = <EventSeatIcon />;
      let startDate = new Date(data.activeDate);
      let tStartDateArr = startDate.toDateString().split(" ");
      let tStartDate =
        tStartDateArr[1] + " " + tStartDateArr[2] + ", " + tStartDateArr[3];

      thisOption.value = `${tStartDate} - 
          ${startDate.toLocaleTimeString("en-us").split(":00")[0]}
          ${startDate.toLocaleTimeString("en-us").split(":00")[1]}`;
      break;
    case "coupon":
      thisOption.icon = <LoyaltyIcon />;
      if (data.contract.unit === "percent") {
        thisOption.value = `${data.contract.value}% Off`;
      } else {
        thisOption.value = `$${parseFloat(data.contract.value).toFixed(2)} Off`;
      }
      break;
    default:
      data.value = `Invalid contract`;
      break;
  }
  return thisOption;
}
