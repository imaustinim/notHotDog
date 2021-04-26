
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
    let token = await fetchResponse.json();
    // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
    if (!fetchResponse.ok) throw token;
    return token;
  } catch (err) {
    return err;
  }
}


export async function EditCampaign(formData, id) {
  try {
    let url = `/api/campaigns/${id}/edit`;
    let jwt = localStorage.getItem('token')
    if (!jwt) throw new Error();
    const fetchResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
      body: JSON.stringify(formData),
    })
    let token = await fetchResponse.json();
    if (!fetchResponse.ok) throw token;
    return token;
  } catch (err) {
    return err;
  }
}

export async function DeleteCampaign(id) {
  try {
    let url = `/api/campaigns/${id}/delete`;
    let jwt = localStorage.getItem('token')
    if (!jwt) throw new Error();
    const fetchResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
    })
    let token = await fetchResponse.json();
    if (!fetchResponse.ok) throw token;
    return token.nodes;
  } catch (err) {
    return err;
  }
}

export async function getCampaign(id) {
  try {
    let url = `/api/campaigns/${id}`;
    let jwt = localStorage.getItem('token')
    if (!jwt) throw new Error();
    const fetchResponse = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
    })
    // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
    let token = await fetchResponse.json();
    if (!fetchResponse.ok) throw token;
    return token.node;
  } catch (err) {
    return err;
  }
}

export async function getCampaignData() {
  try {
    let url = `/api/campaigns/getNodes`;
    let jwt = localStorage.getItem('token')
    if (!jwt) throw new Error();
    const fetchResponse = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
    })
    // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
    let token = await fetchResponse.json();
    if (!fetchResponse.ok) throw token;
    return token.nodes;
  } catch (err) {
    return err;
  }
}
