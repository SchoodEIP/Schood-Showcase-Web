import React, {useEffect, useState} from 'react'
import HeaderComp from '../components/Header'
import FooterComp from '../components/Footer'
import "../CSS/description.css"
import schoodLogo from "../assets/logo_schood.png"

export default function DescriptionPage () {
  const [content, setContent] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
      const projectURL = process.env.REACT_APP_BACKEND_URL + '/project'

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
            <div id="description-body-container">
                <img id="logo-title" src={schoodLogo} alt="SCHOOD"/>
                {message ? <p style={{color:"red"}}>{message}</p> : ''}
                {(content.length !== 0) && (
                  content.map((element, i) => (
                      <div id="description-paragraph-container">
                        <h2 id="paragraph-title">{element.name}</h2>
                        <div dangerouslySetInnerHTML={{__html: element.description}}></div>
                      </div>
                    ))
                  )
                }
            </div>
            <FooterComp/>
        </div>
    )
};