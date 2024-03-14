import styles from './NewProject.module.css'
import ProjectForm from '../projects/ProjectForm'

function NewProject() {
    return (
        <div className={styles.newproject_container}>
            <h1>Create project</h1>
            <p>Create your project and then add services to it</p>
            <ProjectForm btnText="Create project"/>
        </div>
    )
}

export default NewProject