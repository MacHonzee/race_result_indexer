import ExcelCreator from "./excel-creator.js";

const HEADERS = {
  rank: { value: "Ranking", width: 10 },
  time: { value: "Time", width: 10 },
  familyName: { value: "Last Name", width: 20 },
  firstName: { value: "First Name", width: 20 },
  birthdate: { value: "Birthdate", width: 15 },
  gender: { value: "Gender", width: 10 },
  nationality: { value: "Nationality", width: 10 },
  city: { value: "City", width: 20 },
  bib: { value: "Bib Number", width: 10 },
  team: { value: "Team", width: 20 },
  club: { value: "Club", width: 20 },
};

class UtmbExcelCreator extends ExcelCreator {
  constructor(filename) {
    super(filename, HEADERS);
  }
}

export default UtmbExcelCreator;
