import React, {useState} from "react"

function EditRevForm({review, handleDelete, handleEdit}) {

    const [newRating, setNewRating] = useState(review.rating)
    const [newRevText, setNewRevText] = useState(review.text)
    const [errors, setErrors] = useState([])
    const [showModal, setShowModal] = useState(false)

    function handleRevDelete(deleteRevID) {
        fetch(`/reviews/${deleteRevID}`, {method: "DELETE"})
        .then((r) => {
            if (r.ok) {
                r.json().then(() => {
                    handleDelete(review.id)
                    setShowModal(false)
                })
            }
        })
    }
    
    function handleSubmitEdit(e) {
        e.preventDefault()
        setErrors([])
        const editedRevObj = {
            rating: newRating,
            text: newRevText
        }
        fetch(`/reviews/${review.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedRevObj)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((rev) => {
                    handleEdit(rev)
                    setShowModal(false)
                })
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return(
        <div>
            <button onClick={() => setShowModal(true)}>Edit</button>
            <button onClick={() => handleRevDelete(review.id)}>Delete</button>
            {showModal ? (
                <div className="modal">
                <div onClick={() => setShowModal(false)} className="overlay"></div> 
                <div className="modal-content">
                    <form onSubmit={handleSubmitEdit} >
                        <input 
                            onChange={(e) => setNewRating(e.target.value)}
                            autoComplete="off"
                            value={newRating}
                        />
                        <input 
                            onChange={(e) => setNewRevText(e.target.value)}
                            autoComplete="off"
                            value={newRevText}
                        />
                        {errors.length > 0 ? (
                            errors.map((err) => (
                                <h4 key={err.index}>{err}</h4>
                            ))
                        ) : (
                            null
                        )}
                        <button type="submit">Save Edits</button>
                    </form>
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
            </div>
            ) : (
                null
            )}
        </div>
    )
}

export default EditRevForm