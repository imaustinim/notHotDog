export let checkCode = async (code) => {
  try {
    console.log("start");
    let jwt = localStorage.getItem("token");
    let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/tokens/create/${code}`;

    let options = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      // mode: "same-origin", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    };

    let res = await fetch(url, options);
    
    if (!res.ok) {
      throw await res.text();
    } else {
      return res.text();
    }
  } catch (err) {
    return new Error(err);
  }
};
