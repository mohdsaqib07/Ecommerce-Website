import { Grid, Box,styled,Container,Paper } from '@mui/material';
import PageContainer from '@/components/container/PageContainer';
import Navbar from '@/components/Navbar'
// components
import SalesOverview from '@/components/dashboard/SalesOverview';
import DailyActivity from '@/components/dashboard/DailyActivity';
import ProductPerformance from '@/components/dashboard/ProductPerformance';
import BlogCard from '@/components/dashboard/Blog';
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "@/components/footer/page";
import { baselightTheme } from "@/utils/theme/DefaultColors";

import CssBaseline from "@mui/material/CssBaseline";
import {useState} from 'react';
import BaseCard from '@/components/BaseCard';
import { createTheme, ThemeProvider  } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));
  
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });
const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));
const Orders = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <ThemeProvider theme={baselightTheme} > 
    <CssBaseline />
    <MainWrapper className='mainwrapper'>
    <Sidebar />
    <PageWrapper className="page-wrapper">
    <Header toggleMobileSidebar={() => setMobileSidebarOpen(!isMobileSidebarOpen)} />
    <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
         <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ProductPerformance />
      </Grid>
    </Grid>
  <Footer/>
  </Container>
  </PageWrapper>
  </MainWrapper>
  </ThemeProvider>
  )
}

export default Orders;
