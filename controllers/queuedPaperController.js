const { json } = require("express");
const queuedPaperModel = require("../models/queuedPaperModel");

//this class is singleton class and returns own instance
//this class useses queuedPaperModels
class queuedPaperController {
  constructor() {
    if (queuedPaperController.exist) {
      return queuedPaperController.instance;
    }

    this.papers = [];

    this._queuedPaperModel = queuedPaperModel;

    queuedPaperController.instance = this;

    queuedPaperController.exist = true;

    return this;
  }

  async init() {
    this.papers = await this.getQueuedPapers();
  }

  async getQueuedPapers() {
    let jsonArray = await queuedPaperModel.find().lean();

    if (jsonArray.length != 0) {
      this.papers = [];

      jsonArray.forEach(obj => {
        this.papers.push({ ...obj })
      });
    }
    return this.papers;
  }

  async insertNewQueuedPaper(paper) {

    if (this.papers.length == 0) {
      await queuedPaperModel.collection
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
      await queuedPaperModel.collection
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

  async deleteQueuedPaperId(PId) {
    //if insertNewPaper success it will return true
    await queuedPaperModel.deleteOne({ _PId: PId }).catch((err) => {
      if (err) {
        console.log(err);
        return this.papers;
      }
    });

    return this.papers = this.papers.filter((x) => x._PId !== PId);
  }

  async deleteQueuedPaperAuthor(author) {
    //if insertNewPaper success it will return true
    await queuedPaperModel.deleteMany({ author: author }).catch((err) => {
      if (err) {
        console.log(err);
        return this.papers;
      }
    });

    return this.papers = this.papers.filter((x) => x.author !== author);
  }


  async deleteEveryQueuedPapers() {
    await queuedPaperModel.deleteMany({}).catch((err) => {
      console.log(err);
      return false;
    });
    this.papers = [];
    return true;
  }
}

module.exports = queuedPaperController;
