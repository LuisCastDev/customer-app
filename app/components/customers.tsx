import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { customerService } from '../services/customerService';
import { Customer } from '../Models/customerModel';
import Button from '@mui/material/Button';
import { AddCustomer } from './addCustomer';



function preventDefault(event: React.MouseEvent) {
  event.preventDefault();

}



export default function Orders() {

   const [customers, setCustomers] =React.useState <Customer[]>([]);
   
   const refreshData = ()=>{
    customerService.getAll()
    .then((res)=>{ setCustomers(res)})
    .catch((er)=>console.log(er))
    }

    React.useEffect(refreshData,[]) 



    const deleteCustomer = (id: number)=>{ 
        customerService.remove(id) 
        .then((res)=>{ if(res){refreshData()}})
        .catch((er)=>{console.log(er)})
    }
  return (
    <React.Fragment>
      <Title>Clientes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id cliente</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Numero telefono</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers &&
           customers.map((customer) => (
            <TableRow key={customer.customerId}>
            <TableCell>{customer.customerId}</TableCell>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.phoneNumber}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell> <Button variant="outlined" >Ver</Button> 
             <Button variant="outlined" onClick={()=>deleteCustomer(customer.customerId)} color="warning">Eliminar</Button>
              </TableCell>
       
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
      </Link>
    
    </React.Fragment>
  );
}