"use client"

// IMPORTING NECESSARY FILES
    // IMPORTING SERVER ACTIONS
import { uploadFile } from "@/app/actions"
    // IMPORTING TYPES
import { FormState } from "@/types/types"
    // IMPORTING MODULES
import { useFormState } from "react-dom"
    // IMPORTING COMPONENTS
import Button from "./Button"

// DEFINING THE INITIAL FORMSTATE
const initialFormState: FormState = {
    message: "",
    status: null
}

// EXPORTING A FORM COMPONENT
export default function Form(){
    // OBTAINING THE FORMSTATE AND FORMHANDLER FROM THE USEFORMSTATE HOOK
    const [formState, formHandler] = useFormState<FormState>(uploadFile, initialFormState)

    return (
        <div className="form-wrapper">
            <form action={formHandler}>
                <input 
                    type="file" 
                    name="file" 
                    id="file"
                    accept="images/*" 
                />

                <Button/>
                {formState.status && <div className={`state-message ${formState.status}`}>{formState.message}</div>}
            </form>
        </div>
    )
}