
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import Entete from '../components/Entete';
function Dashboard() {
  // tocken
  const [token, setToken] = useState(localStorage.getItem('token'));
  // get client
  const [client, setClient] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUser = async () => {
    setLoading(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      'http://localhost:9000/admin/getUser',
      config
    );
    setClient(data);
    setLoading(false);
    console.log(data)
  };

  // deletclient 
  const deleteClient = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(
      `http://localhost:9000/admin/deleteClient/${id}`,
      config
    );
    console.log(data)
    if (data) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Client deleted',
        showConfirmButton: false,
        timer: 1500
      })
      fetchUser();
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, [token]);



  return (
    <div>
 <Entete/>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
       
      {/*  */}
        <div className="col-span-12 mt-8">
          <div className="flex items-center h-10 intro-y">
            <h2 className="mr-5 text-lg font-medium truncate">Dashboard</h2>
          </div>
          <div className="grid grid-cols-12 gap-6 mt-5">
            <a className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
              href="#">
              <div className="p-5">
                <div className="flex justify-between">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-400"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 14c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zM12 14a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>

                  <div
                    className="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                    <span className="flex items-center">30%</span>
                  </div>
                </div>
                <div className="ml-2 w-full flex-1">
                  <div>
                    <div className="mt-3 text-3xl font-bold leading-8">4.510</div>

                    <div className="mt-1 text-base text-gray-600">Client</div>
                  </div>
                </div>
              </div>
            </a>
            <a className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
              href="#">
              <div className="p-5">
                <div className="flex justify-between">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-400"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div
                    className="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                    <span className="flex items-center">30%</span>
                  </div>
                </div>
                <div className="ml-2 w-full flex-1">
                  <div>
                    <div className="mt-3 text-3xl font-bold leading-8">4.510</div>

                    <div className="mt-1 text-base text-gray-600">Item Sales</div>
                  </div>
                </div>
              </div>
            </a>
            <a className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
              href="#">
              <div className="p-5">
                <div className="flex justify-between">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-pink-600"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  <div
                    className="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                    <span className="flex items-center">30%</span>
                  </div>
                </div>
                <div className="ml-2 w-full flex-1">
                  <div>
                    <div className="mt-3 text-3xl font-bold leading-8">4.510</div>

                    <div className="mt-1 text-base text-gray-600">Item Sales</div>
                  </div>
                </div>
              </div>
            </a>
            <a className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
              href="#">
              <div className="p-5">
                <div className="flex justify-between">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-400"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  <div
                    className="bg-blue-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                    <span className="flex items-center">30%</span>
                  </div>
                </div>
                <div className="ml-2 w-full flex-1">
                  <div>
                    <div className="mt-3 text-3xl font-bold leading-8">4.510</div>

                    <div className="mt-1 text-base text-gray-600">Item Sales</div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* table */}
        <div className="col-span-12 mt-5">
          <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h1 className="font-bold text-base">Table</h1>
              <div className="mt-4">
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto">
                    <div className="py-2 align-middle inline-block min-w-full">
                      <div
                        className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th
                                className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex cursor-pointer">
                                  <span className="mr-2">PRODUCT NAME</span>
                                </div>
                              </th>
                              <th
                                className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex cursor-pointer">
                                  <span className="mr-2">Stock</span>
                                </div>
                              </th>

                              <th
                                className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex cursor-pointer">
                                  <span className="mr-2">ACTION</span>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {client.map((client) => (
                              <tr>
                                <td
                                  className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>{client.nom}</p>
                                  <p className="text-xs text-gray-400">{client.prenom}</p>

                                </td>
                                <td
                                  className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>{client.email}</p>
                                </td>


                                <td
                                  className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <div className="flex space-x-4">
                                    {/* <a href="#" className="text-blue-500 hover:text-blue-600">
                                      <svg xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 mr-1"
                                        fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                      </svg>
                                      <p>Edit</p>
                                    </a> */}
                                    <button
                                      className="text-red-500 hover:text-red-600"
                                      onClick={() => deleteClient(client._id)}>

                                      <svg xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 mr-1 ml-3"
                                        fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                      <p>Delete</p>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard