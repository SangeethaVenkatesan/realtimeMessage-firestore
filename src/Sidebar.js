import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import { Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector } from 'react-redux';
import { selectedUser } from './features/userSlice';
import db, { auth } from './firebase';

function Sidebar() {

    const user = useSelector(selectedUser)

    const [channels, setChannels] = useState([])



    useEffect(() => {
        db.collection('channels').onSnapshot((snapshot) => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data(),

            })))
        ))

    }, [])

    const handleAddChannel = () => {
        const channelName = prompt('Enter the channel Name')
        if (channelName) {
            db.collection('channels').add({
                channelName: channelName
            })
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>Sangeetha Artistry</h3>
                <ExpandMoreIcon />
            </div>
            <div className="sidebar__channels">
                <div className="sidebar_channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>
                <div className="sidebar__channelsList">
                    {channels.map(({ id, channel }) => (
                        <SidebarChannel key={id} channelName={channel.channelName} id={id} />
                    ))}
                </div>
            </div>
            <div className="sidebar__voice">
                <SignalCellularAltIcon
                    className="sidebar__voiceIcon"
                    font-size="large"
                />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />

                </div>
            </div>
            <div className="sidebar__profile">
                <Avatar className="sidebar__profileAvatar" src={user.photo} onClick={() => auth.signOut()} />
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetMicIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>

    )
}

export default Sidebar
