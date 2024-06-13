import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Lending() {
    const [lendings, setLendings] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLendings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/lendings');
                setLendings(response.data.data);
            } catch (error) {
                if (error.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
                } else {
                    setError(error.response.data);
                }
            }
        };
        fetchLendings();
    }, [navigate]);

    const deleteLending = (id) => {
        axios.delete(`http://localhost:8000/lendings/${id}`)
            .then(() => {
                setLendings(prevLendings => prevLendings.filter(lending => lending.id !== id));
            })
            .catch((error) => {
                setError(error.response.data);
            });
    };

    return (
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    <div className="flex justify-between">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Lending</h5>
                        <Link to="/lending/create" className="px-4 py-2 mx-1 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg">
                            Tambah
                            <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                        </Link>
                    </div>
                    {error && (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">Gagal!</div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <ul>
                                    <li>{error.message}</li>
                                </ul>
                            </div>
                        </div>
                    )}
                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Nama</th>
                                    <th scope="col" className="px-6 py-4">Barang</th>
                                    <th scope="col" className="px-6 py-4">Tanggal</th>
                                    <th scope="col" className="px-6 py-4">Notes</th>
                                    <th scope="col" className="px-6 py-4">Keterangan</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-dark text-center">
                                {lendings.map((lending, id) => (
                                    <tr key={lending.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{id+1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{lending.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {lending.stuff.name} <br/>
                                            Total pinjam : {lending.total_stuff}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">{lending.date_time}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{lending.notes}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {lending.status === 0 ? (
                                                <span className="text-red-700">Belum Kembali</span>
                                            ) : (
                                                <span className="text-green-500">Sudah Kembali</span>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {lending.status === 0 ? (
                                                <div className="flex justify-center">
                                                    <button onClick={() => deleteLending(lending.id)} className="px-4 py-2 bg-gray-500 rounded-lg mr-2 font-bold text-white">Batal</button>
                                                    <Link to={`/lending/restoration/${lending.id}`} className="px-4 py-2 bg-green-500 rounded-lg font-bold text-white">Kembali</Link>
                                                </div>
                                            ) : (
                                                <button onClick={() => console.log('view lending', lending)} className="px-4 py-2 bg-purple-500 rounded-lg font-bold text-white">Lihat</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    );
}
