"use server"

// IMPORTING NECESSSARY FILES
    // IMPORTING FUNCTIONS
import { revalidatePath } from "next/cache"
    // IMPORTING TYPES
import { FormState } from "@/types/types"

// EXPORTING A SERVER ACTION THAT HANDLES FILE SUBMISSION
export async function uploadFile(prevState: FormState): Promise<FormState>{
    try{
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