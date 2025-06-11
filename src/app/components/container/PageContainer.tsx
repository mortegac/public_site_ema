import { Box } from '@mui/material';

type Props = {
  description?: string;
  children: React.ReactNode;
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => (
  <Box>
    <title>{title}</title>
    <meta name="description" content={description} />
    {children}
  </Box>
);

export default PageContainer;
