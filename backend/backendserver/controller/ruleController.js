const Rule = require('../db/db.js');
const mongoose = require('mongoose');
const { AST } = require('../../DS/ASTimplement.js');
const shortid  = require('shortid');

exports.storeSingleRule = async(req,res) => {
    try{
        console.log("Hello");
        const {rule} = req.body;
        const ast = new AST;
        const tree = ast.create_rule(rule);
        console.log("Tree created successfully");

        const newRule = new Rule({
            ruleId: new mongoose.Types.ObjectId().toString(),
            ruleString: rule,
            tree: tree,
        });

        await newRule.save();

        console.log("Rule processed successfully");

        res.status(200).json({message: 'Rule saved successfully', ruleId: newRule._id});
    }
    catch(err)
    {
        res.status(500).json({message: "Failed to save rule", error: err.message});
    }
};

exports.storeMultipleRules = async(req,res) => {
    try{
        const {rules} = req.body;
        console.log("Recieved rules as an array: ", rules);

        if(!rules || !Array.isArray(rules) || rules.length == 0)
        {
            return res.status(500).json({message: 'Either wrong input or no input is provided'});
        }


        const ast = new AST();

        ast.combine_rules(rules);

        console.log("Tree created successfully");
        const newRuleSet = new Rule({
            ruleId: new mongoose.Types.ObjectId().toString(),
            rules: rules,
            tree: ast.root,
        });

        await newRuleSet.save();

        console.log("Rule processed successfully");

        res.status(201).json({message: "Rules are stored successfully", ruleId: newRuleSet._id});
    }
    catch(error)
    {
        res.status(500).json({message: "Failed to store rules",error : error.message});
    }
};

exports.evaluateData = async(req,res) => {
    try{
        const {data,ruleId} = req.body;
        if(!data || !ruleId)
        {
            return res.status(400).json({message: "Please input your rule ID and data properly in correct format."});
        }
        const rule = await Rule.findById(ruleId);

        if(!rule)
        {
            return res.status(404).json({message: "Rule Not Found"});
        }

        const ast = new AST();
        ast.root = rule.tree;
        const result = ast.evaluate(data);

        res.json({isValid: result});
    }

    catch(error)
    {
        res.status(500).json({error: 'Failed to evaluate data'});
    }
};

// exports.upadateRule = async(req,res) => {
//     try{
//         const {ruleId} = req.params;
//         const { rule } = req.body;

//         const ast = new AST();
//         const tree = ast.create_rule(rule);

//         const updateRule = await Rule.findOneAndUpdate(
//             { ruleId },
//             { ruleString: rule,tree},
//             { new: true }
//         );

//         if(!updateRule.success)
//         {
//             return res.status(404).json({message: 'Rule not found'});
//         }

//         res.status(200).json({message: 'Rule updated successfully', ruleId: updateRule.ruleId});
//     }

//     catch(error)
//     {
//         res.status(404).json({message: "Failed to update rule", error: error});
//     }
// };


// A stored rule --> 672289f2d5e6f6bff9a2bb5d
