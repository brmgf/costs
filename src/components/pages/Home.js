import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton'

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Welcome to <span>Costs</span></h1>
            <p>Get started to managing your project right now!</p>

            <LinkButton to="/new-project" text="Create project" />
            <img src={savings} alt="Costs" />
        </section>
    )
}

export default Home