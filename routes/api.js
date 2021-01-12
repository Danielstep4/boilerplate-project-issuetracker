'use strict';
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
    assigned_to: { type: String, default: 'QA' },
    open: { type: Boolean, default: true },
    status_text: { type: String, default: 'In QA' }
  })
  const Issue = mongoose.model('Issue', schema)
  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;

    })
    
    .post(function (req, res){
      let project = req.params.project;
      const userIssue = new Issue({
        ...req.body
      }).save((err,issue) => {
        if(err) return console.log(err)
        console.log('New issue has been saved!')
      })
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
