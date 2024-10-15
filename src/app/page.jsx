'use client'
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import FourthSection from "@/components/publicPage/FourthSection";
import SecondSection from "@/components/publicPage/SecondSection";
import ThirdSection from "@/components/publicPage/ThirdSection";
import { authContext } from "@/context/AuthContext";
import { notifyContext, notifyType } from "@/context/NotifyContext";
import { api, TypeHTTP } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export const roles = {
  user: 'user',
  teacher: 'teacher',
  admin: 'admin'
}

export default function Home() {
  const { notifyHandler } = useContext(notifyContext)
  const { authHandler } = useContext(authContext)
  const [role, setRole] = useState(roles.user)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignIn = () => {
    if (role === roles.teacher) {
      if (phone === '') {
        notifyHandler.notify(notifyType.FAIL, 'Số điện thoại không được để trống')
      }
      if (password === '') {
        notifyHandler.notify(notifyType.FAIL, 'Mật khẩu không được để trống')
      }
      api({ type: TypeHTTP.POST, body: { phone: phone, password: password }, sendToken: false, path: '/auth/sign-in-with-teacher' })
        .then(res => {
          globalThis.localStorage.setItem('accessToken', res.tokens.accessToken)
          globalThis.localStorage.setItem('refreshToken', res.tokens.refreshToken)
          authHandler.setUser(res.user)
          notifyHandler.notify(notifyType.SUCCESS, 'Đăng nhập thành công')
          setTimeout(() => {
            notifyHandler.navigate('/teacher')
          }, 1500);
        })
        .catch(error => {
          notifyHandler.notify(notifyType.FAIL, error.message)
        })
    } else if (role === roles.admin) {
      if (phone === '') {
        notifyHandler.notify(notifyType.FAIL, 'Số điện thoại không được để trống')
      }
      if (password === '') {
        notifyHandler.notify(notifyType.FAIL, 'Mật khẩu không được để trống')
      }
      api({ type: TypeHTTP.POST, body: { phone: phone, password: password }, sendToken: false, path: '/auth/sign-in-with-admin' })
        .then(res => {
          globalThis.localStorage.setItem('accessToken', res.tokens.accessToken)
          globalThis.localStorage.setItem('refreshToken', res.tokens.refreshToken)
          authHandler.setUser(res.user)
          notifyHandler.notify(notifyType.SUCCESS, 'Đăng nhập thành công')
          setTimeout(() => {
            notifyHandler.navigate('/admin')
          }, 1500);
        })
        .catch(error => {
          notifyHandler.notify(notifyType.FAIL, error.message)
        })
    }
  }

  return (
    <section className="flex flex-col item-center justify-center">
      <div className="h-screen py-3 flex flex-col px-[10%]">
        <div className="flex items-end justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <div className="flex items-center w-[200px] gap-2">
              <span className="font-semibold text-[16px] text-[#595959]">Vai Trò:</span>
              <select value={role} onChange={e => setRole(e.target.value)} className="bg-[white] text-center hover:scale-[1.06] transition-all text-[#149dff] shadow-xl border-[1px] border-[#e4e4e4] font-bold text-[16px] focus:outline-0 py-[5px] rounded-lg">
                <option value={'user'} className="text-center">Học Sinh</option>
                <option value={'teacher'} className="text-center">Giáo Viên</option>
                <option value={'admin'} className="text-center">Quản Trị Viên</option>
              </select>
            </div>
            <span className="font-semibold text-[16px] text-[#595959]">Ngôn ngữ hiển thị: Tiếng Việt</span>
          </div>
        </div>
        {role === roles.user ? (
          <div className="flex items-center justify-between mt-[2rem] gap-4">
            <img src="/couple.png" className="w-[50%] animate-slight-move" />
            <div className="flex flex-col gap-2 w-[45%] items-center">
              <span className="text-center text-[25px] font-semibold">Cách học tiếng Anh miễn phí, vui nhộn, và hiệu quả</span>
              <button onClick={() => { notifyHandler.navigate('/getting-started') }} className="text-center bg-[#149dff] transition-all hover:scale-[1.06] text-[white] font-bold text-[16px] w-[60%] py-[7px] rounded-lg">Bắt Đầu</button>
              <button onClick={() => authHandler.showSignIn()} className="bg-[white] hover:scale-[1.06] transition-all text-[#149dff] shadow-xl border-[1px] border-[#e4e4e4] font-bold text-[16px] w-[60%] py-[7px] rounded-lg">Tôi Đã Có Tài Khoản</button>
            </div>
          </div>
        ) : role === roles.teacher ? (
          <div className="flex items-center justify-between mt-[4rem] gap-4">
            <div className="w-[50%] flex justify-center">
              <img src="/teacher.png" className="w-[80%] animate-slight-move" />
            </div>
            <div style={{ background: 'linear-gradient(to right, #11998e, #38ef7d)' }} className="flex flex-col gap-2 py-[2rem] rounded-xl w-[50%] items-center">
              <h1 className=' mt-[0.5rem] font-bold text-[28px] text-[white] font-poppins' >Đăng Nhập</h1>
              <span className="text-center mb-[1rem] text-[17px] font-semibold w-full px-[4rem] text-[white]">Với vai trò giáo viên, bạn có thể phân bổ bài học cho học sinh</span>
              <input value={phone} onChange={e => setPhone(e.target.value)} className='w-[18rem] sm:w-[25rem] focus:scale-[1.03] transition pt-1 text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' placeholder='Số Điện Thoại' />
              <input value={password} onChange={e => setPassword(e.target.value)} type='password' className='w-[18rem] sm:w-[25rem] focus:scale-[1.03] transition pt-1 text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' placeholder='Mật Khẩu' />
              <button onClick={() => handleSignIn()} className='hover:scale-[1.02] transition my-[0.5rem] font-semibold rounded-[10px] px-[2rem] py-[12px] text-[white] bg-[#241d49]'>Đăng Nhập</button>
              <div onClick={() => setChange('d')} className='py-1 cursor-pointer w-full text-center text-[16px] text-[white]'>Quên mật khẩu?</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-[4rem] gap-4">
            <div className="w-[50%] flex justify-center">
              <img src="/admin.png" className="w-[80%] animate-slight-move" />
            </div>
            <div style={{ background: 'linear-gradient(to right, #8a2387, #e94057, #f27121)' }} className="flex flex-col gap-2 py-[2rem] rounded-xl w-[50%] items-center">
              <h1 className=' mt-[0.5rem] font-bold text-[28px] text-[white] font-poppins' >Đăng Nhập</h1>
              <span className="text-center mb-[1rem] text-[17px] font-semibold w-full px-[4rem] text-[white]">Với vai trò quản trị viên, bạn có thể cài đặt lộ trình học và quản lý người sử dụng</span>
              <input value={phone} onChange={e => setPhone(e.target.value)} className='w-[18rem] sm:w-[25rem] focus:scale-[1.03] transition pt-1 text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' placeholder='Tên Đăng Nhập' />
              <input value={password} onChange={e => setPassword(e.target.value)} type='password' className='w-[18rem] sm:w-[25rem] focus:scale-[1.03] transition pt-1 text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' placeholder='Mật Khẩu' />
              <button onClick={() => handleSignIn()} className='hover:scale-[1.02] transition my-[0.5rem] font-semibold rounded-[10px] px-[2rem] py-[12px] text-[white] bg-[#241d49]'>Đăng Nhập</button>
              <div onClick={() => setChange('d')} className='py-1 cursor-pointer w-full text-center text-[16px] text-[white]'>Quên mật khẩu?</div>
            </div>
          </div>
        )}
      </div>
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer />
    </section>
  );
}
