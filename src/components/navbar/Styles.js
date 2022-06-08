import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    backgroundColor:"white", //'#C2E4FF',
    [theme.breakpoints.down('xs')]:
    {     
        flexDirection:"column"
    },
  },
  heading: {
    // color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    fontFamily:'Cookie',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '500px',
    [theme.breakpoints.down('xs')]:
    {     
        flexDirection:"column",
        alignItems: 'center',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '400px',
    [theme.breakpoints.down('xs')]:
    {     
        flexDirection:"column",
        alignItems: 'center',
    },
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  
}));