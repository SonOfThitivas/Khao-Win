import React from 'react';
import './loading.css';

function Loading() {
  return (
    <div>
        <div className='centerlond'>
            <div className="dot-wave">
                <div className="dot-wave__dot"></div>
                <div className="dot-wave__dot"></div>
                <div className="dot-wave__dot"></div>
                <div className="dot-wave__dot"></div>
            </div>
        </div>
    </div>
  )
}

export default Loading;