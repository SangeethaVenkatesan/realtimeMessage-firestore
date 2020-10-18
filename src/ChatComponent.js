import React, { useEffect, useState } from 'react'
import './ChatComponent.css'
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Messages from './Messages';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { useSelector } from 'react-redux';
import { selectedUser } from './features/userSlice';
import db from './firebase';
import firebase from 'firebase';


function ChatComponent() {
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const user = useSelector(selectedUser)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])


    useEffect(() => {
        if (channelId) {

            db.collection('channels').doc(channelId).collection('messages')
                .orderBy('timestamp','desc').onSnapshot((snapshot) => (

                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ))
        }

    }, [channelId])

    const sendMessage = e => {
        e.preventDefault();
        db.collection('channels').doc(channelId).collection('messages').add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()

        })
        setInput('')

    }

    return (
        <div className="chatComponent">
            <ChatHeader channelName={channelName} />

            <div className="chatComponent__messages">

                {messages.map((message => (
                    <Messages
                        message={message.message}
                        user={message.user}
                        timestamp={message.timestamp}
                    />
                )))}

            </div>
            <div className="chatComponent__input">
                <AddCircleIcon fontSize="large" />
                <form>
                    <input value={input}
                        disabled={!channelId}
                        onChange={(e) => setInput(e.target.value)} placeholder={`Message #${channelName}`}></input>
                    <button
                        onClick={sendMessage}
                        className="chatComponent__inputButton" type="submit">Send Message</button>
                </form>
                <div className="chatComponent__inputIcons">
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default ChatComponent
