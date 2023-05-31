import {useState, MouseEvent, useEffect, Fragment, } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { customerService } from '../services/customerService';
import Title from './Title';
import { Customer } from '../Models/customerModel';
import { AddCustomer } from './addCustomer';
import { AddressTableItem } from './address-table-item';
import customers from './customers';
import { Address } from '../Models/addressModel';
import { AddEditAddress } from './addEditAddress';

export const CheckCustomer  = ({open, handleClickOpen, handleClose, customer}) => {
  

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [address, setAddress] = useState<Address>();
  const [openDialog,setOpenDialog] = useState(false);
  

  const refreshAddresses = () => {
    customerService.getAddresses(customer.customerId)
      .then((res) => {  setAddresses(res); console.log(res)  })
      .catch((er) => console.log(er))
  }
  
  const onDeleteAddress = (address: Address) => {
    customerService.removeAddress(address.addressId)
      .then((res) => { if (res) { refreshAddresses() } })
      .catch((er) => { console.log(er) })
    return;
  }

  const onViewAddress = (address: Address) => {
    setAddress(address);
  
  }
 

  
  useEffect(refreshAddresses,[customer.customerId])
  
  return (
        <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle align='center' >Direcciones cliente </DialogTitle>
        <DialogContent>
        <TextField sx={{p:1}}
          label="Nombre"
          id="name"
          
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
          size="small"
          value={customer.name}
       
        />
       <TextField sx={{p:1}}
          label="Numero de telefono"
          id="filled-size-small"
          placeholder='839-126-4542'
          type='number'
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
          size="small"
          value={customer.phoneNumber}
        />
      
      

          <TextField sx={{p:1}}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
           
            fullWidth
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
            value={customer.email}
           
          />
      <Title>Clientes</Title>
      <Table  size="small">
        <TableHead>
          <TableRow>
            <TableCell>#Casa</TableCell>
            <TableCell>Calle</TableCell>
            <TableCell>Ciudad</TableCell>
            <TableCell>Estado/Provincia</TableCell>
            <TableCell>Codigo Postal</TableCell>
            <TableCell>Pais</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addresses &&
            addresses.map((address) => (
              <AddressTableItem address={address} onDeleteAddress={(address: Address) => onDeleteAddress(address)} onViewAddress={onViewAddress} refreshAddresses={refreshAddresses} key={address.addressId} 
          
                />
            ))}
        </TableBody>
      </Table>
      
        </DialogContent>
        <DialogActions>
        
        <AddEditAddress  handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} customerId = {customer.customerId} onAddSuccess={()=>refreshAddresses()}  ></AddEditAddress>
    
          <Button variant='outlined' onClick={handleClose}>Cancelar</Button>
          
        </DialogActions>
     
      </Dialog>
  );
}