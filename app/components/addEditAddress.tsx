import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { customerService } from '../services/customerService';

export const AddEditAddress  = ({customerId,address,buttonType, refreshAddresses, onAddSuccess}) => {
  
  const [open, setOpen] = useState(false);
  const [house_Apt, setHouse_Apt] = address === undefined ? useState("") : useState(address.house_Apt) ;
  const [street, setStreet] = address === undefined ? useState("") : useState(address.street) ;
  const [city, setCity] = address === undefined ? useState("") : useState(address.city) ;
  const [state, setState] = address === undefined ? useState("") : useState(address.state) ;
  const [postalCode, setPostalCode] = address === undefined ? useState("") : useState(address.postalCode) ;
  const [country, setCountry] = address === undefined ? useState("") : useState(address.country) ;
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const updateAddress = () => {
    customerService.updateAddress({address,customerId,house_Apt,street,city,state,postalCode,country})
    .then((res)=>{
      if(res){console.log(res,address); handleClose(),refreshAddresses()}
    })
    .catch(e=>console.log(e))

  }

  const addAddress = () => {

    customerService.postAddress({customerId,house_Apt,street,city,state,postalCode,country})
    .then((res)=>{
      if(res) handleClose(), onAddSuccess()
    })
    .catch(e=>console.log(e))
  };

  


  const handleClose = () => {
    setOpen(false);
  };

  
  console.log(address)
  
  const updateHouse_Apt = (e: any)=> { setHouse_Apt(e.target.value)}
  const updateStreet = (e: any)=> { setStreet(e.target.value)}
  const updateCity = (e: any)=> { setCity(e.target.value)}
  const updateState = (e: any)=> { setState(e.target.value)}
  const updatePostalCode = (e: any)=> { setPostalCode(e.target.value)}
  const updateCountry = (e: any)=> { setCountry(e.target.value)}
  
  
  return (
    <div>
      { buttonType === true ?  <Button variant="outlined" onClick={handleClickOpen}>
        Ver
      </Button>  :
      
      
      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar direccion
      </Button>}
      <Dialog open={open} onClose={handleClose}   >
        <DialogTitle  align='center' >Agregar direccion</DialogTitle>
        <DialogContent >
          <DialogContentText> <div>
        <TextField sx={{p:1}}
          autoFocus
          label="Numero de casa"
          id="filled-size-small"
          placeholder='eg. B2'
          variant="filled"
          value={house_Apt}
          onChange={updateHouse_Apt}
        />
       <TextField sx={{p:1}}
          label="Calle"
          id="filled-size-small"
          placeholder='eg. Av. Mella'
          variant="filled"
          value={street}
          onChange={updateStreet}
        />
      
      
      </div>
          </DialogContentText>
          <TextField sx={{p:1}}
                    
            id="name"
            label="Ciudad"
            variant="filled"
            value={city}
            onChange={updateCity}
          />

          <TextField  sx={{p:1} }
          label="Provincia"
          id="filled-size-small"
          placeholder='eg. Santiago'
          variant="filled"
          value={state}
          onChange={updateState}
          />
          
      
          <TextField sx={{p:1}}
          label="Postal code"
          id="filled-size-small"
          placeholder='eg. 62000'
          variant="filled"
          value={postalCode}
          onChange={updatePostalCode}
          />

      <FormControl variant="filled" sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="demo-simple-select-filled-label">País</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
            value={country}

            label="País"
           
            onChange={updateCountry}
          >
            <MenuItem value={"Cuba"}>Cuba</MenuItem>
            <MenuItem value={"Republica Dominicana"}>Republica Dominicana</MenuItem>
            <MenuItem value={"Puerto Rico"}>Puerto Rico</MenuItem>
            <MenuItem value={"Jamaica"}>Jamaica</MenuItem>
          </Select> 
        </FormControl>
          
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
         { 
          buttonType === true ?
         
         <Button onClick={updateAddress}>Modificar</Button>
        :
        <Button onClick={addAddress}>Agregar</Button>
        
      }
        </DialogActions>
      </Dialog>
    </div>
  );
}