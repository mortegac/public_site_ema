import { Card } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { AppState } from '@/store/store';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const BaseCard = ({ children }: Props) => {
  const customizer = useAppSelector((state: AppState) => state.customizer);

  return (
    <Card
      sx={{ display: 'flex', p: 0 }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      {children}
    </Card>
  );
};

export default BaseCard;
