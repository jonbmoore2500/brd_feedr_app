import React from "react"

function EditRevForm({review, handleDelete, handleEdit}) {



    return(
        <div>
            <button >Edit</button>
            <button onClick={() => handleDelete(review.id)}>Delete</button>
        </div>
    )
}

export default EditRevForm