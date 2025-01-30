import React from 'react'
import Button from '../../../Button/Button'
Button

export default function ListItem({ item, buttons }) {
    return (
        <li className={'list_item'}>
            {item.title}
            <div className='list_buttons'>
                {buttons ? buttons.map((btn, ind) => {
                    return (
                        <Button
                            key={ind}
                            itemId={item.id}
                            type={btn.type}
                            title={btn.title}
                            actionFn={btn.handler}
                            action={btn.action}
                        />
                    )
                }) : null}
            </div>
        </li>
    )
}
