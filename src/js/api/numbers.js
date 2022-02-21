async function getNumbers(url) {
  let response = await fetch(url);
  let resJSON = await response.json();
  return resJSON.data;
}

export default getNumbers;