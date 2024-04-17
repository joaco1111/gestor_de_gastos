import React from 'react'
import Messages from './Messages'
import Input from './Input'

const Chat = () => {

    return (
        <div className='chatC'>
            <div className="chatInfoC">
                <span>jane</span>
            </div>

            <Messages/>

            <Input/>
        </div>
    )
}

export default Chat