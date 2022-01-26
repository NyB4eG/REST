import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import './style.css'
import UserList from './components/Users.js'
import ProjectList from './components/Projects.js'
import TODOList from './components/TODOs.js'
import MenuList from './components/Menu.js'
import FooterContent from './components/Footer.js'
import { BrowserRouter, Route, Link, Routes, Navigate } from 'react-router-dom'


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница не найдена</h1>
        </div>
    )
}


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'menuItems': [],
            'footerContent': {},
        }
    }

    componentDidMount() {

        // const users = [
        //     {
        //         'first_name': 'Фёдор',
        //         'last_name': 'Достоевский',
        //         'birthday_year': 1821
        //     },
        //     {
        //         'first_name': 'Александр',
        //         'last_name': 'Грин',
        //         'birthday_year': 1880
        //     },
        // ]

        const menuItems = [
            {
                'title': 'Пользователи',
                'link': '/'
            },
            {
                'title': 'Проекты',
                'link': '/projects'
            },
            {
                'title': 'ToDo',
                'link': '/TODO'
            },
        ]

        const footerContent =
        {
            'owner': 'NyB4eG@gmail.com',
            'year': (new Date()).getFullYear()
        }


        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users,
                        'menuItems': menuItems,
                        'footerContent': footerContent,
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects,
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/TODO/')
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos,
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div class="wrapper">
                <div class="top">
                    <div class="main_blocks_container">
                        <BrowserRouter>
                            <div class="left_block">
                                <div class="menu">
                                    <MenuList menuItems={this.state.menuItems} />

                                </div>
                            </div>
                            <div class="right_block">
                                <div class="content">

                                    <Routes>
                                        <Route exact path='/' element={<UserList users={this.state.users} />} />
                                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                                        <Route exact path='/TODO' element={<TODOList todos={this.state.todos} />} />
                                        <Route path="/users" element={<Navigate replace to="/" />} />
                                        <Route path='*' element={<NotFound404 />} />
                                    </Routes>

                                </div>
                            </div>
                        </BrowserRouter>
                    </div>
                </div>

                <div class="footer">
                    <FooterContent footerContent={this.state.footerContent} />
                </div>
            </div>
        )
    }
}

export default App;