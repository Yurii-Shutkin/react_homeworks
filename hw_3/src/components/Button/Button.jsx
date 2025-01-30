import './Button.css'

export default function Button({ type, itemId, title, actionFn, action }) {
    return (
        <button
            type={type}
            className='list_button'
            onClick={(id) => actionFn(itemId, action)}>
            {title}
        </button>
    )
}
