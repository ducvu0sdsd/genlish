import { authContext } from '@/context/AuthContext'
import { api, TypeHTTP } from '@/utils/api'
import React, { useContext } from 'react'

const MoreInformation = () => {

    const englishLevels = [
        'Tôi mới học tiếng anh',
        'Tôi mới hiểu sơ qua',
        'Tôi có thể giao tiếp cơ bản',
        'Tôi có thể nói về các chủ đề',
        'Tôi có thể thảo luận được chủ đề'
    ]
    const { authData, authHandler } = useContext(authContext)

    const handleUpdateLevel = (currentEnglishLevel) => {
        api({
            sendToken: false, type: TypeHTTP.POST, path: '/auth/sign-up-step-other', body: {
                ...authData.user, individual: {
                    ...authData.user.individual,
                    currentEnglishLevel
                }
            }
        })
            .then(user => {
                authHandler.setUser(user)
            })
    }

    return (
        <div className='w-[28%] flex flex-col gap-4 h-screen overflow-auto py-[1rem]'>
            <div className='flex text-[#6e6e6e] items-center justify-evenly w-full'>
                <img src='/america.png' className='w-[40px]' />
                <div className='flex items-center'>
                    <img src='/fire.png' className='w-[35px]' />
                    <span className='text-[21px] font-semibold'>0</span>
                </div>
                <div className='flex items-center'>
                    <img src='/vocabulary.png' className='w-[45px]' />
                    <span className='text-[21px] font-semibold'>0</span>
                </div>
                <img src={authData.user?.avatar} className='w-[40px] rounded-full' />
            </div>
            <div className='gap-3 mt-2 border-[2px] p-4 border-[#f2f2f2] rounded-xl flex items-center justify-evenly w-full'>
                <img src='/level.png' className='w-[50px]' />
                <div className='flex flex-col gap-1'>
                    <span className='font-bold text-[#5d5d5d] text-[18px]'>Trình độ của tôi</span>
                    <select onChange={e => handleUpdateLevel(e.target.value)} value={authData.user?.individual?.currentEnglishLevel} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[4px] border-[1px] border-[#e1e1e1]'>
                        {englishLevels.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='border-[2px] text-[#5d5d5d] h-[65%] p-4 pb-0 border-[#f2f2f2] rounded-xl w-full'>
                <div className='flex w-full items-center gap-3'>
                    <img src='/ai.png' className='w-[52px]' />
                    <span className='font-bold text-[18px]'>Ải 1 (Khởi Đầu)</span>
                </div>
                <div className='w-full cursor-pointer mt-3 h-[75%] overflow-auto items-center transition-all flex flex-col gap-2'>
                    <div className='flex w-[95%] hover:scale-[1.05] transition-all items-center gap-1 text-[white] bg-[#58cc02] px-2 py-1 rounded-lg'>
                        <img className='h-[35px]' src='https://cdn3d.iconscout.com/3d/premium/thumb/raised-hand-symbol-7232368-5862622.png' />
                        <span className='font-semibold'>{'Cửa 1: Chào Hỏi (0/5)'}</span>
                    </div>
                    <div className='flex w-[95%] hover:scale-[1.05] transition-all items-center gap-1 text-[white] bg-[#c837e8] px-2 py-1 rounded-lg'>
                        <img className='h-[35px]' src='https://cdn3d.iconscout.com/3d/premium/thumb/raised-hand-symbol-7232368-5862622.png' />
                        <span className='font-semibold'>{'Cửa 2: Gia đình (0/7)'}</span>
                    </div>
                    <div className='flex w-[95%] hover:scale-[1.05] transition-all items-center gap-1 text-[white] bg-[#f39247] px-2 py-1 rounded-lg'>
                        <img className='h-[35px]' src='https://cdn3d.iconscout.com/3d/premium/thumb/raised-hand-symbol-7232368-5862622.png' />
                        <span className='font-semibold'>{'Cửa 3: Số đếm (0/7)'}</span>
                    </div>
                    <div className='flex w-[95%] hover:scale-[1.05] transition-all items-center gap-1 text-[white] bg-[#527cfc] px-2 py-1 rounded-lg'>
                        <img className='h-[35px]' src='https://cdn3d.iconscout.com/3d/premium/thumb/raised-hand-symbol-7232368-5862622.png' />
                        <span className='font-semibold'>{'Cửa 4: Màu sắc (0/9)'}</span>
                    </div>
                    <div className='flex w-[95%] hover:scale-[1.05] transition-all items-center gap-1 text-[white] bg-[#ff3a3a] px-2 py-1 rounded-lg'>
                        <img className='h-[35px]' src='https://cdn3d.iconscout.com/3d/premium/thumb/raised-hand-symbol-7232368-5862622.png' />
                        <span className='font-semibold'>{'Cửa 5: Động vật (0/9)'}</span>
                    </div>
                    <div className='flex w-[95%] hover:scale-[1.05] transition-all items-center gap-1 text-[white] bg-[#ff43d0] px-2 py-1 rounded-lg'>
                        <img className='h-[35px]' src='https://cdn3d.iconscout.com/3d/premium/thumb/raised-hand-symbol-7232368-5862622.png' />
                        <span className='font-semibold'>{'Cửa 6: Thời gian (0/7)'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreInformation