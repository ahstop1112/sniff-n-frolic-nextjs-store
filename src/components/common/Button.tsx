import * as React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

type Props = ButtonProps & {
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;