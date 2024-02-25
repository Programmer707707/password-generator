import { useCallback, useState, useEffect} from 'react';
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const generatePassword = useCallback(()=> {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+"

    for(let i=1; i<length; i++){
        const char = Math.floor(Math.random() * str.length + 1); 
        pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    alert("Password copied to clipboard")
  }


  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 mt-52 py-3 my-8 bg-blue-800 text-white hover:transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl transition duration-300'>
      <h1 className='text-2xl font-bold mb-2 text-center my-2'>Password generator</h1>

      <div className='flex shadow rounded-lg overflow-hidden mb-4 mt-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3 text-black font-bold' placeholder='Password' readOnly/>
          <button className='outline-none bg-green-600 w-28 hover:bg-green-700 text-white font-bold py-2 px-4' onClick={copyPasswordToClipBoard}>Copy</button>
      </div>

      <div className='flex text-sm gap-x-4'>
        <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={40} value={length} className='cursor-pointer' onChange={(e)=> setLength(e.target.value)}/>
            <label htmlFor="length">Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
           <input type="checkbox" defaultChecked={numberAllowed} onChange={()=> setNumberAllowed((prev)=> !prev)} />
           <label htmlFor="number" >Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
           <input type="checkbox" defaultChecked={charAllowed} onChange={()=> setCharAllowed((prev)=> !prev)} />
           <label htmlFor="chars">Characters</label>
        </div>
      </div>

    </div>
  )
}

export default App
