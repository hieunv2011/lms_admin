import React, { useEffect } from 'react';
import {
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiFieldPassword,
  EuiButton,
  EuiSpacer,
  EuiLink,
  EuiIcon,
  EuiText,
} from '@elastic/eui';
import bg from "../assets/bg.jpg";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';
import useApi from '../utils/useApi';
import { setProfile, removeToken } from '../utils/storage';
import { useForm, Controller } from 'react-hook-form';

const inputTextFieldStyle = { width: "100%" };
const inputPasswordFieldStyle = { width: "100%" };
const formRowStyle = { marginBottom: "1rem", paddingTop: "10px" };
const buttonStyle = { marginTop: "1rem" };

const Login = () => {
  const navigate = useNavigate();
  const { loginByUserIdPwd } = useApi();
  const { isAuthenticated, setIsAuthenticated, setUserProfile } = useAppContext();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      userId: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleOnSubmit = async (data) => {
    const { userId, password } = data;
    try {
      const response = await loginByUserIdPwd(userId, password);
      setProfile(response.data);
      setUserProfile(response.data);
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
      removeToken();
    }
  };

  return (
    <div
      className="flex flex-col justify-between items-center"
      style={{
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      <div
        className="flex flex-row items-center space-x-2"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      >
        <EuiIcon type="agentApp" size="xl" className="bg-white rounded-lg p-2" />
        <p className="text-white text-2xl font-bold">SHLX</p>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <EuiForm
          component="form"
          onSubmit={handleSubmit(handleOnSubmit)}
          className="bg-white px-32 py-20 rounded-2xl flex flex-col items-center"
        >
          <EuiText>
            <h2>Hệ thống</h2>
          </EuiText>

          <EuiFormRow label="Tên đăng nhập" style={formRowStyle} className="w-96">
            <Controller
              name="userId"
              control={control}
              render={({ field: { ref, ...fieldAttrs } }) => (
                <EuiFieldText
                  fullWidth
                  inputRef={ref}
                  {...fieldAttrs}
                  placeholder="Nhập email của bạn ..."
                  style={inputTextFieldStyle}
                />
              )}
            />
          </EuiFormRow>

          <EuiFormRow label="Mật khẩu" style={formRowStyle} className="w-96">
            <Controller
              name="password"
              control={control}
              render={({ field: { ref, ...fieldAttrs } }) => (
                <EuiFieldPassword
                  fullWidth
                  inputRef={ref}
                  {...fieldAttrs}
                  type="dual"
                  placeholder="Nhập mật khẩu của bạn ..."
                  style={inputPasswordFieldStyle}
                />
              )}
            />
          </EuiFormRow>

          <EuiButton type="submit" fill style={buttonStyle} className="w-52">
            ĐĂNG NHẬP
          </EuiButton>

          <EuiSpacer />
          <EuiLink>Quên tài khoản/ Mật khẩu ?</EuiLink>
        </EuiForm>
      </div>

      <div className="flex justify-between items-center text-white w-full px-4 py-2">
        <h3 className="text-xs">HỆ THỐNG QUẢN LÝ ĐÀO TẠO LÁI XE</h3>
        <h3 className="text-xs">
          Giải pháp của Toàn Phương SHLX. 0904.666.329 - 0982.911.000. Email:
          shlx@toanphuong.com.vn
        </h3>
      </div>
    </div>
  );
};

export default Login;
