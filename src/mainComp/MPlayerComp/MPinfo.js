import React from 'react'


function MPinfo(props){
    return(
        <div className = "mp-information">
            <div className = "img-cover">
                <img src={props.song.cover} alt="Hello"/>
            </div>
            <h4 className ="title-info">{props.song.title}</h4>
            <h4 className ="artist-info">{props.song.artist}</h4>
        </div>
    )
}

export default MPinfo
