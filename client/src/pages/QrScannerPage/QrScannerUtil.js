export let checkCode = async (code) => {
  let jwt = localStorage.getItem("token");
  let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/tokens/create/${code}`;

  let options = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  };

  let res = await fetch(url, options).then((res) => res.json());
  console.log(res);
};
