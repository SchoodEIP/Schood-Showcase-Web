import React, {useState} from 'react'
import "../CSS/maintenance.css"

export default function MaintenanceTimeline () {
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [description, setDescription] = useState('')
    const [features, setFeatures] = useState("")
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState('')

    const handleFromDateChange = (event) => {
        setFromDate(event.target.value)
    }

    const handleToDateChange = (event) => {
      setToDate(event.target.value)
    }

    const handleTitleChange = (event) => {
      setTitle(event.target.value)
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
            "title": title,
            "fromDate": fromDate,
            "toDate": toDate,
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
            setMessage('Une nouvelle étape a été ajoutée')
            setFromDate('')
            setToDate('')
            setDescription('')
            setFeatures('')
            setTitle('')
          }
        })
          .catch(error => setMessage(error.message))
    }

    return (
        <div id="timeline-maintenance-container">
            <h1>Timeline Content</h1>
            <div id="response-container"></div>
            <label>
              Du:
              <input type="date" id="date-input" value={fromDate} onChange={handleFromDateChange} title="Au:" />
            </label>
            <label>
              Au:
              <input type="date" id="date-input" value={toDate} onChange={handleToDateChange} title="Du:"/>
            </label>
            <input placeholder='Title' type="text" id="title-input" value={title} onChange={handleTitleChange} />
            <input placeholder='Description' type="text" id="description-input" value={description} onChange={handleDescriptionChange} />
            <input placeholder="Features" type="text" id="features-input" value={features} onChange={handleFeaturesChange} />
            <button type="submit" onClick={handleNewTimeline}>Ajouter</button>
            {message ? <p style={{color:"red"}}>{message}</p> : ''}
        </div>
    )
}

