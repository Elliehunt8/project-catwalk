var router = require('express').Router();
var controller = require('./controller');

router.get('/questions/', controller.getQs);
//working time = 8.67s, after ID indexes 4.11 seconds after secondary ID indexes 9ms
router.get('/questions/:question_id/answers', controller.getAs);
//working time = 12.14s, after ID indexes 3.65 seconds after secondary ID indexes 7ms
router.post('/questions/:question_id/answers', controller.addAs);
//working time = 20ms
router.post('/questions', controller.addQs);
//working time = 16ms
router.put('/answers/:answer_id/helpful', controller.markAH);
//working time = 17ms
router.put('/questions/:question_id/helpful', controller.markQH);
//working time = 10ms
router.put('/answers/:answer_id/report', controller.reportA);
//working time = 12ms
router.put('/questions/:question_id/report', controller.reportQ);
//working time = 7ms
module.exports = router;
