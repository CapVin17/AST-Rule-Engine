import React, { useState } from 'react'

const EvaluateInput = ({ onSubmit }) => {

    const [data,setData] = useState('');
    const [ruleId, setRuleId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({data: JSON.parse(data), ruleId});
    }


  return <div>
    <form onSubmit={handleSubmit} className='p-4 border rounded-lg shadow mt-6'>
        <label className='block text-gray-700 font-bold mb-2'>Evaluate JSON Data:</label>
        <input
            type='text'
            value={ruleId}
            onChange={(e) => setRuleId(e.target.value)}
            className='w-full p-2 border rounded mb-4'
            placeholder='Rule ID'
        />
        <textarea
            value = {data}
            onChange={(e) => setData(e.target.value)}
            className='w-full p-2 border rounded'
            placeholder='Enter JSON data e.g., {"temperature": 34, "humidity" : 60 }'
        ></textarea>
        <button type='submit' className='mt-4 bg-green-500 text-white px-4 py-2 rounded'>
            Evaluate Data
        </button>
    </form>
  </div>
}

export default EvaluateInput