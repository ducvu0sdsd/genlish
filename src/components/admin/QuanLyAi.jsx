import React from 'react'

const QuanLyAi = ({ ai, setAi, gates }) => {
    return (
        <div className='w-full  p-[1rem] flex flex-col gap-2'>
            <span>Quản Lý Ải Từ Vựng</span>
            <div className='grid grid-cols-2 gap-3'>
                <input value={ai.title} onChange={e => setAi({ ...ai, title: e.target.value })} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' placeholder='Tên Ải Từ Vựng' />
                <input value={ai.level} onChange={e => setAi({ ...ai, level: e.target.value })} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' placeholder='Level' />
            </div>
            <button onClick={() => handleCreateAi()} className="text-center bg-[#149dff] transition-all hover:scale-[1.06] text-[white] font-bold text-[16px] w-[10%] py-[7px] rounded-lg">Thêm</button>
            <span className='my-4 text-[20px]' > Danh sách ải</span>
            <div className="overflow-y-auto h-64 border border-gray-300 rounded-md p-4">
                {gates.map((gate, index) => (
                    <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md">
                        <span>{gate.title}</span>
                        <span className="text-gray-500">{gate.level}</span>
                        <button
                            onClick={() => handleDelete(gate._id)} // Assuming each gate has a unique ID
                            className="ml-4 text-red-600 hover:text-red-800 focus:outline-none"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuanLyAi