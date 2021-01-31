import { Button } from '@material-ui/core'
import React from 'react'
import Avatar from '@material-ui/core/Avatar/'
import './UserProfile.css'

function UserProfile({userDisplay}){
    return(
        <div className = "userProfile">
          <div className ="userProfile-header">
            <Avatar
            className="userProfile-avatar"
            alt = "username"
            src ="#"
            />
            {/* UserName */}
            <h3><strong>{userDisplay}</strong></h3>
            <Button
              variant="contained"
              color="primary"
            >View Profile</Button>
          </div>

            {/*Footer */}
          <h5 className = "user-bio"><strong></strong></h5>
        </div>
    )
}

export default UserProfile
