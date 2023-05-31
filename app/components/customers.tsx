import { useState, MouseEvent, useEffect, Fragment } from 'react';
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
import { CheckCustomer } from './checkCustomer';
import { CustomerTableItem } from './customer-table-item';
import { Address } from '../Models/addressModel';



function preventDefault(event: MouseEvent) {
  event.preventDefault();

}

export default function Customers() {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();

  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
    

  };

   const refreshCustomers = () => {
    customerService.getAll()
      .then((res) => { setCustomers(res) })
      .catch((er) => console.log(er))
  }

  useEffect(refreshCustomers, [])

  const onDeleteCustomer = (customer: Customer) => {
    customerService.remove(customer.customerId)
      .then((res) => { if (res) { refreshCustomers() } })
      .catch((er) => { console.log(er) })
    return;
  }


  const onViewCustomer = (customer: Customer) => {

    setCurrentCustomer(customer);
    setOpen(true);
   
  }
 

  return (
    <Fragment>
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
              <CustomerTableItem customer={customer} onDeleteCustomer={(customer: Customer) => onDeleteCustomer(customer)}
                onViewCustomer={onViewCustomer} key={customer.customerId} />
            ))}
        </TableBody>
      </Table>
      {currentCustomer &&
        <CheckCustomer customer={currentCustomer} handleClickOpen={handleClickOpen} handleClose={handleClose} open={open}></CheckCustomer>
      }
      <AddCustomer onAddSuccess={()=>refreshCustomers()}></AddCustomer>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
      </Link>

    </Fragment>
  );
}