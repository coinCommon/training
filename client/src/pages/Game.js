import React, {useEffect, useState} from 'react';
import classes from "../css/index.module.scss";
import Checkers from "../UI/Checkers";
import ArrangeTheCheckers from "../hocks/arrange";
import Swing from "../hocks/swing";


const Game = () => {

    // Проинициализировали объект клеток
    const [arrayObject, setArrayObject] = useState(ArrangeTheCheckers)

    // Состояние chess определяет ход черных или белых
    const [toChange, setToChange] = useState('chessBlack')

    // Выбранная клетка
    const [changeChoice, setChangeChoice] = useState({})

    // Информация о выбранной шашке
    const [aboutChess, setAboutChess] = useState({color: '', cornerChecker: false, allowedMotion : false, lord: false, value: 0})
    // console.log(aboutChess)




    // Функция проверки доски
    const checkAttack = (selectedChess) => {
        let bool = false
        let bool2 = false
        if (toChange === 'chessBlack') {
            // console.log(bool && bool2)
            arrayObject.map(object => object.id === selectedChess.id - 7 || object.id === selectedChess.id - 9 ? object.chess !== null && object.chess !== toChange : '').filter(f => f ? bool = true : '')
            arrayObject.map(object => object.id === selectedChess.id - 14 || object.id === selectedChess.id - 18 ? object.number === 0 : '').filter(f => f ? bool2 = true : '')
            if (bool && bool2) {
                return true
            }
        }
        else {
            // console.log(bool && bool2)
            arrayObject.map(object => object.id === selectedChess.id + 7 || object.id === selectedChess.id + 9 ? object.chess !== null && object.chess !== toChange : '').filter(f => f ? bool = true : '')
            arrayObject.map(object => object.id === selectedChess.id + 14 || object.id === selectedChess.id + 18 ? object.number === 0 : '').filter(f => f ? bool2 = true : '')
            if (bool && bool2) {
                return true
            }
        }
    }

    // Отмена выбора шашки
    const cancelSelection = () => {
        setArrayObject(arrayObject.map(obj => obj.active === true ? {...obj, ['active'] : false, ['color'] : '#116543'} : obj))
    }

    // Функция выбора шашки
    const CheckChess = (e, features) => {

        // Определяем, можно ли выбрать шашку
        let youCanWalk = false
        // Определяем, можно ли атаковать
        let youCanAttack = false

        if (features.state === "theEdgeLeft" && features.chess === toChange) {
            if (features.chess === "chessWhite") {
                arrayObject.map(obj => obj.id === features.id+9 ? obj.number === 0 || obj.chess !== toChange : '').filter(f => f ? youCanWalk = true : '')
                arrayObject.map(obj => obj.id === features.id+18 ? obj.number === 0 : '').filter(f => f ? youCanAttack = true : '')
            }
            else {
                arrayObject.map(obj => obj.id === features.id-7 ? obj.number === 0 || obj.chess !== toChange : '').filter(f => f ? youCanWalk = true : '')
                arrayObject.map(obj => obj.id === features.id-14 ? obj.number === 0 : '').filter(f => f ? youCanAttack = true : '')
            }
        }

        if (features.state === "theEdge" && features.chess === toChange) {
            if (features.chess === "chessWhite") {
                arrayObject.map(obj => obj.id === features.id+7 ? obj.number === 0 || obj.chess !== toChange : '').filter(f => f ? youCanWalk = true : '')
                arrayObject.map(obj => obj.id === features.id+14 ? obj.number === 0 : '').filter(f => f ? youCanAttack = true : '')
            }
            else {
                arrayObject.map(obj => obj.id === features.id-9 ? obj.number === 0 || obj.chess !== toChange : '').filter(f => f ? youCanWalk = true : '')
                arrayObject.map(obj => obj.id === features.id-18 ? obj.number === 0 : '').filter(f => f ? youCanAttack = true : '')
            }
        }

        if (features.state === "chess" && features.chess === toChange) {
            if (features.chess === "chessWhite") {
                arrayObject.map(obj => obj.id === features.id+7 || obj.id === features.id+9 ? obj.number === 0 || obj.chess !== toChange : '').filter(f => f ? youCanWalk = true : '')
                arrayObject.map(obj => obj.id === features.id+14 || obj.id === features.id+18 ? obj.number === 0 : '').filter(f => f ? youCanAttack = true : '')
            }
            else {
                arrayObject.map(obj => obj.id === features.id-7 || obj.id === features.id-9 ? obj.number === 0 || obj.chess !== toChange : '').filter(f => f ? youCanWalk = true : '')
                arrayObject.map(obj => obj.id === features.id-14 || obj.id === features.id-18 ? obj.number === 0 : '').filter(f => f ? youCanAttack = true : '')
            }
        }


        // Если в объекте уже есть выбранный эллемент 'active: true', фиксируем
        let active = false
        arrayObject.map(m => m.active === true).filter(f => f === true ? active = true : '')


        if (youCanWalk && features.color !== '#fbf2e0' && !features.active && !active) {
            console.log('1 Выбор шашки')
            setChangeChoice(features)
            setArrayObject(
                arrayObject.map(obj => obj.number === 0 && obj.color === '#116543' ? {...obj, ['color'] : '#199764'} : obj
                    && obj.id === features.id ? {...obj, ['active'] : true, ['color'] : '#35de5c'} : obj)
            )
            return false
        }

        if (features.number !== 0 && features.color !== '#fbf2e0' && !features.active && active) {
            console.log('2 Отмена выбора при клике на другую шашку')
            cancelSelection()
            return false
        } if (features.youCanWalk && features.color !== '#fbf2e0' && features.active) {
            console.log('3 Отмена выбора шашки при клике на нее же')
            cancelSelection()
            return false
        }




        // Ход шашкой
        if (features.chess === null && features.color !== '#fbf2e0' && active) {
            console.log('4 Ход сделан')

            // Атака шашкой --------------------------------
            if (checkAttack(features)) {
                console.log('ATTACK - нужно атаковать')
            }
            else {
                Swing(toChange, setToChange)
                setArrayObject(arrayObject.map(c => {
                    if (c.id === features.id && features.chess === null) {
                        return {...c, number: changeChoice.number, chess: changeChoice.chess, active: false, color: changeChoice.color}
                    }
                    if (c.id === changeChoice.id && features.chess === null) {
                        return {...c, number: features.number, chess: features.chess, active: false, color: features.color}
                    }
                    return c
                }))
            }


            // // Атака шашкой --------------------------------
            // if (checkAttack(features)) {
            //     console.log('ATTACK - нужно атаковать')
            // }

        }




        if (!features.chess && features.color !== '#fbf2e0' && !active) {
            console.log('5 Не выбрана шашка')
            return false
        }
    }


    const SortChess = (a, b) => {
        if (a.id > b.id) {
            return 1
        } else {
            return -1
        }
    }



    // if (features.chess === toChange) {
    //     // Левый или правый край
    //     if (features.state !== 'chess') {
    //         if (features.state === 'theEdgeLeft') {
    //
    //             arrayObject.map(obj =>
    //                 obj.id === parseInt(toChange === 'chessBlack' ? features.id-7 : features.id+9) &&
    //                 obj.id === parseInt(toChange === 'chessBlack' ? features.id-14 : features.id+18)
    //                     ? obj.number === 0 || obj.chess !== toChange : '').filter(f => f ? youCanWalk = true : '')
    //
    //         }
    //         else {
    //             arrayObject.map(obj =>
    //                 obj.id === parseInt(toChange === 'chessBlack' ? features.id-9 : features.id+7) &&
    //                 obj.id === parseInt(toChange === 'chessBlack' ? features.id-18 : features.id+14)
    //                     ? obj.number === 0 || obj.chess !== toChange : '').filter(f => f ? youCanWalk = true : '')
    //         }
    //     }
    //     else {
    //         arrayObject.map(obj => obj.id === parseInt(toChange === 'chessBlack' ? features.id-7 : features.id+7) || obj.id === (toChange === 'chessBlack' ? features.id-9 : features.id+9) ? obj.number === 0 || obj.chess !== toChange : '').filter(f => f ? youCanWalk = true : '')
    //     }
    // }



    return (
        <section className={classes.game}>
            <div className={classes.container}>
                <div style={{width: '100px', height: '20px', background: toChange === 'chessWhite' ? '#f1f1f1' : '#333', color: toChange === 'chessWhite' ? '#333' : '#f1f1f1'}}> {toChange === 'chessWhite' ? 'Ход белых' : 'Ход черных' }
                </div>

                <div className={classes.chess_border}>

                    <div className={classes.grid}>
                        {arrayObject.sort(SortChess).map((m, Index) =>
                            <div
                                onClick={(e) => CheckChess(e, m)}
                                style={{background: m.color}}
                                key={m.id}
                                className={classes.game_child}
                            >
                                <div style={{display: 'grid'}}>
                                    <div style={{fontSize: '10px',
                                        background: '#444',
                                        zIndex: 999,
                                        color: '#fff'
                                    }}>{m.color !== '#fbf2e0' && m.number !== 0 ? 'ID ' + m.id : ''}</div>
                                    {/*<div style={{fontSize: '10px',*/}
                                    {/*    background: '#444',*/}
                                    {/*    zIndex: 999,*/}
                                    {/*    color: '#fff'*/}
                                    {/*}}>{m.color !== '#fbf2e0' && m.number !== 0 ? 'NUM ' + m.number : ''}</div>*/}
                                    {/*<div style={{fontSize: '10px',*/}
                                    {/*    background: '#444',*/}
                                    {/*    zIndex: 999,*/}
                                    {/*    color: '#fff'*/}
                                    {/*}}>{m.color !== '#fbf2e0' && m.number !== 0 ? m.chess : ''}</div>*/}
                                </div>

                                {m.chess === 'chessWhite' ?
                                    <Checkers background={'#f2d6a0'} borderColor={'#9a6d15'}/>
                                :
                                    ''
                                }
                                {m.chess === 'chessBlack' ?
                                    <Checkers background={'#48330a'} borderColor={'#f2d6a0'}/>
                                    :
                                    ''
                                }
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Game;