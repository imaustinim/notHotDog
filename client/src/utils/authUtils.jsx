export async function registerNewUser(formData) {
  try {
    // 1. POST our new user info to the server

    let url = "/api/signup";
    const fetchResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    console.log(fetchResponse);
    // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
    if (!fetchResponse.ok) {
      //get error code
      let err = await fetchResponse.json();

      throw err.code;
    }
    let token = await fetchResponse.json(); // 3. decode fetch response to get jwt from sr
    localStorage.setItem("token", token); // 4. Stick token into localStorage
    return getUser(token);
  } catch (err) {
    return err;
  }
}

export function getUser(token) {
  const userDoc = JSON.parse(atob(token.split(".")[1])).user; // 5. Decode the token + put user document into state
  return userDoc;
}

export function logout() {
  localStorage.removeItem("token");
  window.location.replace("/");
}
