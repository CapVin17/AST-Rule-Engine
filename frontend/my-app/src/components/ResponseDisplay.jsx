import React from 'react'

const ResponseDisplay = ({response}) => {
  return <div className='p-4 border rounded-lg shadow mt-6'>
        <h3 className='text-gray-700 font-bold'>Response:</h3>
        <pre className='bg-gray-100 p-2 rounded mt-2'>{JSON.stringify(response,null,2)}</pre>
    </div>
}

export default ResponseDisplay