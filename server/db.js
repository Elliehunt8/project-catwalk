/* eslint-disable camelcase */
const { Pool } = require('pg');
const token = require('../config');

const pool = new Pool({
  host: 'localhost',
  user: 'elliehunt',
  database: 'QNA',
  password: token,
  port: 5432,
});

/* eslint-disable camelcase */
const getQuestions = (id, page, count, cb) => {
  pool
    .query(
      `Select qs.id AS question_id, qs.body AS question_body, to_timestamp(qs.date_written/1000) AS question_date, qs.asker_name, qs.helpful AS question_helpfulness, CASE when qs.reported = 0 THEN false when qs.reported = 1 THEN true END as "reported",
      COALESCE(json_object_agg(ans.id,
        json_build_object(
            'id', ans.id,
            'body', ans.body,
            'date', to_timestamp(ans.date_written/1000),
            'answerer_name', ans.answerer_name,
            'helpfulness', ans.helpful,
           'photos',
           (json_build_array((json_build_object('id', pics.id, 'url', pics.url))))   ))
           FILTER (WHERE ans.id IS NOT NULL), '{}')
           AS answers
           FROM qs
           LEFT JOIN ans on ans.question_id = qs.id
           LEFT JOIN pics on pics.answer_id = ans.id
           WHERE qs.product_id = ${id} AND qs.reported != 1 GROUP BY qs.id;`
    )
    .then((data) => cb(null, data))
    .catch((err) => cb(err, null));
};

const getAnswers = (question_id, page, count, cb) => {
  pool
    .query(
      `Select ans.id AS answer_id, ans.body, to_timestamp(ans.date_written/1000) AS date, ans.answerer_name, ans.helpful AS helpfulness,
      json_agg(
        json_build_object(
          'id', pics.id,
          'url', pics.url
          )
        )
      AS photos
      FROM ans
      LEFT JOIN pics on pics.answer_id = ans.id
      WHERE ans.question_id = ${question_id}
      GROUP BY ans.id
  `
    )
    .then((data) => cb(null, data))
    .catch((err) => cb(err, null));
};

const addAnswer = (question_id, answer, cb) => {
  console.log('answer body from addAnswer ', answer);
  console.log('question id from addAnswer ', question_id);
  const text = answer.body;
  const name = answer.name;
  const email = answer.email;
  const date = Date.now();
  pool
    .query(
      `
      INSERT INTO ans(question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES (${question_id}, '${text}', ${date}, '${name}', '${email}', 0, 0)
      `
    )
    .then((data) => cb(null, data))
    .catch((err) => cb(err, null));
};

const addQuestion = (question, cb) => {
  console.log('q from db addQ ', question);
  const text = question.body;
  const name = question.name;
  const email = question.email;
  const product_id = question.product_id;
  const date = Date.now();
  pool
    .query(
      `INSERT INTO qs (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES (${product_id}, '${text}', ${date}, '${name}', '${email}', 0, 0);`
    )
    .then((data) => cb(null, data))
    .catch((err) => cb(err, null));
};

const markHelpfulQ = (question_id, cb) => {
  console.log('QID FROM DB MARKHELPFULQ', question_id);
  pool
    .query(`UPDATE qs SET helpful = helpful + 1 WHERE qs.id = ${question_id}`)
    .then((data) => cb(null, data))
    .catch((err) => cb(err, null));
};
const markHelpfulA = (answer_id, cb) => {
  console.log('AID FROM DB MARKHELPFULA', answer_id);
  pool
    .query(`UPDATE ans SET helpful = helpful + 1 WHERE ans.id = ${answer_id}`)
    .then((data) => cb(null, data))
    .catch((err) => cb(err, null));
};

const reportAnswer = (answer_id, cb) => {
  pool
    .query(`UPDATE ans SET reported = reported + 1 WHERE ans.id = ${answer_id}`)
    .then((data) => cb(null, data))
    .catch((err) => cb(err, null));
};
const reportQuestion = (question_id, cb) => {
  pool
    .query(`UPDATE qs SET reported = reported + 1 WHERE qs.id = ${question_id}`)
    .then((data) => cb(null, data))
    .catch((err) => cb(err, null));
};

module.exports = {
  getQuestions: getQuestions,
  getAnswers: getAnswers,
  addAnswer: addAnswer,
  addQuestion: addQuestion,
  markHelpfulA: markHelpfulA,
  markHelpfulQ: markHelpfulQ,
  reportAnswer: reportAnswer,
  reportQuestion: reportQuestion,
};
//QUESTIONS API OBJECT BUILD
// {
//   "product_id": "5",
//   "results": [{
//         "question_id": 37,
//         "question_body": "Why is this product cheaper ...",
//         "question_date": "2018-10-18T00:00:00.000Z",
//         "asker_name": "williamsmith",
//         "question_helpfulness": 4,
//         "reported": false,
//         "answers": {
//           68: {
//             "id": 68,
//             "body": "We are selling it here without any ...",
//             "date": "2018-08-18T00:00:00.000Z",
//             "answerer_name": "Seller",
//             "helpfulness": 4,
//             "photos": []
//             // ...
//           }
//         }
//       },
//       {
//         "question_id": 38,
//         "question_body": "How long does it last?",
//         "question_date": "2019-06-28T00:00:00.000Z",
//         "asker_name": "funnygirl",
//         "question_helpfulness": 2,
//         "reported": false,
//         "answers": {
//           70: {
//             "id": 70,
//             "body": "Some of the seams started splitting ...",
//             "date": "2019-11-28T00:00:00.000Z",
//             "answerer_name": "sillyguy",
//             "helpfulness": 6,
//             "photos": [],
//           },
//           78: {
//             "id": 78,
//             "body": "9 lives",
//             "date": "2019-11-12T00:00:00.000Z",
//             "answerer_name": "iluvdogz",
//             "helpfulness": 31,
//             "photos": [],
//           }
//         }
//       },
//       // ...
//   ]
// }

//ANSWERS API OBJECT BUILD
// // {
// //   "question": "1",
// //   "page": 0,
// //   "count": 5,
// //   "results": [
// //     {
// //       "answer_id": 8,
// //       "body": "What a great question!",
// //       "date": "2018-01-04T00:00:00.000Z",
// //       "answerer_name": "metslover",
// //       "helpfulness": 8,
// //       "photos": [],
// //     },
// //     {
// //       "answer_id": 5,
// //       "body": "Something pretty durable but I can't...",
// //       "date": "2018-01-04T00:00:00.000Z",
// //       "answerer_name": "metslover",
// //       "helpfulness": 5,
// //       "photos": [{
// //           "id": 1,
// //           "url": "urlplaceholder/answer_5_photo_number_1.jpg"
// //         },
// //         {
// //           "id": 2,
// //           "url": "urlplaceholder/answer_5_photo_number_2.jpg"
// //         },
// //         // ...
// //       ]
// //     },
// //     // ...
// //   ]
// // }
