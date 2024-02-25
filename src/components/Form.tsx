"use client"

export default function Form(){
    return (
        <div className="form-wrapper">
            <form action="">
                <input 
                    type="file" 
                    name="file" 
                    id="file"
                    accept="images/*" 
                />

                <button 
                    type="submit"
                    className="submit-button"
                >Upload file</button>
            </form>
        </div>
    )
}