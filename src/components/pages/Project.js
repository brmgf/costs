import { v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Container from '../layout/Container'
import Loading from '../layout/Loading'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
        })
        .catch(err => console.log(err))
    }, [id])

    function editPost(project) {
        setMessage('')
        if (project.budget < project.cost) {
            setMessage('Cost cannot be greater than the budget')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Project updated successfully!')
            setType('success')
        }).catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter((service) => service.id !== id)

        const projectUpdated = project
        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Service deleted successfully!')
        })
        .catch(err => console.log(err))
    }

    function createService(project) {
        setMessage('')
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage('Budget exceeded. Check the cost of the service')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setShowServiceForm(false)
        })
        .catch((err) => console.log(err))
    }

    return (
        <>
        {project.name ? (
        <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message}/>}
                <div className={styles.details_container}>
                    <h1>Project: {project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Edit' : 'Close'}</button>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p><span>Category: {project.category.name}</span></p>
                            <p><span>Total Budget: R${project.budget}</span></p>
                            <p><span>Total cost: R${project.cost}</span></p>
                        </div>
                    ) 
                    : (
                        <div className={styles.project_info}>
                            <ProjectForm handleSubmit={editPost} btnText="Save" projectData={project}/>
                        </div>
                    )}
                </div>

                <div className={styles.service_form_container}>
                    <h2>Add service:</h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? 'Add' : 'Close'}</button>
                    <div className={styles.project_info}>
                        {showServiceForm && (
                            <ServiceForm 
                                handleSubmit={createService}
                                btnText="Add service"
                                projectData={project}
                            />
                        )}

                    </div>
                </div>
                <h2>Services</h2>
                <Container customClass="start">
                    {services.length > 0 &&
                        services.map((service) => (
                            <ServiceCard
                                id={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                key={service.id}
                                handleRemove={removeService}
                            />
                        ))
                    }
                    {services.length === 0 && <p>There are no registered services</p>}
                </Container>
            </Container>
        </div>
        ) : (<Loading />)}
        </>
    )
}

export default Project