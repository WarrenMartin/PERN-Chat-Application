import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast";

type SignupInputs={
    fullname:string,
    username:string,
    password:string,
    confirmPassword:string,
    gender:string,
};

const useSignup=() =>{
    const [loading,setLoading] =useState(false);
    const {setAuthUser} =useAuthContext();

    const signup =async (inputs:SignupInputs)=>{
        try {
            // The fetch function in JavaScript is used to make network requests (e.g., API calls) to a server. It allows your frontend application to send and receive data from a backend or an external API.
            const res=await fetch("/api/auth/signup",{
                method:"POST",
                headers:{
                    "content-Type":"application/json",

                },
                body:JSON.stringify(inputs)
            });
            const data=await res.json();
            
            if(!res.ok) throw new Error(data.error);
            setAuthUser(data);// update the auth message got from server
        } catch (error:any) {
            console.error(error.message)
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }
    return {loading,signup}
}

export default useSignup;


// Define SignupInputs Type

// Specifies the expected structure of user input (e.g., fullName, username, password).

// Initialize State and Context

// loading: Tracks whether the signup request is in progress.

// setAuthUser: Updates the authenticated user’s data in the global context.

// Create the signup Function

// Makes an API request to "/api/auth/signup" using the fetch function.

// Sends user input as JSON in the request body.

// Includes appropriate headers (Content-Type: application/json).

// Handle API Response

// Waits for the server response and converts it to JSON.

// If the response is unsuccessful (!res.ok), throws an error with the error message from the server.

// If successful, updates setAuthUser with the received data.

// Handle Errors

// Catches any errors and logs them to the console.

// Finalize Signup Process

// Ensures loading is set to false after the request completes.

// Return Values from the Hook

// Returns an object containing loading (to indicate the request status) and signup (the function to trigger signup).

// Export the Hook

// Makes useSignup available for use in other components.







