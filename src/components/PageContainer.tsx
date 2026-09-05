'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  sx?: object;
}

export default function PageContainer({
  children,
  maxWidth = 'lg',
  sx = {},
}: PageContainerProps) {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        minHeight: '75vh',
        ...sx,
      }}
    >
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
}
