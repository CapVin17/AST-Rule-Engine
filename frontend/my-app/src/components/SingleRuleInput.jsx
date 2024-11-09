import React, { useState } from 'react';

const SingleRuleInput = ({ onSubmit }) => {
    const [rule,setRule] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(rule.trim())
        {
            onSubmit(rule);
            setRule('');
        }
    };

    return <div>
        <form onSubmit={handleSubmit} className='p-4 border rounded-lg shadow'>
        <label className='block text-gray-700 font-bold mb-2'>Enter a Single Rule: </label>
        <input
            type = "text"
            value = {rule}
            onChange={(e) => setRule(e.target.value)}
            className='w-full p-2 border rounded'
            placeholder='e.g., temperature > 30'
        />
        <div className='flex flex-row justify-center'>
            <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>
            Submit Rule
            </button>
        </div>
        </form>
    </div>
};

export default SingleRuleInput