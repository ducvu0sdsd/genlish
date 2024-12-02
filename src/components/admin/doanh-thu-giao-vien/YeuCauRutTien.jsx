import React from 'react'

const YeuCauRutTien = ({ payments }) => {

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
                                {formatMoney(payment.payments.reduce((total, item) => total += (item.price * 0.8), 0))}đ
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
    )
}

export default YeuCauRutTien