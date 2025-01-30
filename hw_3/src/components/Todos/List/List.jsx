import './List.css';
import Button from '../../Button/Button'
import ListItem from './ListItem/ListItem';

export default function List({
    title,
    todos,
    buttons,
}) {

    return (
        <div className='list_wrapper'>
            <h1 className='list_title'>{title}: {todos.length}</h1>
            <ul className='list'>
                {todos.length ? todos.map(item =>
                    <ListItem
                        key={item.id}
                        item={item}
                        buttons={buttons}
                    />
                ) : null}
            </ul>
        </div>

    )
}
