"use client"

// IMPORTING NECESSARY FILES
    // IMPORTING MODULES
import { useFormStatus } from "react-dom"

// EXPORTING A BUTTON COMPONENT
export default function Button(){
    const {pending} = useFormStatus()
    return (
      <button 
        type="submit" 
        className="submit-button"
        disabled={pending}
    >
        {pending ? "Uploading..." : "Upload file"}
      </button>
    );
}