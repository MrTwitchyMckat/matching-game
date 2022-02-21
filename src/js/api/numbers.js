async function getNumbers() {
  const url = 'https://raw.githubusercontent.com/terakeet/candidate-assignment-software-frontend/main/src/data/data.json'; 
  let response = await fetch(url);
  response = await response.json();
  return response.data;
}

export default getNumbers;