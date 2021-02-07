import React, { useEffect, useState } from 'react'
import Mplayer from './MPlayerComp/MPlayer'
import './NewPost.css'
import Avatar from '@material-ui/core/Avatar/'
import { database } from './firebaseConsole'
function NewPost({username, caption, title, artist, cover, music, postId, userDisplay}){
    const [songs] = useState([
        {
          title: "hello",
          artist: "Albert",
          cover: "./images/practiceimg.JPG",
          music: "./songs/leanonme.mp3"
        }
      ])

    const[curSongIdx, setCurSongIdx] = useState(0);
    const[comments, setComments] = useState([])
    const[userComment,setUserComment]=useState('')
    console.log(comments)

    // replace the variables
    songs[0].title = title
    songs[0].artist = artist
    songs[0].cover = cover
    songs[0].music = music

    const addComment =(e)=>{
      e.preventDefault();
      database.collection('newPosts').doc(postId).collection('comments').add({
        comment: userComment,
        user: userDisplay //add UserDisplay
      })
      setUserComment('')
    }

    useEffect(() => {
      let unsubscribe;
      if(postId){
        unsubscribe = database
          .collection('newPosts').doc(postId).collection('comments').onSnapshot((snapshot)=>{
            setComments(snapshot.docs.map((doc) => doc.data()))
          });
      }
      return unsubscribe
    }, [postId])




    return(
        <div className = "newPost">
          <div className ="post-header">
            <Avatar
            className="newPost-avatar"
            alt = "username"
            src ="#"
            />
            {/* UserName */}
            <h3><strong>{username}</strong></h3>
          </div>



          {/*Player*/}
          <Mplayer
            song ={songs[curSongIdx]}
            curSongIdx = {curSongIdx}
            setCurSongIdx = {setCurSongIdx}
          />

            {/*Footer */}
          <h5 className="newPost-text"><strong>{username}</strong>{caption}</h5>

          <div className="posted-comments">
            {comments.map((c)=>(
              <p>
                <span>{c.user}</span>{c.comment}
              </p>
            ))}
          </div>

          <form>
            <input
              type="text"
              placeholder="Comment here"
              value={userComment}
              onChange={(e)=>setUserComment(e.target.value)}
              className="comment-section"
            />
            <button
              type="submit"
              disabled={!userComment}
              onClick={addComment}
              className="comment-button"
              variant="contained"
              color="primary"
            >Comment</button>
          </form>
        </div>
    )
}

export default NewPost
