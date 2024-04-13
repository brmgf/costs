import styles from '../project/ProjectForm.module.css'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import { useState } from 'react'

function ServiceForm({ handleSubmit, btnText, projectData }) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return(
    <form onSubmit={submit} className={styles.form}>
        <Input
            type="text"
            text="Name"
            name="name"
            placeholder="Insert name for service"
            handleOnChange={handleChange}
        />
        <Input
            type="number"
            text="Cost"
            name="cost"
            placeholder="Insert total value"
            handleOnChange={handleChange}
        />
        <Input
            type="text"
            text="Description"
            name="description"
            placeholder="Describe service"
            handleOnChange={handleChange}
        />
        <SubmitButton text={btnText} />
    </form>
    )
}

export default ServiceForm