import React, { useEffect, useState } from 'react'
import Entete from '../components/Entete'
import Swal from "sweetalert2";

function Aliment() {
    const [dataAliment, serdataAliment] = useState([])
    const token = localStorage.getItem('token')
    const [aliment, setAliment] = useState({
        nom: '',
        Calorie: '',
        Proteine: '',
        Lipide: '',
        Glucide: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAliment({ ...aliment, [name]: value });
    };
// get
const getAliment = async () => {
        const res = await fetch('http://localhost:9000/admin/getAliment', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json();
        serdataAliment(data)
        console.log(data)

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // http://localhost:9000/admin/addAliment
        fetch('http://localhost:9000/admin/addAliment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(aliment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Ajouter avec succès',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // reload() apre timer: 1500
                    setTimeout(() => {
                        window.location.reload();
                    }
                        , 1500);
                }
            })
            .catch(err => {
                console.log(err)
            })

        console.log(aliment);
    };

    //   deleteAliment
    const deleteAliment = (id) => {
        fetch(`http://localhost:9000/admin/deleteAliment/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                
              if(data){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Supprimer avec succès',
                  showConfirmButton: false,
                  timer: 1500
                })
                // reload() apre timer: 1500
                setTimeout(() => {
                    window.location.reload();
                    }
                    , 1500);
              }


            })
            .catch(err => {
                console.log(err)
            })
    }

    //   useEffect puor get Aliemt
    useEffect(() => {
       
        getAliment()
    }, [])
    return (
        <div>
            <Entete />
            <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
                <div class="w-full max-w-2xl mx-auto bg-white rounded-lg border border-primaryBorder  py-10 px-16 mt-6">
                    <form  >
                        <div class="flex -mx-3">
                            <div class="w-full px-3 mb-5">
                                <label for="" class="text-xs font-semibold px-1">Nom</label>
                                <div class="flex">
                                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input type="text" name='nom'
                                        onChange={handleInputChange}
                                        class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Nom Aliment" />
                                </div>
                            </div>
                        </div>
                        <div class="flex -mx-3">

                            <div class="w-1/2 px-3 mb-5">
                                <label for="" class="text-xs font-semibold px-1">Calorie</label>
                                <div class="flex">
                                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                    <input type="text" name='Calorie'
                                        onChange={handleInputChange}
                                        class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Calorie (g) " />
                                </div>
                            </div>
                            <div class="w-1/2 px-3 mb-5">
                                <label for="" class="text-xs font-semibold px-1">Proteine</label>
                                <div class="flex">
                                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                    <input type="text" name='Proteine'
                                        onChange={handleInputChange}
                                        class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Proteine" />
                                </div>
                            </div>
                        </div>

                        <div class="flex -mx-3">
                            <div class="w-full px-3 mb-12">
                                <label for="" class="text-xs font-semibold px-1"> Lipides </label>
                                <div class="flex">
                                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                    <input type="text" name='Lipide'
                                        onChange={handleInputChange}
                                        class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder=" Lipides " />
                                </div>
                            </div>
                            <div class="w-full px-3 mb-12">
                                <label for="" class="text-xs font-semibold px-1">Glucide</label>
                                <div class="flex">
                                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                    <input type="text" name='Glucide'
                                        onChange={handleInputChange}
                                        class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Glucide" />
                                </div>
                            </div>
                        </div>
                        <div class="flex -mx-3">
                            <div class="w-full px-3 mb-5">
                                <button
                                    onClick={handleSubmit}
                                    class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Ajouter</button>
                            </div>
                        </div>
                    </form>
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
                                                                    <span className="mr-2"></span>
                                                                </div>
                                                            </th>
                                                            <th
                                                                className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                <div className="flex cursor-pointer">
                                                                    <span className="mr-2">PRODUCT NAME</span>
                                                                </div>
                                                            </th>
                                                            <th
                                                                className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                <div className="flex cursor-pointer">
                                                                    <span className="mr-2"></span>
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
                                                        {dataAliment.map((dataAliment) => (
                                                            <tr>
                                                                <td
                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                    <p></p>
                                                                    <p className="text-xs text-gray-400"></p>

                                                                </td>
                                                                <td
                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                    <p>{dataAliment.nom}</p>
                                                                    <p className="text-xs text-gray-400">{dataAliment.prenom}</p>

                                                                </td>
                                                                <td
                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                    <p>{dataAliment.email}</p>
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
                                                                            onClick={() => deleteAliment(dataAliment._id)}
                                                                        >
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

export default Aliment