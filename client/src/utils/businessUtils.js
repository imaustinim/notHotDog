
export async function CreateCampaign(formData) {
  try {
    let url = "/api/campaigns/create";
    const fetchResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
    let token = await fetchResponse.json();
    console.log(token)
    if (!fetchResponse.ok) throw token;
    //get error code

    return token;
  } catch (err) {
    return err;
  }
}
