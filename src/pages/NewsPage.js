import React, {useEffect, useState} from 'react'
import HeaderComp from '../components/Header'
import FooterComp from '../components/Footer'
import "../CSS/news.css"
import schoodLogo from "../assets/logo_schood.png"
import moment from 'moment'

export default function NewsPage () {
  const [content, setContent] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
      const projectURL = process.env.REACT_APP_BACKEND_URL + '/posts'

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
                <h1>Fil d'actualités</h1>
                <div id="news-container">
                    {message ? <p style={{color:"red"}}>{message}</p> : ''}
                    {(content.length !== 0) && (
                    content.map((element, i) => (
                        <div id="post-container">
                            <div id="post-top">
                                <h2 id="post-title">{element.title}</h2>
                                <span>{moment(element.date).format('DD/MM/YYYY')}</span>
                            </div>
                            <div id="post-content" dangerouslySetInnerHTML={{__html: element.content}}></div>
                        </div>
                        ))
                    )
                    }
                </div>
            </div>
            <FooterComp/>
        </div>
    )
};