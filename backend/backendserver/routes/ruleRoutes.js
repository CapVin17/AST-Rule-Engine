const express = require('express');
const router = express.Router();

const { storeSingleRule, storeMultipleRules, evaluateData } = require('../controller/ruleController');

router.post('/rule', storeSingleRule);

router.post('/rules', storeMultipleRules);

// router.put('/rule/:ruleId', updateRule);

router.post('/evaluate', evaluateData);

module.exports = router;