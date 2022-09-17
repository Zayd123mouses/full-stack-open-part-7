import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './componets/Country'


const useCountry =  (name) => {
  const [country, setCountry] = useState(null)
  useEffect(  () => {
    axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    .then(response=> setCountry(response.data))
    .catch(error=> setCountry(null))
   
  },[name])

  return country
}



const App = () => {
  const [name, setName] = useState('')
  const country = useCountry(name)
  const fetch = (e) => {
    e.preventDefault()
    setName(e.target.country.value)
    console.log(e.target.country.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input  name="country"/>
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
