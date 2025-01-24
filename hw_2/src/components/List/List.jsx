import React, { useEffect, useState } from 'react';
import animals from '../../data/animals';
import './style.css';


export default function Table() {
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(animals);
        const interval = setInterval(() => {
            setList((prevList) => {
                const inactiveItems = prevList.filter((item) => !item.active);
                if (inactiveItems.length === 0) {
                    clearInterval(interval);
                    return prevList;
                }

                const randomIndex = Math.floor(Math.random() * inactiveItems.length);
                const itemToActivate = inactiveItems[randomIndex];

                return prevList.map((item) =>
                    item.type === itemToActivate.type ? { ...item, active: true } : item
                );
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    return (
        <table className='table'>
            <tbody className='table__body'>
                {list.map((item, index) => {
                    return (
                        <tr key={index} className='table__row'>
                            <td className={item.active ? 'table__cell active' : 'table__cell'}>{item.type}</td>
                            <td className='table__cell'>{item.icon}</td>
                        </tr>
                    )
                })}
                {console.log(list)}
            </tbody>
        </table>
    )
}
