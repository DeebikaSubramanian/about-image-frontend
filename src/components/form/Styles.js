import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginLeft:"10px",
    padding: theme.spacing(2),
    backgroundColor:"white", //"#ff3af3",
    marginRight:'10px',
    width:'97%',
      [theme.breakpoints.down('xs')]:
            
    {     
      width:'80%',
    },
     
  },

  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
   
  },
  formHeading:
  {
    fontFamily:'Cookie',
    color:"blue",
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
    },
  buttonSubmit: {
    marginBottom: 10,
  },
  buttons:
  {
    display:'flex',
    flexDirection:'row'
  }
}));