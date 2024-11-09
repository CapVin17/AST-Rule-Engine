
class Node{
    constructor(type = null,value = null,left = null,right = null)
    {
        this.type = type;
        this.value = value;
        this.left = left;
        this.right = right;
    }
};


class AST
{
    constructor()
    {
        this.root = null;
    }

    create_rule(rulestring)
    {
        if(!rulestring || typeof rulestring !== "string")
        {
            throw new Error("Invalid or missing rule string");
        }
        return this.build_tree(rulestring);
    }

    build_tree(rulestring)
    {
        if(!rulestring || typeof rulestring !== "string")
        {
            throw new Error("Invalid or missing rule string");
        }
        
        rulestring = rulestring.trim();

        if(this.is_fully_enclosed(rulestring))
        {
            rulestring = rulestring.slice(1,-1).trim();
        }

        const [operator, splitindex] = this.find_main_operator(rulestring);

        if(operator)
        {
            const left = rulestring.slice(0,splitindex).trim();
            const right = rulestring.slice(splitindex+operator.length).trim();

            return new Node("operator", operator, this.build_tree(left), this.build_tree(right));
        }

        else{
            const match = rulestring.match(/(\w+)\s*(>=|<=|>|<|===|==|=)\s*([\w\d']+)/);
            if(!match)
            {
                throw new Error(`Invalid string: "${rulestring}"`);
            }

            else{
                let [_,key,operator,value] = match;

                if(typeof value ==  'string' && value.startsWith("'") && value.endsWith("'"))
                {
                    value = value.slice(1,-1);
                }

                return new Node("operand", {key, operator, value: isNaN(value)? value: Number(value)});
            }
        }
    }

    is_fully_enclosed(rulestring)
    {
        if(rulestring[0] !== '(' || rulestring[rulestring.length - 1] !== ')') return false;

        let depth = 0;
        for(let i = 0; i < rulestring.length;i++)
        {
            if(rulestring[i] === '(' ) depth++;
            else if(rulestring[i] === ')') depth--;

            if(depth === 0 && i < rulestring.length - 1) return false;
        }

        return depth === 0;
    }

    find_main_operator(rulestring)
    {
        let depth = 0;
        let splitindex = -1;
        let operator = null;

        for(let i=0;i<rulestring.length;i++)
        {
            const char = rulestring[i];
            
            if(char === '(')
            {
                depth++;
            }

            else if(char === ')')
            {
                depth--;
            }

            if(depth === 0)
            {
                if(rulestring.slice(i,i+3) === "AND")
                {
                    operator = "AND";
                    splitindex = i;
                    break;
                }

                else if(rulestring.slice(i,i+2) === "OR" && !operator)
                {
                    operator = "OR";
                    splitindex = i;
                }
            }
        }
        return [operator, splitindex];
    }

    combine_rules(rulestrings) {
    console.log("Received rulestrings:", JSON.stringify(rulestrings, null, 2));

    if (rulestrings.length === 1) {
        try {
            this.root = this.create_rule(rulestrings[0]);
            console.log("Single rule tree created successfully:", JSON.stringify(this.root, null, 2));
        } catch (error) {
            console.error("Error creating rule tree for single rule:", error.message);
            throw new Error("Failed to create tree for single rule");
        }
    } else {
        let temp;

        try {
            temp = this.create_rule(rulestrings[0]);
            console.log(`Initial tree for rule 1 created:`, JSON.stringify(temp, null, 2));
        } catch (error) {
            console.error(`Error creating tree for rule 1:`, error.message);
            throw new Error(`Failed to create tree for rule 1`);
        }

        for (let i = 1; i < rulestrings.length; i++) {
            try {
                const subtree = this.create_rule(rulestrings[i]);
                console.log(`Tree for rule ${i + 1} created:`, JSON.stringify(subtree, null, 2));

                temp = new Node("operator", "AND", temp, subtree);
                console.log(`Combined tree after rule ${i + 1}:`, JSON.stringify(temp, null, 2));
            } catch (error) {
                console.error(`Error creating tree for rule ${i + 1}:`, error.message);
                throw new Error(`Failed to create tree for rule ${i + 1}`);
            }
        }

        this.root = temp;
        console.log("Final combined tree:", JSON.stringify(this.root, null, 2));
    }
}


    evaluate(data)
    {
        if(!this.root)
        {
            throw new Error("AST is empty. Enter rule first.");
        }

        const evaluatenode = (node) => {
            if(node.type === "operator")
            {
                const leftresult = evaluatenode(node.left);
                const rightresult = evaluatenode(node.right);
                // console.log(`Evaluating operator node: "${node.value}". Left result: ${leftresult}, Right result: ${rightresult}`); 


                if(node.value === "AND")
                {
                    return leftresult && rightresult;
                }

                else if(node.value === "OR")
                {
                    return leftresult || rightresult;
                }
            }

            else if(node.type === "operand")
            {
                const {key, operator , value} = node.value;
                const conditionResult = this.evaluate_condition(data[key], operator, value);
                // console.log(`Evaluating operand node: key="${key}", operator="${operator}", value="${value}". Condition result: ${conditionResult}`); 
                return conditionResult;
            }

            return false;
        };
        return evaluatenode(this.root);
    }

    evaluate_condition(datavalue, operator, value)
    {
        switch(operator)
        {
            case ">": return datavalue > value;
            case "<": return datavalue < value;
            case ">=": return datavalue >= value;
            case "<=": return datavalue <= value;
            case "==": return datavalue == value;
            case "===": return datavalue === value;
            case "=": return datavalue == value;
            default: throw new Error(`Invalid operand: ${operator}`);
        }
    }
}

module.exports = { AST };





    const ast = new AST();

    const rules = [
        "temperature > 30 AND humidity < 70",
        "pressure >= 1013 AND temperature <= 25",
        "wind_speed > 15 OR humidity > 80",
    ];

    ast.combine_rules(rules);

    console.log(JSON.stringify(ast.root,null,2));

// const data = {
//     age: 100, 
//     department: "Sales", 
//     salary: 100000, 
//     experience: 7,
// };

// console.log(ast.evaluate(data)); 