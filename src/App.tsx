import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { User, UserDTO } from './Types.ts'

function App() {
  const [user, setUser] = useState({} as User);
  const [userIsLoaded, setUserIsLoaded] = useState(false);

  const [name, setName] = useState("");
  const [editingName, setEditingName] = useState(false);
  
  useEffect(() => {

    const fetchUser = async () => {
      await fetch("https://randomuser.me/api/").then(async response => {
        const json: UserDTO = await response.json();
        return json.results[0] as User;
      }).then(user => {
        setUser(user)
        setName(`${user.name.first} ${user.name.last}`)
        setUserIsLoaded(true);
      });
    };

    fetchUser();
  }, []);

  const changeName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setName(event.currentTarget.value);
      setEditingName(false);
    }
  }

  return <>
    <header className="header">
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <h1>React Lab 1</h1>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </header>

    {
      userIsLoaded && (
        <main className="main">
          <div className="main--header">
            <h2>
              <span>{user.name.title} </span>
              {
                !editingName ? <span onClick={e => setEditingName(true)}> {name}</span> : <input className="main--header--name" type="text" defaultValue={name} onKeyUp={event => changeName(event)}/>
              }
            </h2>
          </div>
          <div className="main--user">
            <img src={user.picture.large} alt="User Photo" />
            <div className="main--user--details">
              <span><b>Age:</b> {user.dob.age}</span>
              <span><b>Gender:</b> {user.gender}</span>
              <span><b>Email:</b> {user.email}</span>
              <span><br /><b>Address:</b></span>

              <span>{user.location.street.number} {user.location.street.name}</span>
              <span>{user.location.postcode}, {user.location.city}</span>
              <span>{user.location.country}</span>
            </div>
            
          </div>
        </main>
      )
    }


  </>
}

export default App
