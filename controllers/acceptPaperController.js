const { json } = require("express");
const mongoose = require("../models/connectMongo").mongoose;
const acceptedPaperModel = require("../models/acceptedPapersModel");

//this class is singleton class and returns own instance
//this class useses acceptedPaperController
class acceptedPaperController {
  constructor() {
    if (acceptedPaperController.exist) {
      return acceptedPaperController.instance;
    }

    this.papers = [];

    this._acceptedPaperModel = acceptedPaperModel;

    acceptedPaperController.instance = this;

    acceptedPaperController.exist = true;

    return this;
  }

  async init() {
    this.papers = await this.getAcceptedPapers();
  }

  async getAcceptedPapers() {
    let jsonArray = await acceptedPaperModel.find().lean();

    if (jsonArray.length != 0) {
      this.papers = [];

      jsonArray.forEach(obj => {
        this.papers.push({ ...obj })
      });
    }
    return this.papers;
  }

  async insertNewAcceptedPaper(paper) {

    if (this.papers.length == 0) {
      await acceptedPaperModel.collection
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
      await acceptedPaperModel.collection
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

  async deleteAcceptedPaperId(PId) {
    //if insertNewPaper success it will return true
    await acceptedPaperModel.deleteOne({ _PId: PId }).catch((err) => {
      if (err) {
        console.log(err);
        return this.papers;
      }
    });

    return this.papers = this.papers.filter((x) => x._PId !== PId);
  }

  async deleteAcceptedPaperAuthor(author) {
    //if insertNewPaper success it will return true
    await acceptedPaperModel.deleteMany({ author: author }).catch((err) => {
      if (err) {
        console.log(err);
        return this.papers;
      }
    });

    return this.papers = this.papers.filter((x) => x.author !== author);
  }

  async deleteEveryAcceptedPapers() {
    await acceptedPaperModel.deleteMany({}).catch((err) => {
      console.log(err);
      return false;
    });
    this.papers = [];
    return true;
  }
}

module.exports = acceptedPaperController;