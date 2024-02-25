// IMPORTING NECESSARY FILES
    // IMPORTING GENERICS
import { ObjectOmitter } from "./generics"

// EXPORTING A TYPE FOR THE FORMSTATE
export type FormState = {
    status: "success" | "error" | null,
    message: string
}

// EXPORTING A TYPE FOR THE FORMDATA
export type FormData = { 
    file: File
    get(text: keyof ObjectOmitter<FormData, "get">): FormData[keyof ObjectOmitter<FormData, "get">] 
}