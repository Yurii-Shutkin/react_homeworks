import React, { useRef } from 'react'
import './Form.css'

import SubmitButton from './SubmitButton/SubmitButton'

export default function Form({ actionObj, addHandler }) {
    const refs = {
        input: useRef(),
        select: useRef()
    }

    return (
        <form className='form'>
            <span className='form_title'>Create task</span>
            <label className='form_block'>
                Title:
                <input className={'form_input'} type='text' ref={refs.input} placeholder='Add new todo...'></input>
            </label>
            <label className='form_block'>
                Status:
                <select className={'form_input'} ref={refs.select} name='status'>
                    <option value={actionObj.TODO.value}>{actionObj.TODO.title}</option>
                    <option value={actionObj.IN_PROGRESS.value}>{actionObj.IN_PROGRESS.title}</option>
                    <option value={actionObj.DONE.value}>{actionObj.DONE.title}</option>
                </select>
            </label>
            <SubmitButton
                type={'submit'}
                title={'Create task'}
                actionFn={(e) => addHandler(e, refs)}
            />
        </form>
    )
}
