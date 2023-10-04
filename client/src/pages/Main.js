import React, {useState} from 'react';
import classes from "../css/index.module.scss";

const Main = () => {

    const [message, setMessage] = useState('')
    const [child, setChild] = useState([
        {id: '1', number: '1', color: '#da7625', text: 'Привет!'},
        {id: '2', number: '2', color: '#d52aa0', text: 'Меня'},
        {id: '3', number: '3', color: '#26d6d9', text: 'зовут'},
        {id: '4', number: '4', color: '#8015ea', text: 'Василий,'},
        {id: '5', number: '5', color: '#7fea15', text: 'и я реальный'},
        {id: '6', number: '6', color: '#d2b82d', text: 'кекс'},
        {id: '7', number: '', color: '', text: ''}
    ])

    const [currentCard, setCurrentCard] = useState(null)



    const DragStartHandler = (e, card) => {
        setCurrentCard(card)
        setMessage(JSON.stringify(card))

    }
    const DragEndHandler = (e) => {
        e.preventDefault()
        e.target.style.background = '#FFF'
    }
    const DragOverHandler = (e) => {
        e.preventDefault()
        e.target.style.background = '#444'
    }
    const DropHandler = (e, card) => {
        e.preventDefault()
        setChild(child.map(c => {
            if (c.id === card.id) {
                return {...c, number: currentCard.number, color: currentCard.color, text: currentCard.text}
            }
            if (c.id === currentCard.id) {
                return {...c, number: card.number, color: card.color, text: card.text}
            }
            return c
        }))
        e.target.style.background = '#FFF'

    }

    const SortCards = (a, b) => {
        if (a.id > b.id) {
            return 1
        } else {
            return -1
        }
    }


    return (
        <section className={classes.main}>
            <div className={classes.container}>
                <h1>MAIN</h1>

                <div className={classes.grid}>

                    {child.sort(SortCards).map(m =>
                        <div
                            // style={{background: m.color}}
                            key={m.number}
                            className={classes.child}
                            draggable

                            onDragStart={(e) => DragStartHandler(e, m)}
                            onDragLeave={(e) => DragEndHandler(e)}
                            onDragOver={(e) =>DragOverHandler(e)} // Когда перетаскиваем объект на другой объект
                            onDragEnd={(e) => DragEndHandler(e)} // Когда отпускаем перетаскиваемый объект
                            onDrop={(e) => DropHandler(e, m)}
                        >
                            {m.number}
                            <br/>
                            {m.text}
                        </div>
                    )}

                </div>



                <div className={classes.consoleLog}>
                    <p>
                        {message}
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Main;