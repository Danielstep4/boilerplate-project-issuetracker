'use strict';
const { ResumeToken } = require('mongodb');
const mongoose = require('mongoose');
module.exports = function (app) {
  mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  const schema = mongoose.Schema({
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now },
    created_by: { type: String, required: true },
    assigned_to: { type: String, default: ""},
    open: { type: Boolean, default: true },
    status_text: { type: String, default: ""},
    project: String
  });
  const Issue = mongoose.model('Issue', schema);
  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      const query = { ...req.query }
      let findObj = {project}
      if(query) {
        findObj = {
          project, 
          ...query
        }
      }
      Issue.find(findObj, (err, issues) => {
        if(err) return console.log(err)
        issues = issues.map((obj) => {
          return  {
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
        })
        res.json(issues)
      })
    })
    
    .post(function (req, res){
      let project = req.params.project;
      const userIssue = new Issue({
        ...req.body,
        project
      }).save((err,issue) => {
        if(err){
          res.json({
            error: 'required field(s) missing'
          })
          return console.error(err)
        }
        console.log('New issue has been saved!')
        
        res.send(issue)
      });
    })
    
    .put(function (req, res){
      let project = req.params.project;
      let id = req.body["_id"]
      if(!id) {
        res.json({
          error: 'missing _id'
        })
        return console.log('user tried to update but no id found.')
      }
      delete req.body["_id"]
      if(!Object.keys(req.body).length) {
        res.json({
          error: 'no update field(s) sent', 
          '_id': id
        })
        return console.log('no update field(s) sent')
      }
      let toUpdate = { 
        ...req.body, 
        updated_on: Date.now()
       }
      Issue.findByIdAndUpdate(id, toUpdate, {new: true}, (err, issue) => {
        if(err) {
          res.json({
            error: 'could not update', 
            '_id': id
          })
          return console.error(err)
        }
        console.log(`User with ${id} has been updated`)
        res.json({
           result: 'successfully updated',
            '_id': id
           })
      })
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
