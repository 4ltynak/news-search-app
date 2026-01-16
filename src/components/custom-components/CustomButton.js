import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ColorButton = styled(Button)(() => ({
    color: 'white',
    backgroundColor: "#E67E22"
}));

export default function CustomButton(props) {
    return (<ColorButton {...props}></ColorButton>);
}