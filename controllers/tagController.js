const { json } = require("express");
const tagModel = require("../models/tagModel");

//single ton clas for controlling the tags in database using mongoose tag model 
class tagController {
    constructor(){
        if (tagController.exist) {
            return tagController.instance;
        }
      
        this.tags = [];
    
        this._tagModel = tagModel;
   
        tagController.instance = this;

        tagController.exist = true;

        return this;
    }

    async init() {
        this.tags = await this.getTags();
    }

    async getTags() {
        let jsonArray = await tagModel.find().lean();

        if(jsonArray.length != 0) {
            this.tags = [];

            jsonArray.forEach(obj => {
                this.tags.push({ ...obj});
            });
        }
        return this.tags;
    }

    async addNewTag(tag){
        if(this.tags.length == 0){
            await tagModel.collection
                .insertOne({ID: 1, ...tag})
                .catch((err) => {
                    if (err) {
                      console.log(err);
                      return false;
                    }
                  });
                this.tags.push({ID: 1, ...tag});
        } else {
            const { ID } = this.tags[this.tags.length -1];
            await tagModel.collection
                .insertOne({ ID: ID + 1, ...tag })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                });
            this.tags.push({ ID: ID + 1, ...tag });

        }

        return true;
    }

    async checkTag(tagName){
        return this.tags.some(elem => elem.Name == tagName);
    }

    async getTagID(tagName){

        for (let i = 0; i <this.tags.length;i++) {
            if(this.tags[i].Name == tagName)
                return this.tags[i].ID;
        }

        
        //if they can not find ID return -1 
        return -1;
    }

    async getTagName(tagID){
        // use binarySeach to improve performance.
        for (let i = 0; i <this.tags.length;i++) {
            if(this.tags[i].ID == tagID)
                return this.tags[i].Name;
        }
        //if they can not find ID return ''
        return '';
    }

    async deleteTagByName(tagName){
        await tagModel.deleteMany({ Name: tagName }).catch((err) => {
            if (err) {
              console.log(err);
              return this.tags;
            }
          });
        return this.tags = this.tags.filter((x) => x.Name !== tagName);
    }

    async deleteTagByID(tagID){
        await tagModel.deleteMany({ ID: tagID }).catch((err) => {
            if (err) {
              console.log(err);
              return this.tags;
            }
          });
        return this.tags = this.tags.filter((x) => x.ID !== tagID);
    }

}


module.exports = tagController;