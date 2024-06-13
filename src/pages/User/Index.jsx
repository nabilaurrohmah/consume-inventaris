import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

export default function User() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
  
    const instance = axios.create({
      baseURL: "http://localhost:8000/",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });

    useEffect(() => {
        instance
          .get("users", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          })
          .then((res) => {
            setUsers(res.data.data);
          })
          .catch((err) => {
            if (err.response.status === 401) {
              navigate("/login?message=" + encodeURIComponent("Anda belum login!"));
            }
          });
      }, [navigate]);

      const deleteUser = (id) => {
        instance
          .delete(user/$`{id}`)
          .then((res) => {
            location.reload();
          })
          .catch((err) => {
            setError(err.response.data);
          });
      };

      return (
        <Case>
          <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="items-center m-5 pb-10 pt-10">
              <div className="flex justify-between">
                <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">User</h5>
                <div className="flex justify-end">
                <Link to={'create'} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-orange-500 dark:bg-orange-500 dark:hover:bg-yellow-700 dark:focus:ring-green-800 mb-5 rounded-lg mr-2">Create
                <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                </Link>
                <Link to={'trash'} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mb-5 rounded-lg mr-2">Trash
                <FontAwesomeIcon icon="fa-solid fa-trash" className="pl-1 w-4 h-4 text-inherit" />
                </Link>           
                </div>
              </div>
              {Object.keys(error).length > 0 && (
                <div role="alert">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">Gagal!</div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <ul>{error.message}</ul>
                  </div>
                </div>
              )}
              <div className="flex mt-4 md:mt-6">
                <table className="min-w-full text-left text-sm font-light ">
                  <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-4">No</th>
                      <th scope="col" className="px-6 py-4">Name</th>
                      <th scope="col" className="px-6 py-4">Email</th>
                      <th scope="col" className="px-6 py-4">Role</th>
                      <th scope="col" className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {users.map((user, id) => (
                    <tr key={user.id} className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4">{id + 1}</td>
                        <td className="whitespace-nowrap px-6 py-4">{user.username}</td>
                        <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                        <td className="whitespace-nowrap px-6 py-4">{user.role}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                        <Link to={`/user/${user.id}/show`} className="px-4 py-2 bg-blue-500 rounded-lg mr-2 font-bold text-white">Show</Link>
                        <Link to={`/user/${user.id}/edit`} className="px-4 py-2 bg-green-500 rounded-lg mr-2 font-bold text-white"> Edit</Link>
                        <button type="button" onClick={() => {
                            if (window.confirm("Yakin ingin menghapus?")) {
                                deleteUser(user.id);
                            }
                            }}
                            className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white"
                        >
                            Hapus
                        </button>
                        {/* <button type="button" onClick={() => deleteUser(user.id)} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white">
                            Hapus
                        </button> */}
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