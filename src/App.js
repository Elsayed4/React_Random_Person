import React, { useState ,useEffect} from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';





function App() {
  /* start state */
  const [loading,setloading] = useState(true);
  const [title,settitle] = useState('name');
  const [value,setvalue] = useState('random persone');
  const [person,setperson] = useState(null);

 const getperson = async () =>{
  setloading(true)
   const response = await fetch(url);
   const data = await response.json();
   const person = data.results[0];
   const {phone,email} = person;
   const {large:image} = person.picture;
   const {login:{password}} = person;
   const {frist,last} = person.name;
   const {dob:{age}} = person;

   const {street:{number, name}} = person.location;
   
   const newPerson = {
     image,
     phone,
     email,
     password,
     age,
     street:`${number} ${name}`,
     name:`${frist} ${last}`
   }

   setperson(newPerson);
   setloading(false);
   settitle('name');
   setvalue(newPerson.name)
 }
 
 useEffect(() => {
  getperson()
}, [])

  const handelValue = (e) =>{
    if(e.target.classList.contains('icon')){
      const newValue = e.target.dataset.label;
      settitle(newValue);
      setvalue(person[newValue])
    }
  }


  return (
    <main style={{marginTop:'300px'}}>
     <div className='block bcg-black'>
        <div className='block'>
           <div className='container'>
             <img src={(person && person.image) || defaultImage} alt="random person" className='user-img'/>
             <p className='user-title'>my {title} is</p>
             <p className='user-value'> {value}</p>
             <div className='values-list'>
               
                <button className='icon' data-label='name' onMouseOver={handelValue}>
                 <FaUser />
                </button>

                <button className='icon' data-label='email' onMouseOver={handelValue}>
                 <FaEnvelopeOpen />
                </button>

                <button className='icon' data-label='age' onMouseOver={handelValue}>
                 <FaCalendarTimes />
                </button>

                <button className='icon' data-label='street' onMouseOver={handelValue}>
                 <FaMap />
                </button>

                <button className='icon' data-label='phone' onMouseOver={handelValue}>
                 <FaPhone />
                </button>

                <button className='icon' data-label='password' onMouseOver={handelValue}>
                 <FaLock />
                </button>
              
                <button className='btn' type='button' onClick={getperson}>
                  {
                    loading ? 'loading...':'random user' 
                  }
                </button>
              

             </div>
           </div>
        </div>
     </div>
    </main>
  )

}

export default App
