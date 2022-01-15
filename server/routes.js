var router = require('express').Router();
var controller = require('./controller');

router.get('/', controller.getQs);
router.get('/:question_id/answers', controller.getAs);
//working
router.post('/:question_id/answers', controller.addAs);
//working
router.post('/', controller.addQs);
//working
router.put('/:answer_id/helpful', controller.markAH);
//working
router.put('/:question_id/helpful', controller.markQH);
//working
// router.put('/:answer_id/report', controller.reportA);
//working
router.put('/:question_id/report', controller.reportQ);
//
module.exports = router;
