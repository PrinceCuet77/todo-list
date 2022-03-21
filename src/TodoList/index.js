import { useReducer, useState } from 'react'
import Modal from './Modal'

// reducer function
import { reducer } from './reducer'

// Default state
const defaultState = {
    people: [],
    isModalOpen: false,
    modalContent: '',
}

const Index = () => {
    // Storing the item from the form
    const [name, setName] = useState('')

    // useReducer
    const [state, dispatch] = useReducer(reducer, defaultState)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (name) {
            // create a new item with id and item name
            const newItem = { id: new Date().getTime().toString(), name }

            // dispatch function
            dispatch({ type: 'ADD_ITEM', payload: newItem })

            // After clicking the add button, name field should be empty
            setName('')
        } else {
            dispatch({ type: 'NO_VALUE' })
        }
    }

    const closeModal = () => {
        dispatch({ type: 'CLOSE_MODAL' })
    }

    return (
        <>
            {state.isModalOpen && (
                <Modal
                    closeModal={closeModal}
                    modalContent={state.modalContent}
                />
            )}
            <form onSubmit={handleSubmit} className='form'>
                <div>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button type='submit'>add </button>
            </form>
            {state.people.map((person) => {
                return (
                    <div key={person.id} className='item'>
                        <h4>{person.name}</h4>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: 'REMOVE_ITEM',
                                    payload: person.id,
                                })
                            }
                        >
                            remove
                        </button>
                    </div>
                )
            })}
        </>
    )
}

export default Index
