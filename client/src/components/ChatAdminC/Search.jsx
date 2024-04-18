import React from 'react'

const Search = () => {

    return(
        <div className='searchC'>
            <div className='searchFormC'>
                <input type="text" placeholder='Buscar usuario'/>
            </div>

            <div className="userChatC">
                <img src="data:image/jpeg;base64,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" alt="" />
                <div className="userChatinfoC">
                    <span>jane</span>
                </div>
            </div>
        </div>
    )
}

export default Search