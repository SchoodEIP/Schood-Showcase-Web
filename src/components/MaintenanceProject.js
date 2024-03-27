import React, {useState} from 'react'
import "../CSS/maintenance.css"

export default function MaintenanceProject () {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('')
    const [message, setMessage] = useState('')

    const handleProjectName = (event) => {
        setProjectName(event.target.value)
    }

    const handleProjectDescription = (event) => {
        setProjectDescription(event.target.value)
    }

    const handleNewProject = async (event) => {
        event.preventDefault();

        const payload = {
            "name": projectName,
            "description": projectDescription,
            "contacts": []
        }

        const projectURL = process.env.REACT_APP_BACKEND_URL + '/project'

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
            setMessage('Un nouveau paragraphe a été ajouté à la description')
            setProjectDescription('')
            setProjectName('')
          }
        })
          .catch(error => setMessage(error.message))
    }

    return (
        <div id="project-maintenance-container">
            <h1>Project Content</h1>
            <div id="projects-container"></div>
            <input type="text" id="project-name" placeholder='Titre du paragraphe' value={projectName} onChange={handleProjectName}/>
            <textarea id="project-description" placeholder="Contenu du paragraphe" value={projectDescription} onChange={handleProjectDescription}/>
            <button type="submit" onClick={handleNewProject}>Ajouter</button>
            {message ? <p style={{color:"red"}}>{message}</p> : ''}
        </div>
    )
}

