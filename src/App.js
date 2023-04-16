import './App.css';
import Navbar from './components/Navbar';
import React, { useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import Loading from './components/Loading'
import { Search, PlayCircleFilled } from '@mui/icons-material';
import { nanoid } from 'nanoid';
import { motion } from 'framer-motion'

function App() {

  const [darkMode, setDarkMode] = useLocalStorageState('darkmode', { defaultValue: [false] })
  const [searchTerm, setSearchTerm] = useState('')
  const [phraseData, setPhraseData] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  async function callAPI() {
    setIsLoading(true)
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
    const data = await response.json()
    setPhraseData(data)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }


  function handleChange(e) {
    setSearchTerm(e.target.value)
  }

  function playSound(sound) {
    new Audio(sound).play()
  }


  function PlayButton() {

    const emptyArr = []
    phraseData[0].phonetics.forEach((phonetic, index) => {
      if (phonetic.audio && (phonetic.text === phraseData[0].phonetic || phonetic.text === phraseData[0].phonetics[0])) {
        emptyArr.push(phonetic)
      }
    })
    if (emptyArr.length > 0) {

      return <PlayCircleFilled className="text-violet-400 cursor-pointer" sx={{ fontSize: 64 }} onClick={(sound) => playSound(emptyArr[0].audio)} />
    }
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode)
  }


  function handleSubmit(e) {
    e.preventDefault()
    if (!searchTerm) {
      setError(`It won't work unless you will type something :)`)
    }
    else {
      callAPI()
      setError('')
    }
  }

  function WordDescription() {

    return isLoading ? <Loading
      darkMode={darkMode}
    /> : (
      <>
        <div className="mx-8 my-4 flex justify-between items-center">
          <div>
            <h1 className={darkMode ? "font-bold text-5xl text-gray-100" : "font-bold text-5xl"}>{phraseData[0]?.word}</h1>
            {/* <span className="text-violet-400 text-xl">{phraseData[0]?.phonetic}</span> */}
            <span className="text-violet-400 text-xl">{phraseData[0]?.phonetic ? phraseData[0]?.phonetic : phraseData[0]?.phonetics[1]?.text}</span>
          </div>
          <div>
            <PlayButton />
          </div>
        </div>
        {phraseData.length > 0 &&
          phraseData[0].meanings.map((meaning, index) => {
            return (
              <div key={index} className={darkMode ? "mx-8 text-gray-100" : "mx-8 text-gray-900"}>
                <div className="my-8 text-2xl"><span className={darkMode ? "pr-6 bg-gray-900 font-bold" : "pr-6 bg-white font-bold"}>{meaning.partOfSpeech}</span><hr className={darkMode ? "-mt-3" : "-mt-3"} /></div>
                <div className={darkMode ? "text-gray-300 font-bold mb-2" : "text-gray-500 font-bold mb-2"}>Meaning</div>
                <ul className="">
                  {phraseData[0].meanings[index].definitions.length > 0 && <li className="ml-8 before:content-['\2022'] before:mr-2 before:text-violet-500 before:text-xl">{meaning.definitions[0].definition}</li>}
                  {phraseData[0].meanings[index].definitions.length > 1 && <li className="ml-8 before:content-['\2022'] before:mr-2 before:text-violet-500 before:text-xl">{meaning.definitions[1].definition}</li>}
                  {phraseData[0].meanings[index].definitions.length > 2 && <li className="ml-8 before:content-['\2022'] before:mr-2 before:text-violet-500 before:text-xl">{meaning.definitions[2].definition}</li>}
                </ul>
                {phraseData[0].meanings[index].synonyms.length > 0 && <><div className="text-gray-500 font-medium my-4">Synonyms</div>
                  <div className="mx-4 flex gap-3 flex-wrap">{phraseData[0].meanings[index].synonyms.map((synonym, idx) => {
                    return <span key={idx} className={darkMode ? "text-violet-400 font-semibold" : "text-violet-600 font-semibold"}>{synonym}</span>
                  })}
                  </div></>}

              </div>

            )
          })
        }
        <hr className="m-8" />
        <span className={darkMode ? "mx-8 mb-4 text-gray-100 font-bold" : "mx-8 mb-4 text-gray-900 font-bold"}>Source</span>
        <a href={phraseData[0]?.sourceUrls[0]} target="_blank" className={darkMode ? "mx-8 text-gray-100" : "mx-8 mb-4 text-gray-900"}>{phraseData[0]?.sourceUrls[0]}</a>

      </>

    )
  }

  function NoDataFound() {
    if (searchTerm && phraseData) {
      return (
        <div className={darkMode ? "my-4 mx-8 text-center  text-gray-100" : "my-4 mx-8 text-center  text-gray-900"}>{phraseData.message}</div>
      )
    }
  }


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} className={darkMode ? "w-full h-full bg-gray-900" : "w-full h-full bg-white"}>
      <motion.div initial={{ opacity: 0, y: "-100%" }} animate={{ opacity: 1, y: "0" }} transition={{ duration: 1, ease: "easeOut" }} className={darkMode ? "w-full min-h-screen flex flex-col sm:w-2/3 lg:w-3/5 xl:w-1/2 mx-auto p-8 pb-16 bg-gray-900" : "w-full min-h-screen flex flex-col sm:w-2/3 lg:w-3/5 xl:w-1/2 mx-auto p-8 pb-16 bg-white"}>
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <form className="px-8 relative" onSubmit={handleSubmit}>
          <Search className="absolute right-12 top-12 text-violet-400 cursor-pointer" onClick={handleSubmit} />
          <input className={darkMode ? "w-full border-0 p-4 my-8 bg-gray-200 rounded-xl focus:outline-0" : "w-full border-0 p-4 my-8 bg-gray-100 rounded-xl focus:outline-0"} value={searchTerm} onChange={handleChange} placeholder="Search..." />
          <div className="text-red-500 my-2 text-center">{error.length > 0 && error}</div>
        </form>
        {phraseData.length > 0 ? <WordDescription /> : <NoDataFound />}
      </motion.div>
    </motion.div>
  );
}

export default App;
