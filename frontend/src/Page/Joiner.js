import { useEffect, useState } from 'react';
import axios from 'axios';
import {Circles, RotatingLines} from "react-loader-spinner";

//Loading Component


export const Joiner = ({ account }) => {
  const [isMining, setIsMining] = useState(false);
  const [reqData, setReqData] = useState([]);

  useEffect(() => {
    async function getMinerData() {
      try {
        const response = await axios.get('http://localhost:5000/miner');
        const tempdata = response.data;

          setReqData(tempdata)
      } catch (error) {
        console.error(error);
      }
    }
    getMinerData();
  }, [reqData]);

  // Join as miner call

  const join = async () => {
    try {
      const response = await axios.post('http://localhost:5000/join', {
        minerAddress: account[0],
      });

      if (response.status === 200) {
        setIsMining(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(reqData)

  return (
      <div className="">
        {isMining ? (
            <div className="flex items-center justify-center">
              <div className="">
                <table className="bg-white border border-gray-300 w-full">
                  <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Request id</th>
                    <th className="py-2 px-4 border-b">RequestHash</th>
                    <th className="py-2 px-4 border-b">Miner address</th>
                    <th className="py-2 px-4 border-b">Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {[reqData].map((data, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">{data?.id}</td>
                        <td className="py-2 px-4 border-b">{data?.challenge}</td>
                        <td className="py-2 px-4 border-b">{data?.miner}</td>
                        <td className="py-2 px-4 border-b">{data.isSubmmited ?
                            <div>
                              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                                <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
                              </svg>
                            </div>
                            :
                            <div>
                              <RotatingLines
                                  strokeColor="grey"
                                  strokeWidth="5"
                                  animationDuration="0.75"
                                  width="50"
                                  visible={true}
                              />
                            </div>
                        }
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
        ) : (
            <button onClick={join}>Start mining</button>
        )}
      </div>
  );
};
