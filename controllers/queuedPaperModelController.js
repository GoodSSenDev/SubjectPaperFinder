const queuedPaperModel = require("../models/queuedPaperModel");

//this class is singleton class and returns own instance
//this class useses queuedPaperModels
class queuedPaperModelController {
  constructor() {
    if (queuedPaperModelController.exist) {
      return queuedPaperModelController.instance;
    }

    this.papers = [];

    this._queuedPaperModel = queuedPaperModel;

    queuedPaperModelController.instance = this;

    queuedPaperModelController.exist = true;

    return this;
  }

  async init() {
    this.papers = await queuedPaperModel.getQueuedPapers();
  }

  async getPapers() {
    return await queuedPaperModel.getQueuedPapers();
  }
  async insertNewPaper(paper) {
    //if insertNewPaper success it will return true
    if (await queuedPaperModel.insertNewQueuedPaper(paper)) {
      //   await this.init();
      //   const { _PId } = this.papers[this.papers.lastIndexOf()];
      //   this.papers.push({ _PId: _PId + 1, ...paper });
    }
    return this.papers;
  }

  async deleteTagById(PId) {
    //if insertNewPaper success it will return true
    if (await queuedPaperModel.deleteQueuedPaperId(PId)) {
      this.papers = this.papers.filter((x) => x._PId !== _PId);
    }
    return this.papers;
  }
}

module.exports = queuedPaperModelController;
