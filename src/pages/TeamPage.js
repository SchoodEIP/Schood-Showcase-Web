import React, {useEffect, useState} from 'react'
import HeaderComp from '../components/Header'
import FooterComp from '../components/Footer'
import "../CSS/team.css"

export default function TeamPage () {
    const [content, setContent] = useState([])
    const [message, setMessage] = useState('')

    const getImageUrl = (imageUrl) => {
        const fullImageUrl = imageUrl.replace('C:\\fakepath\\', 'http://20.111.49.79/');

        return fullImageUrl;
    }

    useEffect(() => {
        const projectURL = process.env.REACT_APP_BACKEND_URL + '/team'

        fetch(projectURL, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                setContent(data)
            })
            .catch(error => /* istanbul ignore next */ {setMessage(error.message)})
    }, [])

    return (
        <div>
            <HeaderComp/>
            <div id="team-body-container">
                {message ? <p style={{color:"red"}}>{message}</p> : ''}
                {(content.length !== 0) && (
                  content.map((element, i) => (
                      <div id="member-container">
                        <img id="member-image" src={getImageUrl(element.picture)} alt="team member"/>
                        <h3 className="text-style">{element.firstname} {element.lastname}</h3>
                        <h3 className="text-style">{element.role}</h3>
                      </div>
                    ))
                  )
                }
            </div>
            <FooterComp/>
        </div>
    )
};
