import "react-activity/dist/library.css";
import styles from '../styles/Home.module.css'
import { FaUserCircle } from 'react-icons/fa'
import { AiFillClockCircle, AiOutlineRight, AiOutlineCalendar } from 'react-icons/ai'
import { useState } from 'react'
import { Spinner } from "react-activity";

export default function Home() {
  const [hoursAvailable, setHoursAvailable] = useState([
    {hour: '09:00', selected: false},
    {hour: '09:30', selected: false},
    {hour: '13:00', selected: false},
    {hour: '15:00', selected: false},
    {hour: '16:30', selected: false},
  ])
  const [step, setStep] = useState(1)

  function handleOnClickHour(hour: string){
    let updatedHoursAvailable

    updatedHoursAvailable = hoursAvailable.map(hourIterated => {
      if(hour == hourIterated.hour){
        hourIterated.selected = !hourIterated.selected 
      }
      return hourIterated
    })


    setHoursAvailable(updatedHoursAvailable)
  }

  function renderHoursAvailable(){
    return hoursAvailable.map( hour =>
      <button 
        className={ hour.selected ? styles.buttonSelectedHour : styles.buttonUnselectedHour} 
        onClick={() => handleOnClickHour(hour.hour)}
        >
          {hour.hour}
      </button>)
  }

  function renderSaveMeeting(){
    return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <p style={{textAlign: 'center'}}>Obrigado por escolher o horário!</p>
      <p style={{textAlign: 'center'}}>Como deseja salvar essa reunião em sua agenda?</p>
      <button 
        className={ styles.buttonUnselected} 
        >
          Google Agenda
      </button>
      <button 
        className={ styles.buttonUnselected} 
        >
          Outlook
      </button>
    </div>
    )
  }

  function getContent(){
    switch (step){
      case 1: 
        return renderHoursAvailable();
      case 2: 
        return renderSaveMeeting();
      case 3: 
        return (
          <Spinner color="#FCA351"/>
        )

    } 
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerBody}>
        <div className={styles.sideInfo}>
          <div className={styles.sideInfoHead}>
            <FaUserCircle className={styles.sideInfoHeadIcon}/>
            <h5>Agendai</h5>
          </div>
          <div className={styles.sideInfoBody}>
            <p className={styles.sideInfoBodyParagraph}>
              <AiFillClockCircle className={styles.sideInfoBodyIcon}/>
              5 MIN
            </p>
            <p>Reunião de 5 minutos com Pedro</p>
            <p>02/11/2022</p>
          </div>
          <div className={styles.sideInfoFooter}>
            <button className={styles.defaultButton}>
              <span>Informar outro horário</span>
              <AiOutlineRight style={{marginLeft: 16}}/>
            </button>
          </div>
        </div>
        <div className={styles.sideAction}>
          <div className={styles.sideActionHead}>
            <div className={styles.dataInfo}>
              <AiOutlineCalendar style={{marginRight: 16}}/>
              <span>02/11/2022</span>
            </div>
            <p style={{color: '#969696' }}>Selecione um horário que você tenha disponível</p>
          </div>
          <div className={styles.sideActionBody}>
            { getContent() }
           </div>
          <div className={styles.sideActionFooter}>
            {
              step == 1 &&
              <button 
              className={styles.defaultButton} style={{width: 200}}
              onClick={() => {setStep(2)}}
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
