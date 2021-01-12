'use strict';
const { ResumeToken } = require('mongodb');
const mongoose = require('mongoose');
module.exports = function (app) {
  mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  const schema = mongoose.Schema({
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now },
    created_by: { type: String, required: true },
    assigned_to: String,
    open: { type: Boolean, default: true },
    status_text: String,
    project: String
  });
  const Issue = mongoose.model('Issue', schema);
  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      console.log(project)
      Issue.find({ project }, (err, issues) => {
        if(err) return console.log(err)
        issues = issues.map((obj) => {
          const newObj = {
            assigned_to: obj.assigned_to,
            status_text: obj.status_text,
            open: obj.open,
            _id: obj.id,
            issue_title: obj.issue_title,
            issue_text: obj.issue_text,
            created_by: obj.created_by,
            created_on: obj.created_on,
            updated_on: obj.updated_on
          }
          return newObj
        })
        res.json(issues)
      })
    })
    
    .post(function (req, res){
      let project = req.params.project;
      
      const userIssue = new Issue({
        ...req.body,
        project
      }).save(err => {
        if(err){
          res.json({
            error: 'required field(s) missing'
          })
          return console.error(err)
        }
        console.log('New issue has been saved!')
      });
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
