import React,{useState} from 'react'
import Entete from '../components/Entete'

function Aliment() {

    const token=localStorage.getItem('token')
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
         // Rafraîchir la page
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
        })

        console.log(aliment);
      };
  return (
    <div>
    <Entete />
    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
    <div  class="w-full max-w-2xl mx-auto bg-white rounded-lg border border-primaryBorder  py-10 px-16 mt-6">
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

</div>
</div>
  )
}

export default Aliment