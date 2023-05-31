import { TableRow, TableCell, Button } from "@mui/material";
import { Customer } from "../Models/customerModel";

export const CustomerTableItem = ({ customer, onViewCustomer, onDeleteCustomer}: {
    customer: Customer,
    onViewCustomer: (customer: Customer) => void, onDeleteCustomer: (customer: Customer) => void
}) => {
    return (
        <TableRow key={customer.customerId}>
            <TableCell>{customer.customerId}</TableCell>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.phoneNumber}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>  <Button variant="outlined" onClick={() => onViewCustomer(customer)}>Ver</Button>
                <Button variant="outlined" onClick={() => onDeleteCustomer(customer)} color="warning">Eliminar</Button>
            </TableCell>

        </TableRow>
    );
}