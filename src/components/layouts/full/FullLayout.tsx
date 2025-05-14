import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { AppState } from '../../../store/store';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { setDir } from '../../../store/customizer/CustomizerSlice';
import { useTranslation } from 'react-i18next';

const FullLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const activDir = useAppSelector((state: AppState) => state.customizer.activeDir);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language;
    dispatch(setDir(currentLang === 'ar' ? 'rtl' : 'ltr'));
  }, [i18n.language, dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        flexDirection: activDir === 'rtl' ? 'row-reverse' : 'row',
      }}
    >
      {children}
    </Box>
  );
};

export default FullLayout; 