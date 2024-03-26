import React, {useEffect, useState} from 'react'
import "../CSS/maintenance.css"

export default function MaintenanceTeam () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('')
    const [base64, setBase64] = useState('')
    const [message, setMessage] = useState('')

    const handleFirstName = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastName = (event) => {
        setLastName(event.target.value)
    }

    const handlePicture = async (event) => {
      const file = event.target.files[0];
      if (file) {
          const reader = await new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
              setBase64(reader.result);
          };
      }

    }

    const handleRole = (event) => {
        setRole(event.target.value)
    }

    const handleDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleNewMember = async (event) => {
        event.preventDefault();

        const payload = {
            "firstname": firstName,
            "lastname": lastName,
            "picture": base64,
            "role": role,
            "description": description,
        }

        const projectURL = process.env.REACT_APP_BACKEND_URL + '/team'

        fetch(projectURL, {
          method: 'POST',
          headers: {
            'x-auth-token': sessionStorage.getItem('maintenanceToken'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }).then(response => {
          if (response.status !== 200) {
            setMessage(response.status + ' error : ' + response.statusText)
          } else {
            setMessage('Un nouveau membre a été ajouté à l\'équipe')
          }
        })
          .catch(error => setMessage(error.message))
    }

    return (
        <div id="team-maintenance-container">
            <h1>Team Content</h1>
            <div id="response-container"></div>
            <input type="text" id="member-firstname" placeholder="Prénom" value={firstName} onChange={handleFirstName}/>
            <input type="text" id="member-lastname" placeholder="Nom" value={lastName} onChange={handleLastName}/>
            <input type='file' accept='.jpg, .jpeg, .png' id="member-picture" onChange={handlePicture}/>
            {base64 && <img id="team-image" src={base64} alt={"uploaded image"}/>}
            <input type="text" id="member-role" placeholder="Rôle" value={role} onChange={handleRole}/>
            <input type="text" id="member-description" placeholder="Description" value={description} onChange={handleDescription}/>
            <button type="submit" onClick={handleNewMember}>Ajouter</button>
        </div>
    )
}

