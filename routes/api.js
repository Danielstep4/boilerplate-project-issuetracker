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
    assigned_to: String,
    open: Boolean,
    status_text: String
  })
  const Issue = mongoose.model('Issue', schema)
  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;

    })
    
    .post(function (req, res){
      let project = req.params.project;
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
