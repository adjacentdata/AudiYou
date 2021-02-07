import React, { useState } from 'react'
import { Button, Input } from '@material-ui/core'
import {storage, database} from "./firebaseConsole"
import './Uploader.css'
import firebase from 'firebase'
function Uploader({userDisplay}){
    const [title, setTitle] = useState('')
    const [caption, setCaption] = useState('')
    const [cover, setCover] = useState(null);
    const [music, setMusic] = useState(null);
    const [progressBar, setProgressBar] = useState(0);

    function handleChosenCoverFile(e){
        if(e.target.files[0]){
            return setCover(e.target.files[0])
        }
    }

    function handleChosenMusicFile(e){
        if(e.target.files[0]){
            return setMusic(e.target.files[0])
        }
    }



    async function handleNewPostUpload(e){
        const uploadGetRef = storage.ref(`images/${cover.name}`).put(cover);
        const metadata = {
            contentType: 'audio/mpeg',
        }
        const musicUploadRef = storage.ref(`audio/${music.name}`).put(music, metadata)

        uploadGetRef.on(
            "state_changed", (newSnap)=>{
                const prog = Math.round((newSnap.bytesTransferred/newSnap.totalBytes)*100 / 2)
                setProgressBar(prog);
            },
            (error)=>{
                console.log(error)
            },
            ()=>{
                storage.ref("images").child(cover.name).getDownloadURL().then(url =>{
                    database.collection("newPosts").add({
                        postTime: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        cover: url,
                        username: userDisplay,
                        title: title,
                        music: ""
                    })
                    .then(docRef=>{
                        musicUploadRef.on(
                            "state_changed", (newSnap)=>{
                                const prog = .5 + Math.round((newSnap.bytesTransferred/newSnap.totalBytes)*100)
                                setProgressBar(prog);
                            },
                            (error)=>{
                                console.log(error)
                            },
                            ()=>{
                                storage.ref("audio").child(music.name).getDownloadURL().then(audioLink =>{
                                    database.collection("newPosts").doc(docRef.id).update({
                                        music: audioLink
                                    })
                                })
                                console.log("complete")
                                setProgressBar(0)
                            }
                        )
                    })
                    setCaption('')
                    setCover(null)
                    setMusic(null)
                    setTitle('')
                })
            }
        )



    }




    return (
        <div className="photo-background" >
            <div className="container">
                <div className="wall">
                    <div className="wall-container">
                        <div className="upload-caption">
                            Post Your Sounds!
                        </div>
                        <Input type="text"
                        value = {title}
                        placeholder="Enter Audio Title"
                        onChange={e=> setTitle(e.target.value)}
                        style={{marginTop: "15px", border: "solid 2px black"}} />

                        <Input type="text"
                        value = {caption}
                        placeholder= "Enter a Caption"
                        onChange={e => setCaption(e.target.value)}
                        style={{border: "solid 2px black",marginTop: "15px"}}
                        multiline="true"
                        rows={4}
                        rowsMax={4}
                        inputProps={{maxLength: 120}}
                        />
                        <div className="form-text">
                            Choose Cover Photo:
                        </div>
                        <Input type="file"
                        onChange={handleChosenCoverFile}
                        style={{marginTop: "15px", border: "solid 2px black"}}
                        >Cover</Input>
                        <div className="form-text">
                            Choose Audio:
                        </div>
                        <Input type="File"
                        onChange={handleChosenMusicFile}
                        style={{marginTop: "15px", border: "solid 2px black"}}
                        >Audio</Input>
                        <Button
                        onClick={handleNewPostUpload}
                        style={{marginTop: "35px" }}
                        color="secondary"
                        variant="contained"
                        >
                            Upload
                        </Button>
                        <progress value={progressBar} max ="100"/>


                    </div>
                </div>
            </div>


        </div>
    )
}

export default Uploader
