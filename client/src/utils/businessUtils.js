
export async function CreateCampaign(formData) {
  try {
    let url = "/api/campaigns/create";
    let jwt = localStorage.getItem('token')
    if (!jwt) throw new Error();
    const fetchResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
      body: JSON.stringify(formData),
    });

    // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
    let token = await fetchResponse.json();
    if (!fetchResponse.ok) throw token;
    //get error code

    return token;
  } catch (err) {
    return err;
  }
}
