// export const BASE_URL = window.BASE_URL || '';
//export const BASE_URL = window.locatin.protocol + '//' + window.location.host;
//export const AUTH = btoa("gosmario@gmail.com:Alberte2021!");
export const BASE_URL = 'https://saas.leftsolutions.it';
export const AUTH = btoa("utente.corso@mail.com:pass4utente");
export const JSON_SERVICE_URL = BASE_URL + '/api/jsonws/invoke';
export const BASE_HEADERS = window.BASE_HEADERS || {
  Accept: 'application/json',
  'Content-type': 'application/json',
  'Access-Control-Allow-Origin': '*'
  ,'Authorization': 'Basic ' + AUTH
};

export async function fetchEndPoint(cmd, body) {
  //console.log("FETCH INVOKED WITH COMMAND", cmd);
  const pAuthParam = window.Liferay
    ? '?p_auth=' + window.Liferay.authToken
    : '';

  const invokeBody = {
    [cmd]: body,
  };

  const init = {
    method: 'POST',
    headers: BASE_HEADERS,
    body: JSON.stringify(invokeBody),
  };

  const response = await fetch(JSON_SERVICE_URL + pAuthParam, init)
  .catch(error => {
    console.log(error);
  });

  return response.json();
}
