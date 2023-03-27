
import Entete from '../components/Entete'
import { useState, useEffect } from 'react'
import Swal from "sweetalert2";
function Repas() {
  const [Repas, setRepas] = useState([])
  const [aliments, setAliments] = useState([])
  const token = localStorage.getItem('token')
  const [selectedAliments, setSelectedAliments] = useState([]) // tableau pour stocker les aliments sélectionnés et ajoutés
  const [newAliment, setNewAliment] = useState('') // pour stocker le nouvel aliment ajouté

  // getAliment 
  const getAliment = async () => {
    const res = await fetch('http://localhost:9000/admin/getAliment', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    setAliments(data)
  }
 
  const annulerAliment = (alimentASupprimer) => {
    setSelectedAliments(selectedAliments.filter((aliment) => aliment !== alimentASupprimer));
  };
 

  const handleChange = (e) => {
    const listeAlemment = document.getElementById('listeAlemment')
    listeAlemment.innerHTML = ''
    selectedAliments.map((aliment) => {
      const div = document.createElement('div')
      //  afficher le non de alimment
      div.innerHTML = `<div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="flex-shrink-0">

        </div>
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">
            ${aliment}
          </div>
        </div>
      </div>
      <div class="ml-4">
        <div class="flex-shrink-0 flex">
        <button class="mb-5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 4.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 011.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      
        </div>
      </div>
    </div>`
      listeAlemment.appendChild(div)

    }
    )
    const { name, value } = e.target;
    switch (name) {
      case 'nom':
        setNewAliment(value);
        break;
      case 'nomAliment':
        setSelectedAliments([...selectedAliments, value]);
        break;
      default:
        break;
    }
    //afficher non aliment apré selection 


  };
  const addRepas = async () => {
    // creat data pour stocek non et nonAliment
    const dataArray = {
      nom: newAliment,
      aliments: selectedAliments
    }
    const res = await fetch('http://localhost:9000/admin/addRepas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(dataArray)

    })

    const data = await res.json()
    console.log(data)
    window.location.reload();
  }
  // getRepas
  const getRepas = async () => {
    const res = await fetch('http://localhost:9000/admin/getRepas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    setRepas(data)
    console.log('data', data)
  }

  // deleteRepas
  const deleteRepas = async (id) => {
    const res = await fetch(`http://localhost:9000/admin/deleteRepas/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
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
  useEffect(() => {
    getAliment()
    getRepas()
    // console.log('repas',Repas)

  }, [])


  return (
    <div>
      <Entete />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div class="w-full max-w-2xl mx-auto bg-white rounded-lg border border-primaryBorder  py-10 px-16 mt-6">
          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <label for="" className="text-xs font-semibold px-1">Nom</label>
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                <input type="text" name='nom'
                  onChange={handleChange}
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Nom Aliment" />
              </div>
            </div>
          </div>

          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <label for="" className="text-xs font-semibold px-1">Aliment</label>
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                <select name='nomAliment'
                  onChange={handleChange}
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Nom Aliment" >
                  <option value="">Selectionner un aliment</option>
                  {
                    aliments.map((aliment) => (
                      <option value={aliment._id}>{aliment.nom}</option>
                    ))
                  }

                </select>
              </div>
            </div>
          </div>

          {/* div pour afficher liste alemment */}
          <div
            className="w-full max-w-2xl mb-10 mx-auto bg-white rounded-lg border border-primaryBorder  py-10 px-16 mt-6">
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                list
                <div id='listeAlemment'>

                </div>
              </div>
            </div>
          </div>
          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                onClick={addRepas}
              >Ajouter</button>
            </div>
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
                            {Repas.map((Repas) => (
                              <tr>
                                <td
                                  className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>{Repas.nom}</p>
                                  <p className="text-xs text-gray-400">{Repas.prenom}</p>

                                </td>
                                <td
                                  className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <ul >
                                    {Repas.aliments.map((aliment) => (
                                      <li>{aliment.nom}</li>
                                    ))}


                                  </ul>
                                </td>


                                <td
                                  className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <div className="flex space-x-4">
                                    <a href="#" className="text-blue-500 hover:text-blue-600">
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
                                    </a>
                                    <button
                                      className="text-red-500 hover:text-red-600"
                                      onClick={() => deleteRepas(Repas._id)}
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

export default Repas