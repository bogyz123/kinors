class KenoAPI {
  async getLastGames(amount) {
    const api = "https://api.opap.gr/draws/v3.0/1100/last/" + amount;
    const data = await fetch(api);
    const json = await data.json();
    if (json) {
      return json;
    }
    return null;
  }
  getNumbersFrequency(games) {
    // Returns an object of key value pairs where key is a number and value is the amount of times it's been drawn in the last 50 draws.
    const entries = Object.fromEntries(
      Array.from({length: 80}, (_, index) => [index+1, 0])
    );
    for (let i = 1; i < games?.length; i++) {
      const winningNumbers = games[i].winningNumbers.list;
      for (let k = 0; k < winningNumbers.length; k++) {
        entries[winningNumbers[k]]+=1;
      }
    }
    return entries;
  }
  async getTimeForNextGame() {
    const nextGame = "https://api.opap.gr/draws/v3.0/1100/upcoming/1";
    const nextGameObj = await fetch(nextGame);
    const data = await nextGameObj.json();
    if (data[0]) {
      const drawTime = data[0].drawTime;
      const currentTime = Date.now();
      const timeleft = drawTime - currentTime;
      if (timeleft) {
        return timeleft;
      }
      return null;
    }
    return null;
  }
  getTimesDisplayed(draws, numberList) {
    // this function takes the array of draws and checks where did our number list appear, if it did.
    let containedDraws = [];
    draws.forEach((draw) => {
      if (draw.status === "results") {
        const winners = draw.winningNumbers.list; // [1,2,3,4,5];
        if (numberList.length > 0) {
          if (numberList.every((number) => winners.includes(number))) {
            // for every number we have, check if it exists in winning numbers, if yes, add the draw data to array.
            containedDraws.push(draw);
          }
        }
      }
    });
    return containedDraws.sort((a,b) => b.drawId - a.drawId);
  }
   generateRandomCombination(amount, hotNumbers) {
    if (amount > 20 || amount < 1) {
      throw new Error("Amount must be between 1 and 20");
    }
    
    const numbers = new Set();
    
   if (hotNumbers) {
    // If the hotNumbers exists, we need to get <amount> amount of most frequenly drawn numbers in the last 50 draws.
    // If the amount is 5, then get 5 most frequent draws in the last 50 draws.
  
    const frequency = this.getNumbersFrequency(hotNumbers); // Returns array of arrays, where each sub array is a key value pair
    // where key is the number and value is the amount of times it's been drawn.
    const sortedByDescending = Object.entries(frequency).sort((a,b) => b[1] - a[1]).slice(0, amount).map(([key]) => key);
    // We get the last 50 draws (hotNumbers) and sort it's values by descending, then we get the last 50 numbers sorted by amount of times they are drawn.
    // Then we slice the array to get only the amount of times the user has requested (amount param).
    // Then we get extract the number itself (the key) from the key value pair and return it as element of the sortedByDescending array.
    // So ultimately we get the <amount> of most frequent numbers in the last 50 draws. :)
    return sortedByDescending;
   }
   else {
    while (numbers.size < amount) {
      const randomNum = Math.floor(Math.random() * 80) + 1;
      numbers.add(randomNum);
    }
    
    return Array.from(numbers);
   }
  }
}
export default KenoAPI;
