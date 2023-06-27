import ExcelCreator from "./excel-creator.js";

const HEADERS = {
  rank: { value: "Ranking", width: 10 },
  time: { value: "Time", width: 10 },
  familyName: { value: "Family Name", width: 20 },
  firstName: { value: "First Name", width: 20 },
  gender: { value: "Gender", width: 10 },
  birthdate: { value: "Birthdate", width: 15 },
  nationality: { value: "Nationality", width: 20 },
  itraId: { value: "ITRA ID", width: 15 },
  bib: { value: "Bib no.", width: 10 },
  city: { value: "City", width: 20 },
  team: { value: "Team", width: 20 },
};

class ItraExcelCreator extends ExcelCreator {
  constructor(filename) {
    super(filename, HEADERS);
  }
}

export default ItraExcelCreator;
