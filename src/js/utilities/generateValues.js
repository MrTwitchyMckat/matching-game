function generateValues(numbers) {
  let values = [];
  if (numbers.length) {
    // Double up values of numbers to get 12 total values
    numbers.forEach(number => {
      values.push(number, number);
    });

    // Randomize the array
    values.forEach((value, index) => {
      // Pick a random index of values
      const random = (Math.floor(Math.random() * values.length));
      let temp = values[index]; // Store current index value
      values[index] = values[random]; // Replace current index value with random index
      values[random] = temp; // Switch the random index with current index
    });
    return (values);
  } else {
    console.log('Error: Numbers parameter is empty');
    return;
  }
}

export default generateValues;