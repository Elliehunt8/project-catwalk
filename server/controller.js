const db = require('./db');

const getQs = (req, res) => {
  console.log(req.query);
  let pId = req.query.question_id;
  let page = req.query.page || 1;
  let counter = req.query.counter || 5;
  console.log(pId, page, counter);
  db.getQuestions(pId, page, counter, (err, results) => {
    if (err) {
      console.log('this is from getQs error: ', err);
      res.send(err);
    } else {
      console.log('this is from getQs: ', results);
      res.send(results);
    }
  });
};

const getAs = (req, res) => {
  let qId = req.params.question_id;
  let page = req.query.page;
  let counter = req.query.counter;
  console.log(qId, page, counter);
  db.getAnswers(qId, page, counter, (err, results) => {
    if (err) {
      console.log('this is from getAs error: ', err);
      res.send(err);
    } else {
      console.log('this is from getAs: ', results);
      res.send(results);
    }
  });
};

const addAs = (req, res) => {
  // console.log(req.body);
  console.log(req.params);
  let qId = req.params.question_id;
  let data = req.body;
  db.addAnswer(qId, data, (err, result) => {
    if (err) {
      console.log('error from addAs', err);
      res.send(err);
    } else {
      console.log('result from addAs', result);
      res.send(result);
    }
  });
};

const addQs = (req, res) => {
  console.log('body from controller addQ: ', req.body);
  let data = req.body;
  db.addQuestion(data, (err, result) => {
    if (err) {
      console.log('err from controller ', err);
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const markQH = (req, res) => {
  //console.log('MARKQH: ', req);
  let qId = req.params.question_id;
  db.markHelpfulQ(qId, (err, result) => {
    if (err) {
      console.log('err from controller MHQ ', err);
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
};

const markAH = (req, res) => {
  //console.log(req);
  let aId = req.params.answer_id;
  db.markHelpfulA(aId, (err, result) => {
    if (err) {
      console.log('err from controller MHA ', err);
      res.send(err);
    } else {
      // console.log('result from controller MHA ', result);
      res.status(204).send(result);
      //res.sendStatus(204);
    }
  });
};

const reportA = (req, res) => {
  let aId = req.params.answer_id;
  db.reportAnswer(aId, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const reportQ = (req, res) => {
  let qId = req.params.question_id;
  db.reportQuestion(qId, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

module.exports = {
  getQs: getQs,
  getAs: getAs,
  addAs: addAs,
  addQs: addQs,
  markQH: markQH,
  markAH: markAH,
  reportA: reportA,
  reportQ: reportQ,
};
