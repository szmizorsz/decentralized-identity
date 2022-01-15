import { useState } from 'react'
import {
  getRecord
} from './utils/identityUtils'

function App() {
  const [profile, setProfile] = useState({})
  const [loaded, setLoaded] = useState(false)

  async function readProfile() {
    try {
      const { record } = await getRecord()
      if (record) {
        setProfile(record)
        console.log(profile)
      }
    } catch (error) {
      console.log(error)
    }
    setLoaded(true)
  }

  return (
    <div className="App">
      <button onClick={readProfile}>Read Profile</button>
      {(Object.keys(profile).length === 0 && loaded) && <h4>No profile, please create one... </h4>}
    </div>
  );
}

export default App;
