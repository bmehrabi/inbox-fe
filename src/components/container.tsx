import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  minWidth?: string | number;
  maxWidth?: string | number;
  padding?: string | number;
}


const Container: React.FC<ContainerProps> = ({
                                               children,
                                               minWidth = '600px',
                                               maxWidth = '1200px',
                                               padding = '100px 20px',
                                             }) => {
  return (
    <div
      style={{
        margin: '0 auto',
        minWidth,
        maxWidth,
        width: '100%',
        padding,
      }}
    >
      {children}
    </div>
  );
};

export default Container;