import jwt_decode from "jwt-decode";

export async function registerNewUser(formData) {
  try {
    // 1. POST our new user info to the server
    let url = "/api/signup";
    const fetchResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
    let token = await fetchResponse.json();
    if (!fetchResponse.ok) throw token;
    //get error code

    localStorage.setItem("token", token); // 4. Stick token into localStorage
    return getUser(token);
  } catch (err) {
    return err;
  }
}

export async function attemptLogin(formData) {
  try {
    let url = "/api/login";
    const fetchResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    let token = await fetchResponse.json();
    if (!fetchResponse.ok) throw token;

    localStorage.setItem("token", token);
    return getUser(token);
  } catch (err) {
    return err;
  }
}
export function getUser(token) {
  const userDoc = JSON.parse(atob(token.split(".")[1])).user; // 5. Decode the token + put user document into state
  return userDoc;
}

//given token/check if expired
export function checkExp(token) {
  let res = jwt_decode(token);
  let now = new Date();
  if (now.getTime() < res.exp) {
    localStorage.setItem("token", "");
    return false;
  } else return true;
}

export function logout() {
  localStorage.removeItem("token");
  window.location.replace("/");
}
