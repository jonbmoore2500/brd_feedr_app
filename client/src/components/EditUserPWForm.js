import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"

function EditUserPWForm({setPasswordModal}) {

    const {user, setUser} = useContext(UserContext)
    const [newPWord, setNewPWord] = useState("")
    const [newPWordConfirm, setNewPWordConfirm] = useState("")
    const [oldPWord, setOldPWord] = useState("")
    const [errors, setErrors] = useState([])

    function handleUpdatePW(e) {
        e.preventDefault()
        setErrors([])
        const passwordObj = {
            password: newPWord,
            password_confirmation: newPWordConfirm,
            old_password: oldPWord
        }
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(passwordObj)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((newUser) => setUser({...newUser, reviews: user.reviews})) 
                setPasswordModal(false)
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return(
        <>
            <h3>Update your password</h3>
            <form onSubmit={handleUpdatePW}>
                <label>Confirm old Password </label>
                <input
                    onChange={(e) => setOldPWord(e.target.value)}
                    autoComplete="off"
                    value={oldPWord}
                />
                <br></br>
                <label>Enter new Password </label>
                <input
                    onChange={(e) => setNewPWord(e.target.value)}
                    autoComplete="off"
                    value={newPWord}
                />
                <br></br>
                <label>Confirm new Password </label>
                <input
                    onChange={(e) => setNewPWordConfirm(e.target.value)}
                    autoComplete="off"
                    value={newPWordConfirm}
                />
                <br></br>
                {errors ? (
                    errors.map((err) => (
                        <h4 key={err}>{err}</h4>
                    ))
                ) : (
                    null
                )}
                <button type="submit">
                    Save changes
                </button>
            </form>
            <button onClick={() => setPasswordModal(false)}>Close</button>
        </>
    )
}

export default EditUserPWForm