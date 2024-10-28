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
  async getTimesDisplayed(numberList, drawsAmount) {
    var containedDraws = [];
    const drawsAPI = "https://api.opap.gr/draws/v3.0/1100/last/" + drawsAmount;
    const data = await fetch(drawsAPI);
    const draws = await data.json();
    // draws = [{status: 'active/results', winningNumbers.list: [0: int, 1: int: 2, int]}, {}, {}]
    draws.map((draw) => {
      if (draw.status == "results") {
        const list = draw.winningNumbers.list;
        const matches = numberList.every((item) => list.includes(item));
        if (matches) {
          console.log("Winning numbers: " + numberList + " won inside of: " + list);
          containedDraws.push(draw);
        }
      }
    });
    console.log("RETURNING LEN OF: " + containedDraws.length);
    return containedDraws;
  }
}
export default KenoAPI;
