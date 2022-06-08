import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>
(
    {
        appBarSearch:{
            borderRadius:4,
            marginBottom:'1rem',
            display:'flex',
            flexDirection:'row',
            justifyContent:"space-between",
            padding:'16px',
            alignItems:'center',
            backgroundColor:"white", //"#c2e4ff",
            [theme.breakpoints.down('xs')]:
            
    {     
        flexDirection:"column"
    },
        },
        searchBar:
        {
            width:'400px',
        
        [theme.breakpoints.down('xs')]:
        {     
            width:'215px',
        },
    },
        SearchButton:
        {
            height:'40px',
        },
        pagination:
        {
            borderRadius:4,
            marginTop:'1rem',
            padding:'16px',
            color:"white",
        },
        // gridContainer:
        // {
        //     [theme.breakpoints.down('xs')]:
        //     {
        //         flexDirection:'column-reverse',
        //     },
        // },
        
    }
));