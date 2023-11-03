import { Grid, Box,styled,Container } from '@mui/material';
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
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {useState} from 'react';

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
const Dashboard = () => {
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
    <PageContainer title="Dashboard" description="this is Dashboard">
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4}>
          <DailyActivity />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerformance />
        </Grid>
        <Grid item xs={12} lg={12}>
          <BlogCard />
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
  <Footer/>
  </Container>
  </PageWrapper>
  </MainWrapper>
  </ThemeProvider>
  )
}

export default Dashboard;
