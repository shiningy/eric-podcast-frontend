import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe"

export const Header:React.FC = () => {
    const { data } = useMe();
    return (
        <header className="py-4 bg-gray-900">
            <div className="w-full px-5 xl:px-0 mx-auto max-w-screen-xl flex justify-between">
                <h1 className="flex-none text-black-400 text-xl font-bold px-2 py-1 rounded-lg bg-red-100">
                    <Link to="/">
                        Nomad!
                    </Link>
                </h1>
                <div className="w-1/2">
                    <input className="flex-grow w-4/5 focus:outline-none border-2 border-gray-400 p-1 rounded-md" placeholder="Search Podcasts..."/>
                </div>
                <span className="flex-none bg-gray-100 px-1 py-1 rounded-full">
                    <Link className="hover:underline flex p-1" to="/user-profile">
                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {/* {data?.me.email} */}
                    </Link>
                </span>
            </div>
        </header>
    )
}