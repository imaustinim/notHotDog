export let checkCode = async (code) => {
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
