import React from 'react'
import { Link } from 'react-router-dom'

const UserItem = ({ user }) => {
    return (
        <p>
            {user}
        </p>
    )
}


const ProjectItem = ({ project, deleteProject }) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.repo_link}
            </td>
            <td>
                {project.users.map((user) => <UserItem user={user} />)}
                
            </td>
            <td><button onClick={() => deleteProject(project.uuid)} type='button'>Delete</button></td>
        </tr>
    )
}


const ProjectList = ({ projects, deleteProject }) => {
    return (
        <div>
        <table>
            <th>
                Name
            </th>
            <th>
                Link to repository
            </th>
            <th>
                Users
            </th>
            <th></th>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
        </table>
        <Link to='/projects/create'>Create</Link>
    </div>
    )
}


export default ProjectList 