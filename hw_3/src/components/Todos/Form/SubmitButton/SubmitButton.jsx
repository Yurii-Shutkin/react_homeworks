import './SubmitButton.css'
import './SubmitButton.css'

export default function Button({ type, title, actionFn }) {
    return (
        <button
            className='submit_button'
            type={type}
            onClick={actionFn}>
            {title}
        </button>
    )
}
