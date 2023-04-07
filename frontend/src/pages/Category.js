import React from 'react'
import Entete from '../components/Entete'
import { useState, useEffect } from 'react'
import Swal from "sweetalert2";

function Category() {
    const token = localStorage.getItem('token')
    const [category, setCategory] = useState([])
    const [name, setName] = useState('')
    const [description,setDescription]=useState('')
    const [id, setId] = useState('')
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    

    const fetchCategory = async () => {
        const res = await fetch('http://localhost:9000/admin/getCategory')
        const data = await res.json()
        setCategory(data)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'nom') {  
            setName(value)
        }
        if (name === 'description') {
            setDescription(value)
        }

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:9000/admin/addCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                description
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess('')
                } else {
                    setName('')
                    setDescription('')
                    setError('')
                    setSuccess(data.message)
                    fetchCategory()
                    if(data){
                        Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'Supprimer avec succès',
                          showConfirmButton: false,
                          timer: 1500
                        })
                        // vider les champ
                       
                    }
                    
                }
            })
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:9000/admin/deleteCategory/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess('')
                } else {
                    setError('')
                    setSuccess(data.message)
                    fetchCategory()
                    if(data){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Supprimer avec succès',
                            showConfirmButton: false,
                            timer: 1500
                            })
                    }
                }
            })
    }

    useEffect(() => {
        fetchCategory()
    }, [])


    return (
        <div>
            <Entete />
            <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">

                <section class="bg-white p-20 lg:py-[120px] overflow-hidden relative z-10">
                    <div class="container">
                        <div class="flex flex-wrap lg:justify-between -mx-4">
                            <div class="w-full lg:w-1/2 xl:w-6/12 px-4">
                                <div class="max-w-[570px] mb-12 lg:mb-0">
                                    <span class="block mb-4 text-base text-primary font-semibold">
                                    Category
                                    </span>
                                    <h2
                                        class=" text-dark mb-6 uppercase font-bold  text-[32px] sm:text-[40px] lg:text-[36px] xl:text-[40px] ">
                                        Get in Category
                                    </h2>
                                    {/* list Category */}
                                    {
                                        category.map((cat) => (
                                            <div>
                                                 <div id="task" class="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150">                                                                    
                                        <div class="inline-flex items-center space-x-2">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>{
                                                cat.name
                                                }</div>
                                        </div>
                                        <div>
                                            <button
                                                class="inline-flex items-center space-x-2 text-slate-500 hover:text-slate-700 hover:cursor-pointer"
                                                onClick={() => {
                                                    handleDelete(cat._id)

                                                }}
                                                >
                                              
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-slate-500 hover:text-slate-700 hover:cursor-pointer">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                            </button>
                                        </div>
                                       </div>
                                            </div>
                                        ))
                                    }

                                        {/* map data */}
                                        {/* {category.map((cat) => (
                                            <div>
                                             <div class="inline-flex items-center space-x-2">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>

                                            </div>
                                            <div>Magic stuff</div>
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-slate-500 hover:text-slate-700 hover:cursor-pointer">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </div> 
                                            </div>
                                        ))} */}

                                 
                                    {/*  */}

                                </div>
                          </div>
                            <div class="w-full lg:w-1/2 xl:w-5/12 px-4">
                                <div class="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
                                    <form>
                                        <div className="flex -mx-3">
                                            <div className="w-full px-3 mb-5">
                                                <label for="" className="text-xs font-semibold px-1">Nom</label>
                                                <div className="flex">
                                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                                    <input type="text" name='nom'
                                                   onChange={handleInputChange}
                                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Nom Category" />
                                                </div>
                                            </div>
                                            <div className="w-full px-3 mb-5">
                                                <label for="" className="text-xs font-semibold px-1">Description</label>
                                                <div className="flex">
                                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                                    <input type="text" name='description'
                                                    onChange={handleInputChange}
                                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Description Category" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex -mx-3">
                                            <div className="w-full px-3 mb-5">

                                                <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                                                     onClick={handleSubmit}
                                                >

                                                    Ajouter</button>
                                            </div>
                                        </div>



                                    </form>
                                    <div>
                                        <span class="absolute -top-10 -right-9 z-[-1]">
                                            <svg
                                                width="100"
                                                height="100"
                                                viewBox="0 0 100 100"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                                                    fill="#3056D3"
                                                />
                                            </svg>
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>




        </div>






    )
}

export default Category