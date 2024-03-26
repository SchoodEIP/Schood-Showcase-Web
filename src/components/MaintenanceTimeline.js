import React, {useEffect, useState} from 'react'
import "../CSS/maintenance.css"

export default function MaintenanceTimeline () {
    const [date, setDate] = useState("")
    const [description, setDescription] = useState('')
    const [features, setFeatures] = useState("")
    const [message, setMessage] = useState('')

    const handleDateChange = (event) => {
        setDate(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleFeaturesChange = (event) => {
        setFeatures(event.target.value)
    }

    const handleNewTimeline = async (event) => {
        event.preventDefault();

        const payload = {
            "date": date,
            "description": description,
            "newFeatures": [features]
        }

        const projectURL = process.env.REACT_APP_BACKEND_URL + '/timeline'

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
        <div id="timeline-maintenance-container">
            <h1>Timeline Content</h1>
            <div id="response-container"></div>
            <input type="date" id="date-input" value={date} onChange={handleDateChange} />
            <input placeholder='Description' type="text" id="description-input" value={description} onChange={handleDescriptionChange} />
            <input placeholder="Features" type="text" id="features-input" value={features} onChange={handleFeaturesChange} />
            <button type="submit" onClick={handleNewTimeline}>Ajouter</button>
        </div>
    )
}

