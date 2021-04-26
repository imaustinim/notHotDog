export async function getTokenData() {
  try {
    let url = `/api/tokens/getData`;
    let jwt = localStorage.getItem('token')
    if (!jwt) throw new Error();
    const fetchResponse = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
    })
    // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
    let token = await fetchResponse.json();
    if (!fetchResponse.ok) throw token;
    return token.tokens;
  } catch (err) {
    return err;
  }
}