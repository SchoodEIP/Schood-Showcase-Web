import React, {useEffect, useState} from 'react'
import HeaderComp from '../components/Header'
import FooterComp from '../components/Footer'
import "../CSS/timeline.css"
import moment from 'moment'
import done from "../assets/done.png"
import in_progress from "../assets/in_progress.png"
import to_do from "../assets/to_do.png"

export default function TimelinePage () {
    const [content, setContent] = useState([])
    const [message, setMessage] = useState('')
    const [currentDate, setCurrentDate] = useState("")

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
                <div className="timeline-icon"></div>
                {(content.length !== 0) && (
                    content.map((element, index) => {
                        let iconType
                        const newDate = new Date(element.date)
                        if ((currentDate.getFullYear() < newDate.getFullYear())
                            || ((currentDate.getFullYear() === newDate.getFullYear()) && ((currentDate.getMonth() < newDate.getMonth())
                            || ((currentDate.getMonth() === newDate.getMonth()) && (currentDate.getDate() < newDate.getDate()))))) {
                            iconType = to_do
                        } else if ((currentDate.getFullYear() > newDate.getFullYear())
                            || ((currentDate.getFullYear() === newDate.getFullYear()) && ((currentDate.getMonth() > newDate.getMonth())
                            || ((currentDate.getMonth() === newDate.getMonth()) && (currentDate.getDate() > newDate.getDate()))))) {
                            iconType = done
                        } else {
                            iconType = in_progress
                        }
                        const isEvenIndex = index % 2 === 0;
                        const contentAlignClass = isEvenIndex ? 'content-left' : 'content-right';

                        if (isEvenIndex) {
                            return (
                                <div key={index} id="timeline-container">
                                    <div className="icon-background timeline-icon">
                                        <img className="icon-style" src={iconType} alt="icon"/>
                                    </div>
                                    <div className={`timeline-card-content ${contentAlignClass}`}>
                                        <p class="timeline-title">{element.description}</p>
                                        <p class="timeline-date">{moment(element.date).format('DD/MM/YY') + " - " + moment(element.date).format('DD/MM/YY')}</p>
                                        <p>{element.newFeatures}</p>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} id="timeline-container">
                                    <div className={`timeline-card-content ${contentAlignClass}`}>
                                        <p class="timeline-title">{element.description}</p>
                                        <p class="timeline-date">{moment(element.date).format('DD/MM/YY') + " - " + moment(element.date).format('DD/MM/YY')}</p>
                                        <p>{element.newFeatures}</p>
                                    </div>
                                    <div className="icon-background timeline-icon">
                                        <img className="icon-style" src={iconType} alt="icon"/>
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