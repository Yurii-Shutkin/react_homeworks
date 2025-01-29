import './List.css';
import Button from '../../Button/Button'

export default function List({
    title,
    buttonTitle,
    action,
    actionFn,
    todos,
    secondButtonTitle,
    secondAction }) {

    return (
        <div className='list_wrapper'>
            <h1 className='list_title'>{title}: {todos.length}</h1>
            <ul className='list'>
                {todos.map(item =>
                    <li className={'list_item'} key={item.id}>{item.title}
                        <div className='list_buttons'>
                            <Button

                                title={buttonTitle}
                                actionFn={() => actionFn(item.id, action)}
                            />
                            {
                                secondButtonTitle ?
                                    <Button
                                        title={secondButtonTitle}
                                        actionFn={() => actionFn(item.id, secondAction)}
                                    /> :
                                    null
                            }
                        </div>
                    </li>)}
            </ul>
        </div>

    )
}
