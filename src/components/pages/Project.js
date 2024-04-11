import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Container from '../layout/Container'
import Loading from '../layout/Loading'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'

function Project() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
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
        })
        .catch(err => console.log(err))
    }, [id])

    function editPost(project) {
        if (project.budget < project.cost) {
            setMessage('The project cost cannot be greater than the budget!')
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
            </Container>
        </div>
        ) : (<Loading />)}
        </>
    )
}

export default Project