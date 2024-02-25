"use server"

// IMPORTING NECESSSARY FILES
    // IMPORTING FUNCTIONS
import { revalidatePath } from "next/cache"
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3"
import sharp from "sharp"
    // IMPORTING TYPES
import { FormState, FormData } from "@/types/types"

// ENTERING CREDENTIALS
const client = new S3Client([{
    region: process.env.NEXT_AWS_S3_REGION,

    credentials: {
        accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY
    }
}])

// GENERATING A FUNCTION THAT UPLOADS FILE TO THE CLOUD
async function uploadToCloud(file: File): Promise<void>{
    try{
        // GENERATE A BUFFER OF THE IMAGE
        const oldBuffer = Buffer.from(await file.arrayBuffer())
        
        const binaryBuffer = await sharp(oldBuffer)
            .resize(800, 400)
            .jpeg({quality: 50})
            .toBuffer()

        // GENERATE A COMMAND TO SEND TO AW3 AFTER CREATING AN IMAGE INSTANCE TO THE CLOUD
        const command = new PutObjectCommand({
            Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
            Key: `${file.name}/date/${Date.now()}`,
            Body: binaryBuffer,
            ContentType: file.type
        })

        await client.send(command)
    }catch(error){
        throw error
    }
}

// EXPORTING A SERVER ACTION THAT HANDLES FILE SUBMISSION
export async function uploadFile(prevState: FormState, formData?: FormData): Promise<FormState>{
    try{
        // GET FILE FROM FORMDATA
        const file = formData?.get("file")

        // VALIDATE IF FILE WAS SUBMITTED
        if(!file || !file.size){
            throw new Error("Please submit a file")
        }

        // UPLOAD THE IMAGE
        await uploadToCloud(file)
        revalidatePath("/")

        return {
            message: `File ${file.name} uploaded successfully`,
            status: "success"
        }
    }catch(error: unknown){
        return {
            message: (error as Error).message,
            status: "error"
        }
    }
}