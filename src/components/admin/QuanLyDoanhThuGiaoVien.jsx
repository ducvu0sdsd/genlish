import { notifyContext, notifyType } from '@/context/NotifyContext'
import { api, TypeHTTP } from '@/utils/api'
import { formatMoney } from '@/utils/other'
import React, { useContext, useEffect, useState } from 'react'

const QuanLyDoanhThuGiaoVien = () => {
    const { notifyHandler } = useContext(notifyContext)
    const [payments, setPayments] = useState([])
    const [reload, setReload] = useState(false)

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

    const handleComplete = (payments) => {
        api({ type: TypeHTTP.POST, sendToken: true, path: '/payment/complete-withdraw', body: payments })
            .then(res => {
                notifyHandler.notify(notifyType.SUCCESS, 'Đã cập nhật trạng thái')
                setReload()
            })
    }

    return (
        <section style={{ marginLeft: `-${screen * 100}%` }} className='flex flex-col w-full relative h-[100%] transition-all'>
            <div className='min-w-[100%] flex flex-col gap-2 h-[100%] overflow-auto p-[1rem]'>
                <div className='w-full flex justify-between mb-[0.5rem]'>
                    <span className='font-semibold'>Quản Lý Doanh Thu Giáo Viên</span>
                </div>
                <div className="w-full max-h-[90%] mt-2 overflow-y-auto relative">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="sticky top-0 left-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        <tbody className=" w-[full] bg-black font-medium">
                            {payments.map((payment, index) => (
                                <tr
                                    key={index}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
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
                                            onClick={() => handleDelete(gate._id)} // Assuming each gate has a unique ID
                                            className="text-[white] bg-[red] text-[13px] px-3 py-1 rounded-md focus:outline-none"
                                        >
                                            Từ chối
                                        </button>
                                        <button
                                            onClick={() => handleComplete(payment.payments)} // Assuming each gate has a unique ID
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