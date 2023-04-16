import { Book, NightlightRound } from '@mui/icons-material'
import { motion } from 'framer-motion'



const Navbar = ({ darkMode, toggleDarkMode }) => {

    return (
        <nav className={darkMode ? "p-8 text-gray-100" : "p-8 text-gray-900"}>
            <ul className="flex justify-between">
                < li className="" > <Book /></li >
                <div className="flex gap-2 ">
                    <li className="flex justify-center items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={darkMode ? true : false} className="sr-only peer" onChange={toggleDarkMode} />
                            <div className="w-9 h-5 bg-gray-500 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-violet-500"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"><NightlightRound className={darkMode ? "text-white" : "text-black"} /></span>
                        </label>
                    </li>
                </div>
            </ul >

        </nav >
    )
}

export default Navbar