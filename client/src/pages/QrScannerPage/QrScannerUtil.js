import { ParseUserData } from "../../components/ListItems/Redeemable/RedeemableUtil";

export let addCode = async (code) => {
  try {
    let jwt = localStorage.getItem("token");
    let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/tokens/create/${code}`;
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    };

    let res = await fetch(url, options);

    if (!res.ok) {
      throw await res.text();
    } else {
      return await res.text();
    }
  } catch (err) {
    return new Error(err);
  }
};

export let redeemCode = async (code, redeemValue = null) => {
  try {
    let jwt = localStorage.getItem("token");
    let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/tokens/redeem/`;
    let body = { nodeItem: code };
    if (redeemValue) body.redeemValue = redeemValue;
    let options = {
      method: "POST",
      cors: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(body),
    };
    let res = await fetch(url, options);
    console.log(res);
    let response = await res.text();
    if (!res.ok) {
      throw response;
    } else {
      return response;
    }
  } catch (err) {
    return new Error(err);
  }
};

export let getOne = async (nodeItemId, theme) => {
  try {
    if (nodeItemId.length !== 24)
      throw new Error("Invalid Format for a Node Id");

    let jwt = localStorage.getItem("token");
    let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/tokens/${nodeItemId}`;
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    };

    let res = await fetch(url, options);

    let response = await res.text();
    if (!res.ok) {
      throw response;
    } else {
      let parsed = JSON.parse(response);
      let thisItem = ParseUserData(parsed, theme);
      thisItem._nodeItem = parsed;
      return thisItem;
    }
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};
