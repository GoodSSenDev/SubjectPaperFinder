const { json } = require("express");
const researchPaperModel = require("../models/researchPaperModel");

//this class is singleton class and returns own instance
//this class useses researchPaperModels
class researchPaperController {
  constructor() {
    if (researchPaperController.exist) {
      return researchPaperController.instance;
    }

    this.papers = [];

    this._researchPaperModel = researchPaperModel;

    researchPaperController.instance = this;

    researchPaperController.exist = true;

    return this;
  }

  async init() {
    this.papers = await this.getResearchPapers();
  }

  async getResearchPapers() {
    let jsonArray = await researchPaperModel.find().lean();

    if (jsonArray.length != 0) {
      this.papers = [];

      jsonArray.forEach(obj => {
        this.papers.push({ ...obj })
      });
    }
    return this.papers;
  }

  async insertNewResearchPaper(paper) {

    if (this.papers.length == 0) {
      await researchPaperModel.collection
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
      await researchPaperModel.collection
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

  async deleteResearchPaperId(PId) {
    //if insertNewPaper success it will return true
    await researchPaperModel.deleteOne({ _PId: PId }).catch((err) => {
      if (err) {
        console.log(err);
        return this.papers;
      }
    });

    return this.papers = this.papers.filter((x) => x._PId !== PId);
  }

  async deleteReseachPaperAuthor(author) {
    //if insertNewPaper success it will return true
    await researchPaperModel.deleteMany({ author: author }).catch((err) => {
      if (err) {
        console.log(err);
        return this.papers;
      }
    });

    return this.papers = this.papers.filter((x) => x.author !== author);
  }

  async deleteEveryResearchPapers() {
    await researchPaperModel.deleteMany({}).catch((err) => {
      console.log(err);
      return false;
    });
    this.papers = [];
    return true;
  }

  async filterUsingTag(papers,addTags,ignoreTags){
    //addTags first
    let filteredPapers = papers.filter(elem => {
        for(let i = 0; i < addTags.length; i++){
            if(elem.tags.indexOf(addTags[i]) < 0)
            {
                return false;
            }
        }
        return true;
    })
    return filteredPapers.filter(elem => {
        for(let i = 0; i < ignoreTags.length; i++){
            if(elem.tags.indexOf(ignoreTags[i]) < 0)
            {
                return true;
            }
        }
        return false;
    })

  }

}

module.exports = researchPaperController;

