import styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm'
import { useNavigate } from 'react-router-dom'

function NewProject() {

    const navigate = useNavigate()

    function createPost(project) {
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp => resp.json()))
        .then((data) => {
            console.log(data)
            navigate.push('/projects', { message: 'Project created!' })
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Create project</h1>
            <p>Create your project and then add services to it</p>
            <ProjectForm handleSubmit={createPost} btnText="Create project"/>
        </div>
    )
}

export default NewProject