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
  async getTimeForNextGame() {
    const nextGame = "https://api.opap.gr/draws/v3.0/1100/upcoming/1";
    const nextGameObj = await fetch(nextGame);
    const data = await nextGameObj.json();
    if (data[0]) {
      const game = data[0];
      const drawTime = game.drawTime;
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
    draws.map((draw) => {
      if (draw.status === "results") {
        const winners = draw.winningNumbers.list; // [1,2,3,4,5];
        if (numberList.length > 0) {
          if (numberList.every((number) => winners.includes(number))) {
            // for every number we have, check if it exists in winning numbers, if yes, add the draw data to array.
            containedDraws.push(draw);
            containedDraws.sort((a, b) => b.drawId - a.drawId);
          }
        }
      }
    });
    console.log(containedDraws);
    return containedDraws;
  }
}
export default KenoAPI;
