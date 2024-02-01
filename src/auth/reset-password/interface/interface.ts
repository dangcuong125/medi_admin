
export type ValueNames = 'code1' | 'code2' | 'code3' | 'code4' | 'code5' | 'code6';

export type IResetPasswordFormValuesProps = {
    code1: string;
    code2: string;
    code3: string;
    code4: string;
    code5: string;
    code6: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

export type IReqResetPass = {
  password: string,
  token: string,
}

