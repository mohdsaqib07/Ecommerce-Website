import React from "react";
import Link from 'next/Link'
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,

} from "@mui/material";
import BaseCard from "../DashboardCard";
import Image from 'next/image'


const ProductPerfomance = ({products}) => {
  const colors = {
  "red":"error.main",
  "yellow":"warning.main",
  "blue":"primary.main",
  "green":"success.main",
  "black":"black",
  "white":"white"
}
  return (
    <BaseCard title="Available Stock">
      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Sno
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6" className='text-center'>
                  Slug
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6" >
                  AvailableQty
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Color
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Price
                </Typography>
              </TableCell>
                  <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Edit
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product,index) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                  {index+1}
                </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box className='w-full flex space-x-3'>
                      <Typography variant="h6" align="" fontWeight={600}>
                        {product.slug}
                      </Typography>
                      <Typography color="textSecondary" fontSize="13px">
                        <img
                  src={product.image}
                  alt="img"
                  style={{ width: "46px",objectFit:"cover",objectPosition:"top"}}
                  className=''
                />
              
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                  {product.availableQty}
                </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {product.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: colors[product.color],
                      color: product.color==='white'?'black':'#fff',
                    }}
                    size="small"
                    label={product.color}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">&#8377; {product.price}</Typography>
                </TableCell>
                 <TableCell align="right">
                  <Typography variant="h6"><Link className='bg-cyan-500 text-white p-2 rounded-sm font-black' href={`/admin/modify?id=${product._id}`}>Edit</Link></Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

ProductPerfomance.defaultProps = {
  products:[]
}

export default ProductPerfomance;
