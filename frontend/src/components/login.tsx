import '../App.css'
import { GoogleLogin } from '@react-oauth/google';
function Login() {
const apiUrl = import.meta.env.VITE_API_URL;

const handleLogin= async (e:any)=>{
  e.preventDefault();
const email=e.target.email.value
const regex = /^(?=[a-z0-9.]{6,30}@gmail\.com$)(?!.*\.{2,})[a-z0-9](?:[a-z0-9.]*[a-z0-9])?@gmail\.com$/;
const isValid = regex.test(email);
if(!isValid){
        alert('Incorrect Email Id');
    return
}
const password=e.target.password.value
try{
const res=await fetch(`${apiUrl}/login`,{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  ////HTTP only sends text (string) or binary
  body:JSON.stringify({
    email:email,
    password:password
  })
});

const data = await res.json();

if(data.success){
  //storing token
  localStorage.setItem("token", data.token);
  //It saves the JWT in the browser so you can use it later.

  alert("Login Success")
}else{
  alert(data.message)
}

}
catch(err){
console.log(err);

}
}
const handleGoogle= async(credentialResponse:any)=>{
  const token = credentialResponse.credential;

try{
const res=await fetch(`${apiUrl}/auth/google`,{
method:"POST",
headers:{
  "Content-Type": "application/json",
},
body:JSON.stringify({token})
});

const data= await res.json();

if(data.success){
  //storing token
  localStorage.setItem("token", data.token);
  //It saves the JWT in the browser so you can use it later.

  alert("Login Success")
}
}catch(err){
console.log(err);
}
}

  return (
    <div >
  
<div className="container">
<h1>Log In</h1>
<form onSubmit={handleLogin} autoComplete="off" id="myForm" >
<label>Email : <input type="text" name="email" required autoComplete="off"/></label>
<label>Password : <input type="password"
name="password" required autoComplete="off"/></label>


<div className="buttons">
<button type="submit"  className="submitBtn">Submit</button>

</div>
</form>
<GoogleLogin  
  onSuccess={handleGoogle}  
  onError={() => console.log("Login Failed")}  
/>
</div>
    
    </div>
  )
}

export default Login;