import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({ btnText }) {
    return (
        <form className={styles.form}>
            <Input
                type="text"
                text="Project name"
                name="name"
                placeholder="Enter the name of the project"
            />
            <Input
                type="number"
                text="Budget"
                name="budget"
                placeholder="Enter the budget of the project"
            />
            <Select name="category_id" text="Select category" />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm