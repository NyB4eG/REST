import React from 'react'
import { Link } from 'react-router-dom'


const TODOItem = ({ todo, deleteTODO }) => {
    console.log(todo)
    return (
        <tr>
            <td>
                {todo.task_text}
            </td>
            <td>
                {todo.date_created}
            </td>
            <td>
                {todo.date_updated}
            </td>
            <td>
                {todo.is_active ? 'Active' : 'Inactive'}
            </td>
            <td>
                {todo.project.name}
            </td>
            <td>
                {todo.created_by}
            </td>
            <td><button onClick={() => deleteTODO(todo.uuid)} type='button'>Delete</button></td>
        </tr>
    )
}


const TODOList = ({ todos, deleteTODO }) => {
    return (
        <div>
            <table>
                <th>
                    Task text
                </th>
                <th>
                    Created
                </th>
                <th>
                    Updated
                </th>
                <th>
                    Active
                </th>
                <th>
                    Project
                </th>
                <th>
                    Creator
                </th>
                <th></th>
                {todos.map((todo) => <TODOItem todo={todo} deleteTODO={deleteTODO} />)}
            </table>
            <Link to='/TODO/create'>Create</Link>
        </div>
    )
}


export default TODOList 