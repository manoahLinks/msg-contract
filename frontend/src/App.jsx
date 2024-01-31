import {ethers} from 'ethers';
import contractABI from './utils/abi.json';
import { useEffect, useState } from 'react';

function App() {

  const contractAddress = '0xe0bc858636393fac5485bCDCF031F42F4C6BB75c';
  const [msg, setMsg] = useState('')


  

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const [inputMessage, setInputMessage] = useState(""); // Renamed state variable
  const [getmsg, setGetmsg] = useState("display Here");

  async function sendMessageToContract() {
    // Renamed function
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.setMessage(inputMessage);
        await transaction.wait();
        console.log("msg sent");
        setInputMessage(" ");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  async function getMessageToContract() {
    // Renamed function
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.getMessage();
        setGetmsg(transaction);
        console.log(transaction);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  useEffect(() => {
    getMessageToContract()
  }, [])

  return (
    <div className="flex flex-col w-full h-screen ">
        <div className='flex p-5 justify-between'>
          <h1 className=''>MsG dApp</h1>
          {/* <button className='self-end bg-gradient-to-br from-lime-400 to-lime-200 py-2 px-4 shadow rounded-md shadow '>connect</button> */}
        </div>

        <div className='flex flex-col'>
          <div className='flex w-6/12 m-auto gap-x-4'>
            <h4 className='text-slate-300'>Onchain message:</h4>
            <h4 onClick={getMessageToContract}>{getmsg}</h4>
          </div>
            <div className='flex  w-6/12 m-auto shadow-lg p-5 rounded-lg gap-y-2'>
              <input 
                type="text" 
                className='w-full placeholder-slate-300 rounded-md border-slate-300' 
                placeholder='enter message' 
                value={inputMessage}
                onChange={(e)=>{setInputMessage(e.target.value)}}
              />
              <button onClick={sendMessageToContract} className='px-6 py-2 bg-black text-white'>Post</button>
            </div>
        </div>

    </div>
  )
}

export default App
