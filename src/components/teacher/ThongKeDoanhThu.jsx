import { authContext } from '@/context/AuthContext'
import { api, TypeHTTP } from '@/utils/api'
import { formatMoney, typePayments } from '@/utils/other'
import { ProviderId } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'

const ThongKeDoanhThu = () => {
    const { authData } = useContext(authContext)
    const [payments, setPayments] = useState([])
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [pendingPayment, setPendingPayment] = useState(0)
    const [paid, setPaid] = useState(0)
    const [numberOfUser, setNumberOfUser] = useState(0)
    const [balance, setBalance] = useState(0)
    const [from, setFrom] = useState()
    const [to, setTo] = useState()

    useEffect(() => {
        if (authData.user) {
            const body = {
                from: new Date('2024-10-01').toISOString(),
                to: new Date('2024-11-30').toISOString(),
                provider_id: authData.user._id
            }
            api({ sendToken: true, type: TypeHTTP.POST, path: '/payment/get-by-time-and-provider', body: body })
                .then(payments => {
                    setPayments(payments)
                    setTotalRevenue(payments
                        .map(item => item.payments)
                        .flat()
                        .filter(item => item.type === typePayments.studentTranfer)
                        .reduce((total, item) => total + item.price, 0))
                    setPendingPayment(payments
                        .map(item => item.payments)
                        .flat()
                        .filter(item => item.type === typePayments.waitingForTeacher)
                        .reduce((total, item) => total + item.price, 0))
                    setPaid(payments
                        .map(item => item.payments)
                        .flat()
                        .filter(item => item.type === typePayments.moneyToTeacher)
                        .reduce((total, item) => total + item.price, 0))
                    setNumberOfUser(payments
                        .map(item => item.payments)
                        .flat().length)
                })
            api({ sendToken: true, type: TypeHTTP.GET, path: `/payment/get-balance/${authData.user._id}` })
                .then(balance => setBalance(balance))
        }
    }, [authData.user])

    return (
        <section className='w-full flex flex-col px-[1.5rem] h-full'>
            <span className='text-[20px] font-semibold'>Thống Kê Doanh Thu</span>
            <div className='flex items-center justify-between w-full mt-2'>
                <div className='flex items-center gap-2'>
                    <span>Từ ngày</span>
                    <input type='date' className='border-[1px] border-[#e4e4e4] rounded-md px-2 text-[15px]' />
                    <span>đến ngày</span>
                    <input type='date' className='border-[1px] border-[#e4e4e4] rounded-md px-2 text-[15px]' />
                </div>
                <div className='flex items-center gap-2'>
                    <span className='text-[16px] font-medium'>Khả Dụng: {formatMoney(balance)}đ</span>
                    <button style={{ background: 'linear-gradient(to right, #56ccf2, #2f80ed)' }} className='transition-all hover:scale-[1.05] text[13px] px-4 py-1 text-[white] font-semibold rounded-lg'>Rút tiền</button>
                </div>
            </div>
            <div className='w-full grid grid-cols-4 gap-[1rem] mt-[0.5rem]'>
                <div style={{ background: 'linear-gradient(to right, #56ccf2, #2f80ed)' }} className='w-full flex items-center rounded-lg px-2 py-2 gap-2'>
                    <img src='/tong_doanh_thu.png' width={'65px'} />
                    <div className='flex flex-col'>
                        <span className='text-[white] font-bold text-[16px]'>Tổng Doanh Thu</span>
                        <span className='text-[white] font-semibold text-[16px]'>{formatMoney(totalRevenue)}đ</span>
                    </div>
                </div>
                <div style={{ background: 'linear-gradient(to right, #11998e, #38ef7d)' }} className='w-full flex items-center rounded-lg px-2 py-2 gap-2'>
                    <img src='/cho_thanh_toan.png' width={'65px'} />
                    <div className='flex flex-col'>
                        <span className='text-[white] font-bold text-[16px]'>Chờ Thanh Toán</span>
                        <span className='text-[white] font-semibold text-[16px]'>{formatMoney(pendingPayment)}đ</span>
                    </div>
                </div>
                <div style={{ background: 'linear-gradient(to left, #ff9966, #ff5e62)' }} className='w-full flex items-center rounded-lg px-2 py-2 gap-2'>
                    <img src='/da_thanh_toan.png' width={'65px'} />
                    <div className='flex flex-col'>
                        <span className='text-[white] font-bold text-[16px]'>Đã Thanh Toán</span>
                        <span className='text-[white] font-semibold text-[16px]'>{formatMoney(paid)}đ</span>
                    </div>
                </div>
                <div style={{ background: 'linear-gradient(to left, #3494e6, #ec6ead)' }} className='w-full flex items-center rounded-lg px-2 py-2 gap-2'>
                    <img src='/tong_nguoi_hoc.png' width={'65px'} />
                    <div className='flex flex-col'>
                        <span className='text-[white] font-bold text-[16px]'>Tổng Người Học</span>
                        <span className='text-[white] font-semibold text-[16px]'>{numberOfUser} người học</span>
                    </div>
                </div>
            </div>
            <span className='mt-[1rem] font-medium'>Các Khóa Trong Được Đăng Ký Trong Tháng Này</span>
            <div className='w-full h-[65%] flex flex-col gap-2 mt-2'>
                {payments.map((payment, index) => (
                    <div key={index} className='w-full flex items-center bg-[#f4f4f4] p-2 rounded-md justify-between'>
                        <div className='flex items-center gap-2'>
                            <img src={payment.course_image} width={'100px'} className='rounded-md' />
                            <div className='flex flex-col'>
                                <span className='font-semibold'>{payment.course_name}</span>
                                <span className='text-[14px]'>Số lượng bài học: {payment.numberOfEpisode}</span>
                            </div>
                        </div>
                        <div className='flex flex-col items-end'>
                            <span className='text-[14px]'>Tổng số người học: {payment.payments.length}</span>
                            <span className='text-[13px] font-semibold'>Tổng tiền: {formatMoney(payment.payments.reduce((total, item) => {
                                return total += item.price
                            }, 0))}đ</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ThongKeDoanhThu