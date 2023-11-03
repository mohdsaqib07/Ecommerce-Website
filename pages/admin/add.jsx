import {
    Paper,
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
    Box,
    Container
} from '@mui/material'
import PageContainer from '@/components/container/PageContainer';
import Navbar from '@/components/Navbar'
// components
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "@/components/footer/page";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import CssBaseline from "@mui/material/CssBaseline";
import {useState} from 'react';
import BaseCard from '@/components/BaseCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

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
const AddItems = ({notify}) => {
  const defaultitemvalues = {
    "name":"",
    "price":0,
    "size":"",
    "category":"",
    "color":"",
    "description":"",
    "image":"",
    "sitem.availableQty":0,
    "slug":""
  }
  const [sitem,setSItem] = useState(defaultitemvalues)
  const handleChange=(e)=>{
    setSItem({...sitem,[e.target.name]:e.target.value})
    console.log(sitem)
  }
  const postProduct =async  (e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/addproducts',{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({title:sitem.name,price:sitem.price,slug:sitem.slug.toLowerCase(),image:sitem.image,size:sitem.size.toUpperCase(),desc:sitem.description,category:sitem.category.toLowerCase(),color:sitem.color.toLowerCase(),availableQty:sitem.availableQty})
    })
    const items = await response.json();
    if(response.status === 200){
      notify(`${sitem.name} successfully added to the ${sitem.category} page`,'success')
      setSItem(defaultitemvalues)
    }
    else{
      notify(`Unable to add the ${sitem.name} to the ${sitem.category} page`,'error')
      setSItem(defaultitemvalues)
    }
  }
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
  <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Add Product">
            <>
            <Stack spacing={3}>
              <TextField
                id="name-basic"
                label="Name"
                variant="outlined"
              
                name='name'
                value={sitem.name || ""}
                onChange={handleChange}
              />
              
              <TextField
                id="pass-basic"
                label="Price"
                type="number"
                variant="outlined"
                name='price'
                value={sitem.price || ""}
                onChange={handleChange}
              />
              <TextField
                id="pass-basic"
                label="Available Quantity"
                type="number"
                variant="outlined"
                name='availableQty'
                value={sitem.availableQty || ""}
                onChange={handleChange}
              />
                <TextField
                id="pass-basic"
                label="Size"
                type="text"
                variant="outlined"
                name='size'
                value={sitem.size || ""}
                onChange={handleChange}

              />
                   <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="tshirts"
                    control={<Radio />}
                    label="Tshirts"
                    name="category"
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    value="hoodies"
                    control={<Radio />}
                    label="Hoodes"
                    name="category"
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    value="stickers"
                    control={<Radio />}
                    label="Stickers"
                    name="category"
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    value="mugs"
                    control={<Radio />}
                    label="Mugs"
                    name="category"
                    onChange={handleChange}
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                id="pass-basic"
                label="Slug"
                type="text"
                variant="outlined"
                name='slug'
                value={sitem.slug || ""}
                onChange={handleChange}
              />
               <TextField
                id="pass-basic"
                label="Color"
                type="text"
                variant="outlined"
                name='color'
                value={sitem.color || ""}
                onChange={handleChange}
              />
              <TextField
                id="name-basic"
                label="Image URL"
                variant="outlined"
                name='image'
                value={sitem.image || ""}
                onChange={handleChange}
              />
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                variant='standard'
                name='description'
                value={sitem.description || ""}
                onChange={handleChange}
              />
              
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Terms & Condition"
                />
                <FormControlLabel
                  disabled
                  control={<Checkbox />}
                  label="Disabled"
                />
              </FormGroup>
              </Stack>
            <br />
            <Button className='text-xl bg-cyan-400 text-white hover:bg-cyan-400 font-black' onClick={postProduct} >
              Add
            </Button>
            </>
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

export default AddItems;
