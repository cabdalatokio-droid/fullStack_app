import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card" 
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
 
  const [loading, setLoading] = useState(false);
  const naviage=useNavigate();
   const {login}=useUser();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
     const {data}= await axios.post("/api/user/login-user", formData);
      console.log(data);
     toast.success(data.message);
       setLoading(false)
     login(data,data.expiresIn)
     
     setFormData({
      email:'',
      password:'',
     })
    
    //  naviage("/")
     
    } catch (error) {
        setLoading(false)
     toast.error( error.response?.data.message);
  
      
    }
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register with your info</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={handleInputChange}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={handleInputChange}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Login..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;