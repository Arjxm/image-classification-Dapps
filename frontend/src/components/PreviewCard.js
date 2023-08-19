import React from 'react';

const PreviewCard = ({image, handleContractCall, btnFuncName, con}) => {
    return (
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row h-96 hover:bg-gray-100">
            <div className=''>
                  <img className="object-cover w-full h-full md:h-96 md:rounded-l-lg p-4" src={image} alt="" />
            </div>
      
        <div className="flex flex-col justify-between p-4 leading-normal md:w-2/3">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
          <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {con ? 
            <div className='p-4'>
              <label htmlFor="small-input" className="block mb-2 text-sm font-medium">
                Add tip for faster result
              </label>
              <input
                type="text"
                id="small-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            :
            null
            }
            <button
            onClick={handleContractCall}
              type="button"
              className="text-white m-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
               {btnFuncName}
              <svg
                aria-hidden="true"
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
    );
};

export default PreviewCard;
