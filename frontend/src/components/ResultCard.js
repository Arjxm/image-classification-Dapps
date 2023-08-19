import React from 'react';

const ResultCard = ({image, handleContractCall, result}) => {
    return (
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row h-96 hover:bg-gray-100">
            <div className=''>
                  <img className="object-cover w-full h-full md:h-96 md:rounded-l-lg p-4" src={image} alt="" />
            </div>
      
        <div className="flex flex-col justify-between p-4 leading-normal md:w-2/3">
          <h5 className="mb-2 text-2xl font-bold tracking-tight"></h5>
          <div className="mb-3 font-normal text-gray-700">

            <div className='p-4'>
             {result}
            </div>
            <button
            onClick={handleContractCall}
              type="button"
              className="text-white m-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      
    );
};

export default ResultCard;
