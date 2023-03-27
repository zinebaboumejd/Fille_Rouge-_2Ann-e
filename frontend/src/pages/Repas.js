
import Entete from '../components/Entete'
import { useState, useEffect } from 'react'

function Repas() {
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


  const handleChange = (e) => {
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
  };
  const addRepas = async () => {
// creat data pour stocek non et nonAliment
    const data = {
      nom: newAliment,
      aliments: selectedAliments
  }
    console.log(data)

}
  





  useEffect(() => {
    getAliment()

  }, [])
  // example data
//   {
//     "nom":"repa1",
//     "date":"03-03-2023",
//     "aliments":[
//         "6401d8a4abb78bd4d8f6412e",
//         "6405fcfd2bafbc038b3eec0d"
//     ]
// }

  return (
    <div>
      <Entete />
      <div classNameName="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div
          className="w-full max-w-2xl mx-auto bg-white rounded-lg border border-primaryBorder  py-10 px-16 mt-6">
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
                  {
                    aliments.map((aliment) => (
                      <option value={aliment._id}>{aliment.nom}</option>
                    ))
                  }

                </select>
              </div>
            </div>
          </div>
          {/* <button className="block w-full max-w-xs mx-auto bg-indigo-300 hover:bg-indigo-700 focus:bg-indigo-400 text-white rounded-lg px-3 py-3 font-semibold"
            id='BtnaddAliment'
            onClick={() => {
              const nomAliment = document.querySelector('select[name=nomAliment]').value
              const nom = document.querySelector('input[name=nom]').value
              const aliment = aliments.find((aliment) => aliment._id === nomAliment)
              const newAliment = {
                nom: aliment.nom,
                repas: nom
              }
              setSelectedAliments([...selectedAliments, newAliment])
              afficherListeAliment()
            }}

          >Ajouter Aliment</button> */}
          {/* div pour afficher liste alemment */}
          <div
            className="w-full max-w-2xl mx-auto bg-white rounded-lg border border-primaryBorder  py-10 px-16 mt-6">
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
      </div>
    </div>
  )
}

export default Repas