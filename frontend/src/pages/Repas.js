
import Entete from '../components/Entete'
import { useState, useEffect } from 'react'

function Repas() {
  const [aliments, setAliments] = useState([])

  const token = localStorage.getItem('token')
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

  useEffect(() => {
    getAliment()

  }, [])


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
                                <input type="text" name='nomAliment' className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Nom Aliment" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <label for="" className="text-xs font-semibold px-1">Aliment</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <select name='nomAliment' className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Nom Aliment" >
                                   {
                                        aliments.map((aliment) => (
                                            <option value={aliment._id}>{aliment.nom}</option>
                                        ))
                                   }
                                    </select>
                            </div>
                        </div>
                    </div>
                   
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Ajouter</button>
                        </div>
                    </div>
                </div>
</div>
</div>
  )
}

export default Repas