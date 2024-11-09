import React, { useState } from 'react'

const MultipleRulesInput = ({ onSubmit }) => {
    const [rules,setRules] = useState(['']);

    const handleRuleChange = (index,value) => {
        const updateRules = [...rules];
        updateRules[index] = value;
        setRules(updateRules);
    };

    const handleAddRule = () => {
        setRules([...rules,'']);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nonEmptyRules = rules.filter((rule) => rule.trim() !== '');
        onSubmit(nonEmptyRules);
    };

    
  return <div>
    <form onSubmit={handleSubmit} className='p-4 border rounded-lg shadow mt-6'>
    <label className='block text-gray-700 font-bold mb-2'>
    Enter Multiple Rules: 
    </label>
    {rules.map((rule,index) => (
        <input 
            key = {index}
            type='text'
            value={rule}
            onChange={(e) => handleRuleChange(index,e.target.value)}
            className='w-full p-2 border rounded mt-2'
            placeholder={`Rule ${index+1}`}
        />
    ))}
    <div className='flex flex-row justify-center'>
    <button type='button' onClick={handleAddRule} className='mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded'>
        Add Rule
    </button>
    <button type='submit' className='mt-4 ml-2 bg-blue-500 text-white px-4 py-2 rounded'>
        Submit Rules
    </button>
    </div>
    </form>
  </div>
};

export default MultipleRulesInput