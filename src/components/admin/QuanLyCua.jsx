import React from 'react'

const QuanLyCua = ({ cua, setCua, gates }) => {
    return (
        <div className='w-full p-[1rem] flex flex-col gap-2'>
            <span>Quản Lý Cửa Từ Vựng</span>
            <div className='grid grid-cols-2 gap-3'>
                <select onChange={e => setCua({ ...cua, gate: { _id: e.target.value.split('-')[0], title: e.target.value.split('-')[1], level: e.target.value.split('-')[2] } })} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]'>
                    <option>Chọn Ải Từ Vựng</option>
                    {gates.map((gate, index) => (
                        <option key={index} value={gate._id + '-' + gate.title + '-' + gate.level}>{gate.title}</option>
                    ))}
                </select>
                <input value={cua.individual.title} onChange={e => setCua({ ...cua, individual: { ...cua.individual, title: e.target.value } })} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' placeholder='Tên Cửa Từ Vựng' />
                <input value={cua.individual.image} onChange={e => setCua({ ...cua, individual: { ...cua.individual, image: e.target.value } })} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' placeholder='Ảnh Cửa Từ Vựng' />
                <input value={cua.individual.numberOfTest} onChange={e => setCua({ ...cua, individual: { ...cua.individual, numberOfTest: e.target.value } })} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' placeholder='Số Bài Kiểm Tra' />
                <input value={cua.individual.color} onChange={e => setCua({ ...cua, individual: { ...cua.individual, color: e.target.value } })} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' placeholder='Màu Sắc' />
                <input value={cua.individual.door} onChange={e => setCua({ ...cua, individual: { ...cua.individual, door: e.target.value } })} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' placeholder='Cửa' />
                <span className='font-bold'>Beginner (excel)</span>
                <span className='font-bold'>Elementary (excel)</span>
                <input onChange={(e) => { handleFileUpload(e).then(res => setCua({ ...cua, beginner: res })) }} accept=".xlsx, .xls" type='file' className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' />
                <input onChange={(e) => { handleFileUpload(e).then(res => setCua({ ...cua, elementary: res })) }} accept=".xlsx, .xls" type='file' className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' />
                <span className='font-bold'>Intermediate (excel)</span>
                <span className='font-bold'>UpperIntermediate (excel)</span>
                <input onChange={(e) => { handleFileUpload(e).then(res => setCua({ ...cua, intermediate: res })) }} accept=".xlsx, .xls" type='file' className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' />
                <input onChange={(e) => { handleFileUpload(e).then(res => setCua({ ...cua, upperIntermediate: res })) }} accept=".xlsx, .xls" type='file' className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' />
                <span className='font-bold'>Advanced (excel)</span>
                <div></div>
                <input onChange={(e) => { handleFileUpload(e).then(res => setCua({ ...cua, advanced: res })) }} accept=".xlsx, .xls" type='file' className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' />
                <div></div>
            </div>
            <button onClick={() => handleCreateCua()} className="text-center bg-[#149dff] transition-all hover:scale-[1.06] text-[white] font-bold text-[16px] w-[10%] py-[7px] rounded-lg">Thêm</button>
        </div>
    )
}

export default QuanLyCua