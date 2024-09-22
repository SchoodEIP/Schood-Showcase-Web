import React, {useState} from 'react'
import "../CSS/maintenance.css"

export default function MaintenanceNews () {
    const [postName, setPostName] = useState('');
    const [postContent, setPostContent] = useState('')
    const [message, setMessage] = useState('')

    const handlePostName = (event) => {
        setPostName(event.target.value)
    }

    const handlePostContent = (event) => {
        setPostContent(event.target.value)
    }

    const handleNewPost = async (event) => {
        event.preventDefault();

        const payload = {
            "name": postName,
            "content": postContent,
        }

        const postURL = process.env.REACT_APP_BACKEND_URL + '/posts'

        fetch(postURL, {
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
            setMessage('Une actualité a été ajoutée au fil d\'actualités')
            setPostContent('')
            setPostName('')
          }
        })
          .catch(error => setMessage(error.message))
    }

    return (
        <div id="post-maintenance-container">
            <h1>Fil d'actualités</h1>
            <div id="posts-container"></div>
            <input type="text" id="post-name" placeholder='Titre du paragraphe' value={postName} onChange={handlePostName}/>
            <textarea id="post-content" placeholder="Contenu du paragraphe" value={postContent} onChange={handlePostContent}/>
            <button type="submit" onClick={handleNewPost}>Ajouter</button>
            {message ? <p style={{color:"red"}}>{message}</p> : ''}
        </div>
    )
}

