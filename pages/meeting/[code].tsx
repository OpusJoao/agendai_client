import "react-activity/dist/library.css";
import styles from '../../styles/Home.module.css'
import { FaUserCircle } from 'react-icons/fa'
import { AiFillClockCircle, AiOutlineRight, AiOutlineCalendar } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { Spinner } from "react-activity";
import axios from "axios";
import { useRouter } from "next/router";

function Home() {
    const router = useRouter()
    const { code } = router.query
    const [meeting, setMeeting] = useState()

    const [hoursAvailable, setHoursAvailable] = useState([])
    const [step, setStep] = useState(1)

    function handleOnClickHour(hour: string) {
        let updatedHoursAvailable

        updatedHoursAvailable =  hoursAvailable.map(hourIterated => {
            if (hour == hourIterated.hour) {
                hourIterated.selected = !hourIterated.selected
                hourIterated.selectedByUser = !hourIterated.selectedByUser
            }
            return hourIterated
        })


        setHoursAvailable(updatedHoursAvailable)
    }

    function renderHoursAvailable() {
        return hoursAvailable.map(hour =>
            <button
                className={hour.selectedByUser || hour.selected ? styles.buttonSelectedHour : styles.buttonUnselectedHour}
                onClick={() => handleOnClickHour(hour.hour)}
            >
                {hour.hour}
            </button>)
    }

    function renderSaveMeeting() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <p style={{ textAlign: 'center' }}>Obrigado por escolher o horário!</p>
                <p style={{ textAlign: 'center' }}>Como deseja salvar essa reunião em sua agenda?</p>
                <button
                    className={styles.buttonUnselected}
                >
                    Google Agenda
                </button>
                <button
                    className={styles.buttonUnselected}
                >
                    Outlook
                </button>
            </div>
        )
    }
    
    async function getAndSetMeetings(code: string){
        const meetings = await axios.get('http://localhost:3000/meeting', {
                params: {
                    code: code,
                }
            })
        setMeeting(meetings?.data?.meetings[0])
        setHoursAvailable(meetings?.data?.meetings[0].hoursAvailable)
        return meetings
    }

    useEffect(() => {
        if(code){
            getAndSetMeetings(code as string)
        }
        
    }, [code])

    function getContent() {
        switch (step) {
            case 1:
                return renderHoursAvailable();
            case 2:
                return renderSaveMeeting();
            case 3:
                setTimeout(() => {
                    setStep(2)
                }, 10 * 1000)
                return (
                    <Spinner color="#FCA351" />
                )

        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerBody}>
                <div className={styles.sideInfo}>
                    <div className={styles.sideInfoHead}>
                        <FaUserCircle className={styles.sideInfoHeadIcon} />
                        <h5>Agendai</h5>
                    </div>
                    <div className={styles.sideInfoBody}>
                        <p className={styles.sideInfoBodyParagraph}>
                            <AiFillClockCircle className={styles.sideInfoBodyIcon} />
                            { meeting?.timeDuration } MIN
                        </p>
                        <p>{ meeting?.name }</p>
                        <p>{ meeting?.day }</p>
                    </div>
                    <div className={styles.sideInfoFooter}>
                        <button className={styles.defaultButton}>
                            <span>Informar outro horário</span>
                            <AiOutlineRight style={{ marginLeft: 16 }} />
                        </button>
                    </div>
                </div>
                <div className={styles.sideAction}>
                    <div className={styles.sideActionHead}>
                        <div className={styles.dataInfo}>
                            <AiOutlineCalendar style={{ marginRight: 16 }} />
                            <span> { meeting?.day } </span>
                        </div>
                        <p style={{ color: '#969696' }}>Selecione um horário que você tenha disponível</p>
                    </div>
                    <div className={styles.sideActionBody}>
                        {getContent()}
                    </div>
                    <div className={styles.sideActionFooter}>
                        {
                            step == 1 &&
                            <button
                                className={styles.defaultButton} style={{ width: 200 }}
                                onClick={() => { setStep(3) }}
                            >
                                <span>Confirmar</span>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Home