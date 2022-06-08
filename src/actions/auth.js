
import * as api from '../api/index.js';

export const signin=(formData,Navigate)=>async (dispatch)=>
{
try {
    //Login

   
    const {data}=await api.signIn(formData);

    dispatch({type:"AUTH",data});

    Navigate('/');

} catch (error) 
{
    
    console.log(error);
    alert("Invalid credentials");
}
};

export const signup=(formData,Navigate)=>async (dispatch)=>
{
try {
    //Login

    const {data}=await api.signUp(formData);

    dispatch({type:"AUTH", data});

    Navigate('/');
} catch (error) {
    console.log(error)
    alert("Email Id already exist or password Mismatch");
}
};