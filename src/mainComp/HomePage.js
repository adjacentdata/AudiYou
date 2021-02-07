import React, { useEffect, useState } from 'react'
import './HomePage.css';
import NewPost from './NewPost'
import {database} from './firebaseConsole'
import {Button, Modal} from '@material-ui/core'
import {useAuth} from "../useContextFolder/AuthProvider.js/AuthProvider"
import {useHistory} from 'react-router-dom'
import Uploader from './Uploader'
import UserProfile from './UserProfile'

function HomePage() {
  const [posts,setPosts] = useState([])
  const {signOut} = useAuth()
  const {newUser} = useAuth()
  const [error, setError] = useState('')
  const logOutRedirect = useHistory()
  const [newPostWindow,setNewPostWindow] = useState(false)
  async function handleSignOut(e){
    setError('')

    try{
      await signOut()
      if(newUser.displayName == null){
        logOutRedirect.push("/login")
      }
    }catch{
      setError("Unable to Log Out")
    }
  }

  useEffect(() => {
    database.collection('newPosts').onSnapshot(newSnap => {
      setPosts(newSnap.docs.map(doc => ({
        id : doc.id,
        postData : doc.data()})))
    })
  })

  // everytime posts change it updates



  return (
    <div className ="wrapper">
      {/* Header */}
      <div className = "header">
        <img src = "./images/AudiYou.png" alt ="My Logo" class = "img-logo" />
        {error}
        <div className="header-buttons">
          <Button
            variant="contained"
            color="default"
            onClick={handleSignOut}
          >
            Log Out
          </Button>
          <Button
          variant="contained"
          color="secondary"
          onClick={()=>setNewPostWindow(true)}>New Post</Button>
          <Modal open={newPostWindow} onClose={() => setNewPostWindow(false)}>
            {newUser?.displayName ? (
              <Uploader userDisplay={newUser.displayName}/>
            ): (
              <Uploader/>
            )}

          </Modal>

        </div>

      </div>
      <div className="web-page">
        {/* Posts */}
        <div>
          <UserProfile userDisplay={newUser.displayName}/>
        </div>
        <div className = "allPosts">
          {
          posts.map(({id, postData}) =>(
            <NewPost
            username = {postData.username}
            caption ={postData.caption}
            title = {postData.title}
            artist = {postData.artist}
            cover = {postData.cover}
            music = {postData.music}
            key = {id}
            postId = {id}
            userDisplay={newUser.displayName}
             />
          ))
        }
        </div>

      </div>

    </div>
  );
}

export default HomePage
