import { Button } from "@mui/material"
import { Link as RouterLink } from 'react-router';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'

const BackButton = ({to, title=null}) => {
    return <Button component={RouterLink} nativeButton={false} to={to} startIcon={<ArrowBackRoundedIcon />} sx={{ background:'default.background', color: 'default.background', mb: { xs: 1.5, md: 1.5 } }}>
        Back{title && ` to ${title}`}
    </Button>
}

export default BackButton;