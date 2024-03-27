import React, {useEffect, useState} from 'react'
import HeaderComp from '../components/Header'
import FooterComp from '../components/Footer'
import "../CSS/timeline.css"
import done from "../assets/done.png"
import in_progress from "../assets/in_progress.png"
import to_do from "../assets/to_do.png"

export default function TimelinePage () {
    const [content, setContent] = useState([])
    const [message, setMessage] = useState('')
    const [currentDate, setCurrentDate] = useState("")
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

    let iconType;

    useEffect(() => {
        const projectURL = process.env.REACT_APP_BACKEND_URL + '/timeline'

        fetch(projectURL, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                setContent(data)
                setCurrentDate(new Date())
            })
            .catch(error => /* istanbul ignore next */ {setMessage(error.message)})
    }, [])

    return (
        <div>
            <HeaderComp/>
            <div id="timeline-body-container">
                {message ? <p style={{color:"red"}}>{message}</p> : ''}
                <div className="timeline-icon"></div>
                {(content.length !== 0) && (
                    content.map((element, index) => {
                        const fromDate = new Date(element.fromDate)
                        const toDate = new Date(element.toDate)
                        if ((currentDate.getFullYear() < fromDate.getFullYear())
                            || ((currentDate.getFullYear() === fromDate.getFullYear()) && ((currentDate.getMonth() < fromDate.getMonth())))) {
                            iconType = to_do
                        } else if ((currentDate.getFullYear() >= fromDate.getFullYear()) && (currentDate.getFullYear() <= toDate.getFullYear())
                            && (((currentDate.getMonth() >= fromDate.getMonth()) && (currentDate.getMonth() <= toDate.getMonth())))) {
                            iconType = in_progress
                        } else {
                            iconType = done
                        }
                        const isEvenIndex = index % 2 === 0;
                        const showFromDate = months[fromDate.getMonth()] + " " + fromDate.getFullYear()
                        const showToDate = months[toDate.getMonth()] + " " + toDate.getFullYear()
                        if (isEvenIndex) {
                            return (
                                <div key={index} className="timeline-container content-left">
                                    <div className={`timeline-card-content`}>
                                        <p className="timeline-title">{element.title}</p>
                                        <p className="timeline-date">{showFromDate + " - " + showToDate}</p>
                                        <p>{element.description}</p>
                                    </div>
                                    <div className="icon-background timeline-icon icon-left">
                                        <img className="icon-style" src={iconType} alt="icon"/>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className="timeline-container content-right">
                                    <div className="icon-background timeline-icon icon-right">
                                        <img className="icon-style" src={iconType} alt="icon"/>
                                    </div>
                                    <div className={`timeline-card-content`}>
                                        <p className="timeline-title">{element.title}</p>
                                        <p className="timeline-date">{showFromDate + " - " + showToDate}</p>
                                        <p>{element.description}</p>
                                    </div>
                                </div>
                            )
                        }
                    })
                )}
            </div>
            <FooterComp/>
        </div>
    )
};