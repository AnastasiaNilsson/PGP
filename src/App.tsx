import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { User, UserDTO } from './Types.ts'

function App() {
  const [user, setUser] = useState({} as User);
  const [userIsLoaded, setUserIsLoaded] = useState(false);

  useEffect(() => {

    const fetchUser = async () => {
      return await fetch("https://randomuser.me/api/").then(async response => {
        const json: UserDTO = await response.json();
        return json.results[0] as User;
      });
    };

    fetchUser().then(result => {
      setUser(result);
      setUserIsLoaded(true);
    });

  }, []);

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
          <h2>{user.name.title} {user.name.first} {user.name.last} (age {user.dob.age})</h2>
          <p>Address: {user.location.street.number} {user.location.street.name}, {user.location.postcode}, {user.location.city}, {user.location.country}</p>
        </main>
      )
    }


  </>
}

export default App
