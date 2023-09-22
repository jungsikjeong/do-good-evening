import { Swiper, SwiperSlide } from 'swiper/react';
import SignInForm from './authForm/SignInForm';
import { SetStateAction } from 'react';
import SignUpForm from './authForm/SignUpForm';

interface Auth {
  authModal: boolean;
  setAuthModal: React.Dispatch<SetStateAction<boolean>>;
}

const AuthModal = ({ authModal, setAuthModal }: Auth) => {
  return (
    <div className='fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center authBgColor'>
      <div className='w-96 h-96 bg-white border rounded'>
        <Swiper className='mySwiper'>
          <SwiperSlide>
            {/* 로그인 Form */}
            <SignInForm setAuthModal={setAuthModal} />
          </SwiperSlide>
          <SwiperSlide>
            {/* 회원가입 Form */}
            <SignUpForm setAuthModal={setAuthModal} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default AuthModal;
