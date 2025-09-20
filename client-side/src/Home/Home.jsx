import { useState, useEffect, useContext } from "react";
import { Toaster } from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';



import Card from "../components/Card.jsx";
import Pagination from "../components/Pagination.jsx";
import { NotifyUser } from '../components/Notification.jsx'
import { useSelector, useDispatch } from "react-redux"
import { setUserData } from '../app/authSlice.js'
import { allCategories } from '../assets/categories.js'



const PORT = import.meta.env.VITE_BACKEND_URL;


const Home = () => {

    // universal-parameters
    const [WebData, setWebData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [noResults, setNoResults] = useState(false);



    //Trying Redux
    const state = useSelector(state => state.admin.status)
    const dispatch = useDispatch();
    // console.log(`admin value present in the REDUXX STATE: ${state}`);



    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        if (value && value.length > 0) {
            const filtered = filteredData.filter(
                (obj) =>
                    obj.name.toLowerCase().includes(value) ||
                    obj.tags.some((tag) => tag.toLowerCase().includes(value))
            );
            if (filtered && filtered.length > 0) {
                setNoResults(false)
                setWebData(filtered);
            }
            else setNoResults(true)
        } else {
            setWebData(filteredData);
        }
    };

    const handleSortBy = (e) => {
        const value = e.target.value;
        if (value && value.length > 0) {
            let sorted = [];
            if (value === "a-z") {
                sorted = [...filteredData].sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
            } else if (value === "z-a") {
                sorted = [...filteredData].sort((a, b) =>
                    b.name.localeCompare(a.name)
                );
            }
            else if (value === "new") {
                sorted = [...filteredData].sort((a, b) =>
                    b.name.localeCompare(a.name)
                );
            }
            else {
                // // For other sort options, keep original order or implement as needed
                // sorted = [...filteredData];
                sorted = filteredData.filter(
                    (obj) =>
                        obj.tags.some((tag) => tag.toLowerCase() === value)
                );
            }
            // console.log(sorted);
            setWebData(sorted);
        }
    };



    const getDataFromServer = async () => {
        try {
            // Fetch data from server
            console.log(`Fetching data from server at: ${PORT}`);
            const res = await fetch(`${PORT}/api/web`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();
            if (!data || data.length === 0) {
                console.log("No data found from the server!");
                return;
            }
            if (data.isAdmin) {
                dispatch(setUserData(data.user.username))

            }
            setWebData(data.webs);
            setFilteredData(data.webs);
        } catch (error) {
            // console.error("Error fetching data:", error);
        }
    };



    useEffect(() => {
        getDataFromServer();
    }, []);



    // New function to handle data change notification from Card
    const handleReloadAfterDeletion = () => {
        NotifyUser('Data deleted', true, 'top-center')
        getDataFromServer();
    };


    // pagination-parameters
    // const { pageNumber } = useParams();
    var [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(30);
    // const cardsPerPage = 30;

    const totalCards = WebData.length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    // Validate currentPage to be within range
    if (currentPage < 1 || currentPage > totalPages) {
        currentPage = 1;
    }

    const endIndex = currentPage * cardsPerPage;
    const startIndex = endIndex - cardsPerPage;
    // console.log(startIndex, endIndex)
    const currentCards = WebData.slice(startIndex, endIndex);


    return (
        <div className="w-full flex flex-col justify-center items-center bg-gradient-to-r from-cyan-300 via-indigo-400 to-cyan-300 dark:from-indigo-900 dark:via-cyan-800 dark:to-indigo-900 dark:text-white text-black">
            <Toaster />

            {WebData && WebData.length > 0 &&
                (<div className="my-10 w-full flex justify-center items-center gap-5">
                    <input
                        className="p-2 border border-violet-600 dark:border-white focus:outline-none focus:shadow-md focus:shadow-violet-600 dark:focus:shadow-white rounded-xl "
                        type="text"
                        placeholder="Search by name or tag"
                        onChange={handleSearch}
                    />
                    <select className="text-white p-2 border border-violet-600 dark:border-white focus:outline-none focus:shadow-md focus:shadow-violet-600 dark:focus:shadow-white rounded-xl"
                        name="category"
                        id="category"
                        onChange={handleSearch}>
                        <option className="text-indigo-700 dark:bg-black hover:bg-white/50" value="">===Select Category===</option>
                        {allCategories.map((category, index) => (
                            <option key={index} className="text-indigo-700 dark:bg-black hover:bg-white/50" value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>)}

            <div className="w-full md:w-4/5 mx-auto border-b-2 pb-5 mt-5 flex justify-around items-center">
                <span className="justify-self-start text-white font-semibold">Total - {totalCards}</span>
                {/* <button className="bg-white/10 hover:bg-white/50 px-4 py-2 rounded-md">Sort By</button> */}
                <select
                    className="text-white p-2 border border-violet-600 dark:border-white focus:outline-none rounded-xl"
                    name="sort"
                    id="sort"
                    onClick={handleSortBy}>
                    <option className="text-indigo-700 dark:bg-black hover:bg-white/50" value="">Sort By</option>
                    <option className="text-indigo-700 dark:bg-black hover:bg-white/50" value="new">New</option>
                    <option className="text-indigo-700 dark:bg-black hover:bg-white/50" value="a-z">Name (a - z)</option>
                    <option className="text-indigo-700 dark:bg-black hover:bg-white/50" value="z-a">Name (z - a)</option>
                    <option className="text-indigo-700 dark:bg-black hover:bg-white/50" value="free">Free</option>
                    <option className="text-indigo-700 dark:bg-black hover:bg-white/50" value="premium">Premium</option>
                    <option className="text-indigo-700 dark:bg-black hover:bg-white/50" value="freemium">Freemium</option>

                </select>

            </div>


            <div className="w-full min-h-screen flex flex-wrap gap-4 justify-center items-center py-10">
                {WebData && WebData.length > 0 ? (
                    noResults ? "Oops! No results found."
                        : (currentCards.map((data, index) => (

                            <Card
                                key={index}
                                name={data.name}
                                url={data.url}
                                description={data.description}
                                tags={data.tags}
                                id={data._id}
                                onChange={handleReloadAfterDeletion}
                            />
                        )))

                ) : (
                    <h3 className="text-2xl">No data available !!</h3>
                )}
            </div>
            <div>
                <Pagination
                    postsPerPage={cardsPerPage}
                    totalPosts={WebData.length}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
                
            </div>



        </div>
    );
};

export default Home;
