import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

import { customerService } from '../services/customerService';

export const AddCustomer  = ( {onAddSuccess}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const addCustomer = () => {
    customerService.post({name,phoneNumber,email})
    .then((res)=>{
      onAddSuccess();
      if(res) handleClose();
      
    
    })
    .catch(e=>console.log(e))
  };


  const handleClose = () => {
    setOpen(false);
   
  };

  
  
  const updateName = (e: any)=> { setName(e.target.value)}

  const updatePhoneNumber = (e: any)=> { setPhoneNumber(e.target.value)}

  const updateEmail = (e: any)=> { setEmail(e.target.value)}
  
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar Cliente
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle align='center' >Agregar cliente</DialogTitle>
        <DialogContent>
          <DialogContentText> <div>
        <TextField sx={{p:1}}
          autoFocus
          label="Nombre"
          id="filled-size-small"
          placeholder='eg. Luis Castillo'
          variant="filled"
          size="small"
          onChange={updateName}
        />
       <TextField sx={{p:1}}
          label="Numero de telefono"
          id="filled-size-small"
          placeholder='839-126-4542'
          type='number'
          variant="filled"
          size="small"
          onChange={updatePhoneNumber}
        />
      
      
      </div>
          </DialogContentText>
          <TextField sx={{p:1}}
          
            margin="dense"
            id="name"
            label="Correo Electronico"
            type="email"
            fullWidth
            variant="filled"
            onChange={updateEmail}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={addCustomer}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}