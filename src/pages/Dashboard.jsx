import React, {useEffect, useState} from "react";
import Case from "../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Bar, BarChart, Tooltip } from "recharts";

export default function Dashboard(){
    const [stuffs, setStuffs] = useState([]);
    const [users, setUsers] = useState([]);
    const [checkProses, setCheckProses] = useState(false)
    const [lendingGrouped,setLendingGrouped] = useState([])
    const [inbounds,setInbound] = useState([])
    const navigate = useNavigate();

    useEffect(()=> {
        getDataStuffs();
        getDataUsers(); 
        getDataLendings();
        getDataInbound();
    },[checkProses]);

    function getDataStuffs() {
        axios.get('http://localhost:8000/stuffs', {
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setStuffs(res.data.data);
            })
            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'))
                }
            })
    }

    function getDataUsers() {
        axios.get('http://localhost:8000/users', {
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setUsers(res.data.data);
            })
            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'))
                }
            })
    }

    function getDataInbound() {
        axios.get('http://localhost:8000/inbound-stuffs/data', {
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setInbound(res.data.data);
            })
            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'))
                }
            })
    }

    function getDataLendings(){
        axios.get('http://localhost:8000/lendings', {
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            const data = res.data.data
            //mengelompokkan data (date_time)
            console.log(res.data)
            const groupedData = {}
            data.forEach((entry) => {
                const date = new Date(entry.date_time)
                const formattedDate = `${date.getDate()}-${date.getMonth() + 1 }-${date.getFullYear()}`
                if (!groupedData[formattedDate]) {
                    groupedData[formattedDate] = []
                }
                groupedData[formattedDate].push(entry.total_stuff)
            });
            // console.log('before', groupedData)
            // date dan totalStuff
            const processedData = Object.keys(groupedData).map((date) => ({
                date, 
                totalStuff: groupedData[date].reduce((accumulator, current) => {
                    // return (accumulator) ? accumulator + current.total_stuff : 0 + current.total_stuff
                    // console.log('date', date, 'acc', accumulator, 'current', current.total_stuff, 'result', accumulator+current.total_stuff)
                    return accumulator + current
                }, 0)
                // totalStuff: groupedData[date].reduce((acc, entry) => {
                //     console.log('grouped', groupedData[date])
                //     // acc + entry.totalStuff, 0
                //     console.log('acc', entry)
                // })
            }))
            setLendingGrouped(processedData)
            console.log(processedData)
            setCheckProses(true)
        })
        .catch(err => {
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'))
            }
        })
    }
    return (
        <Case>
            <div className="flex flex-wrap justify-center m-10">
                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data Stuff</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{stuffs.length}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-7 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" className="w-5 h-3" viewBox="0 0 30 25">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data User</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{users.length}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 5">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data Inbound</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{inbounds.length}</h1>
                        </div>
                    </div>
                </div>

                {checkProses ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={lendingGrouped} 
                        margin={
                            {
                            top: 30,
                            right:40, 
                            left: 20,
                            bottom: 5,
                           }
                        }
                    >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalStuff" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                ): ''}
            </div>
         </Case>
    )
}