"use client";
import { useFormStatus } from "react-dom";

export default function FormSubmit(){
    const status = useFormStatus();
    
    if(status.pending){
        return(
            <>
            <span>Creating Post... </span>
            {/* Used span here to prevent hydration error*/}
            </>
        )
    }
    
    return(

        <>
        <button type="reset">Reset</button>
        <button>Create Post</button>
        </>

        )
}

