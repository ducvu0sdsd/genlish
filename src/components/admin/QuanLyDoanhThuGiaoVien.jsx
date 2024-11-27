import { notifyContext, notifyType } from '@/context/NotifyContext'
import { api, TypeHTTP } from '@/utils/api'
import { formatMoney, typePayments } from '@/utils/other'
import React, { useContext, useEffect, useState } from 'react'

const QuanLyDoanhThuGiaoVien = () => {
    const { notifyHandler } = useContext(notifyContext)
    const [payments, setPayments] = useState([])
    const [reload, setReload] = useState(false)

    const getData = () => {
        api({ type: TypeHTTP.GET, sendToken: true, path: '/payment/get-withdraw-teacher' })
            .then(res => {
                let arr = []
                res.forEach(item => {
                    if (!arr.map(item1 => item1.teacher._id).includes(item.provider._id)) {
                        arr.push({
                            teacher: item.provider
                        })
                    }
                })
                arr = arr.map(item => {
                    const filter = res.filter(item1 => item1.provider._id === item.teacher._id)
                    return { ...item, payments: filter }
                })
                setPayments(arr)
            })
    }

    useEffect(() => {
        api({ type: TypeHTTP.GET, sendToken: true, path: '/payment/get-withdraw-teacher' })
            .then(res => {
                let arr = []
                res.forEach(item => {
                    if (!arr.map(item1 => item1.teacher._id).includes(item.provider._id)) {
                        arr.push({
                            teacher: item.provider
                        })
                    }
                })
                arr = arr.map(item => {
                    const filter = res.filter(item1 => item1.provider._id === item.teacher._id)
                    return { ...item, payments: filter }
                })
                setPayments(arr)
            })
    }, [])

    useEffect(() => {
        getData()
    }, [])

    const handleComplete = (payments, teacher) => {
        api({
            type: TypeHTTP.POST, sendToken: true, path: '/payment/complete-withdraw', body: payments.map(item => {
                return { ...item, type: typePayments.moneyToTeacher }
            })
        })
            .then(res => {
                notifyHandler.notify(notifyType.SUCCESS, 'Đã cập nhật trạng thái')
                getData()
                // notify
                const body1 = {
                    toUser: {
                        _id: teacher._id,
                        fullName: teacher.fullName,
                        avatar: teacher.avatar
                    },
                    fromUser: {
                        _id: 'admin',
                        fullName: 'admin',
                        avatar: 'admin'
                    },
                    content: `Quản trị viên đã chuyển tiền`,
                    type: 'notify'
                }
                api({ type: TypeHTTP.POST, sendToken: false, path: '/notification/save', body: body1 })
            })
    }

    const handleReject = (payments, teacher) => {
        api({
            type: TypeHTTP.POST, sendToken: true, path: '/payment/fail-withdraw', body: payments.map(item => {
                return { ...item, type: typePayments.studentTranfer }
            })
        })
            .then(res => {
                notifyHandler.notify(notifyType.SUCCESS, 'Đã cập nhật trạng thái')
                getData()
                // notify
                const body1 = {
                    toUser: {
                        _id: teacher._id,
                        fullName: teacher.fullName,
                        avatar: teacher.avatar
                    },
                    fromUser: {
                        _id: 'admin',
                        fullName: 'admin',
                        avatar: 'admin'
                    },
                    content: `Quản trị viên đã từ chối yêu cầu rút tiền của bạn`,
                    type: 'notify'
                }
                api({ type: TypeHTTP.POST, sendToken: false, path: '/notification/save', body: body1 })
            })
    }

    return (
        <section style={{ marginLeft: `-${screen * 100}%` }} className='flex flex-col w-full relative h-[100%] transition-all'>
            <div className='min-w-[100%] flex flex-col gap-2 h-[100%] overflow-auto p-[1rem]'>
                <div className='w-full flex justify-between mb-[0.5rem]'>
                    <span className='font-semibold'>Yêu cầu rút tiền từ giáo viên</span>
                </div>
                <div className="w-full max-h-[90%] mt-2 overflow-y-auto relative">
                    <table className="w-full text-sm text-left rtl:text-right ">
                        <thead className="sticky top-0 left-0 text-xs  uppercase bg-gray-50 ">
                            <tr>
                                <th
                                    scope="col"
                                    className="w-[5%] py-3 text-center"
                                >
                                    #
                                </th>
                                <th scope="col" className="w-[15%] py-3">
                                    Giáo Viên
                                </th>
                                <th scope="col" className="w-[20%] py-3">
                                    Trạng thái
                                </th>
                                <th scope="col" className="w-[17%] py-3">
                                    Tổng tiền
                                </th>
                                <th scope="col" className="w-[17%] py-3">
                                    Các thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className=" w-[full] font-medium">
                            {payments.map((payment, index) => (
                                <tr
                                    key={index}
                                    className="odd:bg-white even:bg-gray-50  border-b "
                                >
                                    <td
                                        scope="row"
                                        className="px-6 py-4 text-center font-medium"
                                    >
                                        {index + 1}
                                    </td>
                                    <td className="py-4 text-[15px]">
                                        {payment.teacher.fullName}
                                    </td>
                                    <td
                                        className="py-4"
                                    >
                                        Yêu cầu rút tiền
                                    </td>
                                    <td
                                        className="py-4"
                                    >
                                        {formatMoney(payment.payments.reduce((total, item) => total += item.price, 0))}đ
                                    </td>
                                    <td className="py-4 flex items-center gap-2">
                                        <button
                                            onClick={() => handleReject(payment.payments, payment.teacher)} // Assuming each gate has a unique ID
                                            className="text-[white] bg-[red] text-[13px] px-3 py-1 rounded-md focus:outline-none"
                                        >
                                            Từ chối
                                        </button>
                                        <button
                                            onClick={() => handleComplete(payment.payments, payment.teacher)} // Assuming each gate has a unique ID
                                            className="text-[white] bg-[blue] text-[13px] px-3 py-1 rounded-md focus:outline-none"
                                        >
                                            Đã chuyển
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default QuanLyDoanhThuGiaoVien