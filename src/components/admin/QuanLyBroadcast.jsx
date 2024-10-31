import React from 'react'

const QuanLyBroadcast = ({ broadcast, broadcasts }) => {
    return (
        <div className='w-full  p-[1rem] flex flex-col gap-2'>
            <span>Quản Lý BroadCast</span>
            <div className='grid grid-cols-2 gap-3'>
                <input type='file' onChange={e => handleFileChange(e, 'english')} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' />
                <input type='file' onChange={e => handleFileChange(e, 'vietnam')} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' />
                <input value={broadcast.urlVideo} onChange={e => setBroadcast({ ...broadcast, urlVideo: e.target.value })} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' placeholder='URL Video' />
            </div>

            <button onClick={() => handleCreateBroadCast()} className="text-center bg-[#149dff] transition-all hover:scale-[1.06] text-[white] font-bold text-[16px] w-[10%] py-[7px] rounded-lg">Thêm</button>
            <span className='my-4 text-[20px]' > Danh sách broadcast</span>
            <div className='overflow-y-scroll h-[350px]'>{broadcasts.map((broadCast, index) => (
                <div key={index} className='rounded-md cursor-pointer overflow-hidden flex  bg-white shadow-xl m-2' style={{ alignItems: 'center' }} >
                    <img src={broadCast.thum} width={'15%'} />
                    <div className='py-1 flex justify-between w-3/5'>
                        <span
                            className='font-poppins font-semibold text-[15px] my-2 px-2'>{broadCast.title}
                        </span>
                        <span
                            className='font-poppins font-semibold text-[15px] my-2 px-2'>
                            {broadCast.duration}
                        </span>
                    </div>

                    <div onClick={() => handleRemoveBroadcast(broadCast._id)} className=" hover:text-red-400 px-4 py-2 cursor-pointer rounded-lg ">
                        Delete
                    </div>
                </div>
            ))}</div>
        </div>
    )
}

export default QuanLyBroadcast