import React from 'react'

const SpiritBeast = ({ left }) => {
    return (
        <div style={left === true ? { left: '25%' } : { right: '25%' }} className='absolute top-[50%] translate-y-[-50%]'>
            <div className='h-[90px] transition-all top-0 absolute z-10 w-[100px] rounded-full flex items-center justify-center bg-[#e5e5e5]'>
                <div className='absolute w-[220px] top-[50%] translate-y-[-70%]'>
                    <img src='/beast-1.gif' className='top-0 h-auto z-50' />
                </div>
            </div>
            <div className='h-[90px] absolute top-[8px] w-[100px] rounded-full bg-[#b7b7b7]'></div>
            <div className='h-[100px] w-[100px]'>

            </div>
        </div>
    )
}

export default SpiritBeast