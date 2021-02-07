import React, {useState, useRef} from 'react'
import MPinfo from './MPinfo'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome/'
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons/'

function Player(props){
    const postaudio = useRef('userAudio')
    const isPlaying = () =>{
        if(postaudio.current.paused){
            postaudio.current.play()
        }else{
            postaudio.current.pause()
        }
    }

    const[playMusic, setPlayMusic ] = useState(false)
    const[duration, setDuration] = useState(0)
    const[curTime, setCurTime] = useState(0)

    const formatTime = (songTimeVariable) => {
        let durationMinutes = Math.floor(songTimeVariable / 60)
        let durationSeconds = Math.floor(songTimeVariable % 60)
        return durationMinutes + (durationSeconds < 9 ? ":0" : ":") + durationSeconds
    }

    const progression = (e) => {
        let newTime = ((e.target.value) * (duration)) / 100
        postaudio.current.currentTime = newTime
        setCurTime(newTime)
    }

    return(
        <div className = "mp-main">
            <audio
            ref = {postaudio}
            src = {props.song.music}
            onCanPlay = {(e) => (setDuration(parseInt(e.target.duration)))}
            onTimeUpdate = {(e)=>(setCurTime(parseInt(e.target.currentTime)))}
            preload = "metadata"
            type = 'audio/mpeg'
            />

            {/*Info*/}
            <MPinfo song ={props.song}/>

            {/* Player Controls */}
            <div className ="mp-controls">
            <div className="progress-bar">
                <span className = "current-time">{formatTime(curTime)}</span>
                <input
                    type="range"
                    name="progress-bar"
                    id ="prog"
                    className ="prog"
                    value={(duration) ? (parseInt(curTime) * 100) / parseInt(duration) : 0}
                    onChange={progression}
                    />
                <span className ="total-time">{formatTime(duration)}</span>
            </div>
            <span className="play" onClick={
                () => {setPlayMusic(playMusic ? 0 : 1); isPlaying();}
            }>
                {playMusic ? <FontAwesomeIcon icon = {faPause}/> : <FontAwesomeIcon icon = {faPlay}/>}
            </span>
        </div>
        </div>
    )
}

export default Player
