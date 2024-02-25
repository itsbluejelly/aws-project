"use server"

// IMPORTING NECESSSARY FILES
    // IMPORTING FUNCTIONS
import { revalidatePath } from "next/cache"
    // IMPORTING TYPES
import { FormState } from "@/types/types"

// EXPORTING A SERVER ACTION THAT HANDLES FILE SUBMISSION
export async function uploadFile(prevState: FormState, formData: unknown): Promise<FormState>{
    try{
        console.log(formData)
        revalidatePath("/")

        return {
            message: "File uploaded successfully",
            status: "success"
        }
    }catch(error: unknown){
        return {
            message: (error as Error).message,
            status: "error"
        }
    }
}