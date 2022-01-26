import React from 'react'


const TODOItem = ({ todo }) => {
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
                {todo.is_active}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.created_by}
            </td>
        </tr>
    )
}


const TODOList = ({ todos }) => {
    return (
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
            {todos.map((todo) => <TODOItem todo={todo} />)}
        </table>
    )
}


export default TODOList 