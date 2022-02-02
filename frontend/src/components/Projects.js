import React from 'react'


const ProjectItem = ({ project }) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.repo_link}
            </td>
            <td>
                {project.users.join('; ')}
            </td>
        </tr>
    )
}


const ProjectList = ({ projects }) => {
    return (
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
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}


export default ProjectList 