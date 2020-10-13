const { json } = require("express");
const mongoose = require("../models/connectMongo").mongoose;
const rejectedPaperModel = require("../models/rejectedPaperModel")

//this class is singleton class and returns own instance
class rejectedPaperController {
  constructor() {
    if (rejectedPaperController.exist) {
      return rejectedPaperController.instance;
    }

    this.papers = [];

    this._rejectedPaperModel = rejectedPaperModel;

    rejectedPaperController.instance = this;

    rejectedPaperController.exist = true;

    return this;
  }

  async init() {
    this.papers = await this.getRejectedPapers();
  }

  async getRejectedPapers() {
    let jsonArray = await rejectedPaperModel.find().lean();

    if (jsonArray.length != 0) {
      this.papers = [];

      jsonArray.forEach((obj) => {
        this.papers.push({ ...obj });
      });
    }
    return this.papers;
  }

  async insertNewRejectedPaper(paper) {
    if (this.papers.length == 0) {
      await rejectedPaperModel.collection
        .insertOne({ _PId: 1, ...paper })
        .catch((err) => {
          if (err) {
            console.log(err);
            return false;
          }
        });
      this.papers.push = { _PId: 1, ...paper };
    } else {
      const { _PId } = this.papers[this.papers.length - 1];
      await rejectedPaperModel.collection
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

  async deleteRejectedPaperId(PId) {
    //if insertNewPaper success it will return true
    await rejectedPaperModel.deleteOne({ _PId: PId }).catch((err) => {
      if (err) {
        console.log(err);
        return this.papers;
      }
    });

    return (this.papers = this.papers.filter((x) => x._PId !== PId));
  }

  async deleteRejectedPaperAuthor(author) {
    //if insertNewPaper success it will return true
    await rejectedPaperModel.deleteMany({ author: author }).catch((err) => {
      if (err) {
        console.log(err);
        return this.papers;
      }
    });

    return (this.papers = this.papers.filter((x) => x.author !== author));
  }

  async deleteEveryRejectedPapers() {
    await rejectedPaperModel.deleteMany({}).catch((err) => {
      console.log(err);
      return false;
    });
    this.papers = [];
    return true;
  }
}

module.exports = rejectedPaperController;
