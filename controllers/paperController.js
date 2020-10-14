const { json } = require("express");
const PaperModel = require("../models/connectMongo").paperRecordModel;

//this class is singleton class and returns own instance
//this class useses queuedPaperModels
class PaperController {
  constructor() {
    if (PaperController.exist) {
      return PaperController.instance;
    }

    this.papers = [];

    this.PaperModel = PaperModel;

    PaperController.instance = this;

    PaperController.exist = true;

    return this;
  }

  async init() {
    this.papers = await this.getPapers();
  }

  async getPapers() {
    let jsonArray = await PaperModel.find().lean();

    if (jsonArray.length != 0) {
      this.papers = [];

      jsonArray.forEach((obj) => {
        this.papers.push({ ...obj });
      });
    }
    return this.papers;
  }

  async insertNewPaper(paper) {
    if (this.papers.length == 0) {
      await PaperModel.collection
        .insertOne({ _PId: 1, ...paper })
        .catch((err) => {
          if (err) {
            console.log(err);
            return false;
          }
        });
      this.papers.push = { _PId: 1, ...paper };
    } else {
      //const { _PId } = await this.getQueuedPapers();
      const { _PId } = this.papers[this.papers.length - 1];
      await PaperModel.collection
        .insertOne({ _PId: _PId + 1, ...paper })
        .catch((err) => {
          if (err) {
            console.log(err);
            return false;
          }
        });
      this.papers.push = { _PId: _PId + 1, ...paper };
    }

    return true;
  }

  async deletePaperId(PId) {
    //if insertNewPaper success it will return true
    await PaperModel.deleteOne({ _PId: PId }).catch((err) => {
      if (err) {
        console.log(err);
        return this.papers;
      }
    });

    return (this.papers = this.papers.filter((x) => x._PId !== PId));
  }

  async deletePaperAuthor(author) {
    //if insertNewPaper success it will return true
    await PaperModel.deleteMany({ author: author }).catch((err) => {
      if (err) {
        console.log(err);
        return this.papers;
      }
    });

    return (this.papers = this.papers.filter((x) => x.author !== author));
  }

  async deleteEveryPapers() {
    await PaperModel.deleteMany({}).catch((err) => {
      console.log(err);
      return false;
    });
    this.papers = [];
    return true;
  }

  async getPaperByName(title) {
    var regex = new RegExp(title, "i");
    let filteredRecords = this.papers.filter((item) => regex.test(item.title));

    return filteredRecords;
  }

  async getPaperByNameWithDate(title, date) {
    console.log(date);
    let allRecords = this.papers.filter((item) => item.year !== undefined);

    let datefilteredRecords = await this.checkBetween(date, allRecords);
    var regex = new RegExp(title, "i");
    let filteredRecords = datefilteredRecords.filter((item) =>
      regex.test(item.title)
    );

    return filteredRecords;
  }

  async getPaperByDate(date) {
    let allRecords = this.papers.filter((item) => item.year !== undefined);

    return await this.checkBetween(date, allRecords);
  }

  // date input is an array of two values ["lower bound date", "upper bound date"], allRecords is an array of objects
  async checkBetween(date, allRecords) {
    let returnArray = [];
    let date1 = date[0].split("/");
    let date2 = date[1].split("/");
    let cnctDate1 = date1[2] + date1[1] + date1[0];
    let cnctDate2 = date2[2] + date2[1] + date2[0];

    // checks if each record's date falls between the given dates
    for (let index = 0; index < allRecords.length; index++) {
      let currentRecordDate = allRecords[index].date.toString().split("/");
      let cnctRecordDate =
        currentRecordDate[2] + currentRecordDate[1] + currentRecordDate[0];
      // less than upper bound and greater than lower bound
      if (cnctRecordDate <= cnctDate2 && cnctRecordDate >= cnctDate1) {
        returnArray.push(allRecords[index]);
      }
      // if year = lower bound's year
      if (currentRecordDate[2] == date1[2]) {
        // account for month = 0
        if (currentRecordDate[1] == "00") {
          returnArray.push(allRecords[index]);
        } // account for day = 0
        else if (
          currentRecordDate[1] == date1[1] &&
          currentRecordDate[0] == "00"
        ) {
          returnArray.push(allRecords[index]);
        }
      }
    }
    // returns array of objects (object = record/tuple in this case)
    return returnArray;
  }
}

module.exports = PaperController;
