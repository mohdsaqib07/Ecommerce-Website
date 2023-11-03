import { Grid, Box,Container,ImageList,ImageListItem,Paper } from '@mui/material';
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "@/components/footer/page";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import CssBaseline from "@mui/material/CssBaseline";
import {useState} from 'react';
import BaseCard from '@/components/BaseCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Image from "next/image";
import img1 from "public/images/backgrounds/u1.jpg";
import img2 from "public/images/backgrounds/u3.jpg";
import img3 from "public/images/backgrounds/u4.jpg";
import img4 from "public/images/big/img5.jpg";
import img5 from "public/images/big/img6.jpg";
import img6 from "public/images/big/img7.jpg";
import img7 from "public/images/big/img8.jpg";


const itemData = [
  {
    img: img1 ,
    rows: 2,
    cols: 2,
  },
  {
    img: img2 ,
    title: "Burger",
    
  },
  {
    img: img3 ,
  },
  {
    img:img2,
    cols: 2,
  },
  {
    img: img4,
    cols: 2,
    rows: 2,
  },
  {
    img: img3,
    cols: 2,
    rows: 2,
  },
  
  {
    img: img6,
  },
  {
    img: img5,
    title: "Fern",
  },
  {
    img: img7,
    rows: 2,
    cols: 2,
  },
  {
    img:img2,
    cols: 2,
  },

];
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
const ImageUploader = () => {
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
        <BaseCard title="Grid Image">
          <ImageList
            
            variant="quilted"
            cols={4}
            rowHeight={121}
          >
            {itemData.map((itemimg,index) => (
              <ImageListItem
                key={index}
                cols={itemimg.cols || 1}
                rows={itemimg.rows || 1}
              >
                <Image
                  src={itemimg.img}
                  alt="img"
                  style={{ width: "100%",height:"100%",objectFit:"cover",objectPosition:"top"}}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </BaseCard>
      </Grid>
    </Grid>
  <Footer/>
  </Container>
  </PageWrapper>
  </MainWrapper>
  </ThemeProvider>
  )
}

export default ImageUploader;
