import axios from "axios";

const BASE_URI = "https://results.onlinesystem.cz/EventResultsList/List/";

const DEFAULT_PARAMS = {
  split: 0,
  cs: true,
  clear: false,
  take: 5000,
  skip: 0,
  "sort[0][field]": "OrderAbs",
  "sort[0][dir]": "asc",
};

const TRACK_MAP = {
  2023: {
    ultra: { track: 7215, eventId: 2669 },
    sky: { track: 7216, eventId: 2669 },
  },
};

class LhutResultParser {
  /**
   *
   * @param {"2023"} year
   * @param {"ultra" | "sky"} race
   */
  constructor(year, race) {
    this.track = TRACK_MAP[year][race];
    if (!this.track) {
      throw new Error(`Invalid year or race provided: ${year}, ${race}`);
    }
  }

  async getData() {
    const response = await axios.get(BASE_URI, {
      params: {
        ...DEFAULT_PARAMS,
        ...this.track,
      },
    });

    // Filter out entries with OrderAbs as 99999
    const filteredData = response.data.data.filter((item) => item.OrderAbs !== 99999);

    return filteredData.map((item) => {
      const nameParts = item.RacerName.split(" ");
      const firstName = nameParts.pop(); // Get the last name
      const familyName = nameParts.join(" "); // Combine the remaining parts as the family name

      return {
        rank: item.OrderAbs === 99997 ? "DNF" : item.OrderAbs,
        time: item.OrderAbs === 99997 ? "" : item.Result,
        familyName: familyName,
        firstName: firstName,
        gender: item.Sex,
        birthdate: `${item.BornYear}-01-01`,
        nationality: item.State,
        bib: item.Bib,
        city: "", // The city is not provided in the response.
        team: item.TeamName || item.Club, // Choose TeamName or Club, based on what's available.
        club: item.Club || item.TeamName, // Choose Club or TeamName, based on what's available.
      };
    });
  }
}

export default LhutResultParser;
