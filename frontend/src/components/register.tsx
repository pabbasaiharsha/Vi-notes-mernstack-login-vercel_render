import '../App.css';

const apiUrl = import.meta.env.VITE_API_URL;
function Register(){
    const handleRegister=async (e:any)=>{
        e.preventDefault();
const email=e.target.email.value;
const regex = /^(?=[a-z0-9.]{6,30}@gmail\.com$)(?!.*\.{2,})[a-z0-9](?:[a-z0-9.]*[a-z0-9])?@gmail\.com$/;
const isValid = regex.test(email);
if(!isValid){
        alert('Incorrect Email Id');
    return
}
const password=e.target.password.value;
const cpassword=e.target.cpassword.value;
if(password!=cpassword){
    alert('Check Confirm Password');
    return

}else{
try{
const reg= await fetch(`${apiUrl}/register`,{
    method:"POST",
    headers:{
         "Content-Type":"application/json"
    },
    body:JSON.stringify({
email:email,
password:password,
    })
})
const k=await reg.json();
console.log(k);
if(k.success){
    alert('Registered Successfully')
}else{
    alert(k.message)
}
}
catch(err){
    console.log(err)
}
}
    }
 
return (
    <div >
  
<div className="container">
<h1>Register</h1>
<form onSubmit={handleRegister} autoComplete="off" id="myForm" >
<label>Email : <input type="text" name="email" required autoComplete="off"/></label>
<label>Password : <input type="password"
name="password" required autoComplete="off"/></label>
<p id="rules"></p>
<label>Confirm Password : <input type="password"
name="cpassword" required autoComplete="off"/></label>


<div className="buttons">
<button type="submit"  className="submitBtn">Submit</button>

</div>
</form>
</div>
    
    </div>
  )
}
export default Register;