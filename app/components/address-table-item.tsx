import { TableRow, TableCell, Button } from "@mui/material";
import { Address } from "../Models/addressModel";
import { AddEditAddress } from "./addEditAddress";

export const AddressTableItem = ({ address, onViewAddress, onDeleteAddress, refreshAddresses}: {
    address: Address,
    onViewAddress :(address : Address) => void, onDeleteAddress: (address: Address) => void
}) => {
    return (
        <TableRow key={address.addressId}>
            <TableCell>{address.house_Apt}</TableCell>
            <TableCell>{address.street}</TableCell>
            <TableCell>{address.city}</TableCell>
            <TableCell>{address.state}</TableCell>
            <TableCell>{address.postalCode}</TableCell>
            <TableCell>{address.country}</TableCell>
            <TableCell> 
                <AddEditAddress buttonType={true} address={address} customerId={address.customerId} refreshAddresses={refreshAddresses}></AddEditAddress>
                
                 {/* <Button variant="outlined" onClick={() =>{onViewAddress(address)}}>Ver</Button> */}
                <Button variant="outlined" onClick={() => onDeleteAddress(address)} color="warning">Eliminar</Button>
            </TableCell>


        </TableRow>

    );
}