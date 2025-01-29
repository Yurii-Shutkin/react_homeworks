import './Button.css'

export default function Button({ title, actionFn }) {
    return (
        <button
            className='list_button'
            onClick={actionFn}>{title}
        </button>
    )
}
