import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Inbound() {
  const [inbounds, setInbounds] = useState([]);
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  // Buat instance axios
  const instance = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });

  // Ambil data inbound saat komponen dimuat
  useEffect(() => {
    const fetchInbounds = async () => {
      try {
        const response = await instance.get("inbound-stuffs/data");
        setInbounds(response.data.data);
      } catch (error) {
        // Tangani error
        if (error.response && error.response.status === 401) {
          navigate("/login?message=" + encodeURIComponent("Anda belum login!"));
        } else {
          setError(error.response.data);
        }
      }
    };

    fetchInbounds();
  }, [instance, navigate]);

  // Hapus data inbound
  const deleteInbound = (id) => {
    // Kirim permintaan DELETE untuk menghapus data
    instance.delete(`inbound-stuffs/${id}`)
      .then(() => {
        // Perbarui state inbounds setelah penghapusan data
        setInbounds(prevInbounds => prevInbounds.filter(inbound => inbound.id !== id));
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
            <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Inbound</h5>
            <Link to="/inbound/create" className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg">
              Tambah
              <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
            </Link>
          </div>
          {/* Tampilkan pesan error jika ada */}
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
            <table className="min-w-full text-left text-sm font-light text-white">
              <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">No</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Total</th>
                  <th scope="col" className="px-6 py-4">Date</th>
                  <th scope="col" className="px-6 py-4">Photo</th>
                  <th scope="col" className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {/* Map data inbound */}
                {inbounds.map((inbound, index) => (
                  <tr key={inbound.id} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">{inbound.stuff ? inbound.stuff.name : '-'}</td>
                    <td className="whitespace-nowrap px-6 py-4">{inbound.total}</td>
                    <td className="whitespace-nowrap px-6 py-4">{inbound.date}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <img src={`http://localhost:8000/upload-images/${inbound.proff_file}`} className="w-16 h-16 object-cover rounded" alt="Inbound Photo" />
                    </td>
                    <img src="http://localhost:8000/upload-images/6_17092512001716713160.jpg"/>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link to={`/inbound/show/${inbound.id}`} className="px-4 py-2 bg-orange-500 rounded-lg mr-2 font-bold text-white">
                        Show
                      </Link>
                      <button type="button" onClick={() => deleteInbound(inbound.id)} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white">Hapus</button>
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
