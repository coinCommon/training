import React, {useMemo, useState} from 'react';
import classes from "../css/index.module.scss";
import Button from "../UI/button";
import Input from "../UI/input";
import Select from "../UI/select";
import Textarea from "../UI/textarea";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {values} from "mobx";

const Task = () => {
    const TargetFocus = (id) => {
        document.getElementById(id).style = 'top: -10px; font-size: 10px; color: orangered;'
    }
    const TargetBlur = (id, value) => {
        let styleLabel = document.getElementById(id)
        if (value !== '') {return false}
        else {styleLabel.style = 'top: 7px; font-size: 14px; color: #999999;'}
    }

    const [data, setData] = useState([{task: '', description: '', address: '', date: '', number: ''}])
    const [task, setTask] = useState([])

    const changeDate = (value, key) => {
        setData(data.map(m => m.task !== false ? {...m, [key] : value, ['date'] : new Date().toString().split('GMT')[0], ['number'] : new Date().getTime()} : m))
    }
    const addTask = () => {
        if (data[0].task === '' || data[0].description === '' || data[0].address === '') {

        } else {
            setTask([...task, data[0]])
            setData([{task: '', description: '', address: '', date: '', number: ''}])
        }
    }
    const deleteTask = (number) => {
        setTask(task.filter(d => d.number !== number))
    }

    // Поиск по имени
    const [filtersName, setFiltersName] = useState('')
    const [sortedName, setSortedName] = useState('task')

    const filteredDeviceName = useMemo( () => {
        if (sortedName === 'task') {
            return task.filter(task => task.task.toLowerCase().includes(filtersName.toLowerCase()))
        }
        if (sortedName === 'description') {
            return task.filter(task => task.description.toLowerCase().includes(filtersName.toLowerCase()))
        }
        if (sortedName === 'address') {
            return task.filter(task => task.address.toLowerCase().includes(filtersName.toLowerCase()))
        }
        if (sortedName === 'date') {
            return task.filter(task => task.date.toLowerCase().includes(filtersName.toLowerCase()))
        }
    }, [filtersName, task])
    // Поиск по имени


    return (
        <section className={classes.task}>

            <div className={classes.description_task}>
                <div className={classes.container}>
                    <h1>
                        Welcome!
                    </h1>
                    <h3>
                        On this page, you can add, edit and delete a task, as well as find it in the search.
                    </h3>
                </div>
            </div>

            <div className={classes.property_task}>
                <div className={classes.container}>

                    <div className={classes.property_grid}>
                        <div className={classes.property_child}>
                            <p>
                                Add a task
                            </p>
                            <div className={classes.property_child_parent_input}>
                                <Input
                                    value={data[0].task}
                                    onChange={(e) => changeDate(e.target.value, 'task')}
                                    onFocus={() => TargetFocus('label1')}
                                    onBlur={(e) => TargetBlur('label1', e.target.value)}
                                />
                                <label id={'label1'}>Task</label>
                            </div>
                            <div className={classes.property_child_parent_input}>
                                <Textarea
                                    value={data[0].description}
                                    onChange={(e) => changeDate(e.target.value, 'description')}
                                    onFocus={() => TargetFocus('label2')}
                                    onBlur={(e) => TargetBlur('label2', e.target.value)}
                                />
                                <label id={'label2'}>Description</label>
                            </div>

                            <div className={classes.property_child_parent_input}>
                                <Select
                                    value={data[0].address}
                                    onChange={(e) => changeDate(e.target.value, 'address')}
                                    options={[
                                        {name: 'Ксения', value: 'Ксения'},
                                        {name: 'Василиса', value: 'Василиса'},
                                        {name: 'Марина', value: 'Марина'},
                                        {name: 'Алена', value: 'Алена'}
                                    ]
                                }
                                />
                            </div>

                            <div>
                                <Button
                                    onClick={addTask}
                                    text={'ADD A TASK'}
                                    float={'right'}
                                />
                            </div>
                        </div>
                        <div className={classes.property_child}>
                            <p>
                                Task search
                            </p>
                            <div className={classes.property_child_parent_input}>
                                <Input
                                    value={filtersName}
                                    onChange={(e) => setFiltersName(e.target.value)}
                                    onFocus={() => TargetFocus('label3')}
                                    onBlur={(e) => TargetBlur('label3', e.target.value)}
                                />
                                <label id={'label3'}>Поиск</label>
                            </div>
                            <div className={classes.property_child_parent_input}>
                                {/*<div>Поиск по</div>*/}
                                <Select
                                    value={sortedName}
                                    onChange={(e) => setSortedName(e.target.value)}
                                    options={[
                                        {name: 'Поиск по теме', value: 'task'},
                                        {name: 'Поиск по описанию', value: 'description'},
                                        {name: 'Поиск по адресату', value: 'address'},
                                        {name: 'Поиск по дате', value: 'date'}
                                    ]
                                }
                                />
                            </div>
                        </div>
                    </div>


                    <div style={{margin: '20px 0'}}>
                    {task.length ? filteredDeviceName.map((m, index) =>
                        <div key={m.number} className={classes.property_content_box}>
                            <div className={classes.property_content}>
                                <div className={classes.property_content__flex}>
                                    <p>
                                        {m.date}
                                    </p>
                                    <div className={classes.property_content_adr}>
                                        {m.address}
                                    </div>
                                </div>

                                <div className={classes.property_content__grid}>
                                    <div className={classes.property_content_task}>
                                        {index+1 + '. ' + m.task}
                                    </div>
                                    <div className={classes.property_content_description}>
                                        {m.description}
                                    </div>
                                </div>
                                <div onClick={() => deleteTask(m.number)} className={classes.task_delete}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>
                            </div>
                        </div>
                    ) :
                    ''}
                    </div>



                </div>
            </div>

            <div className={classes.container}>
            </div>
        </section>
    );
};

export default Task;