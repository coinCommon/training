import React from 'react';

const Book = () => {


    // --------------------------------------------------------------------
    // Рекурсия - вызов функции в самой же функции
    const countDown = (value, fn) => {
        fn(value)
        return value > 0 ? setTimeout(() => countDown(value - 1, fn), 1000) : value
    }
    // countDown(10, value => console.log(value))

    const dan = {
        type: 'person',
        data : {
            gender : 'male',
            info: {
                id: 22,
                fullName: {
                    first: 'Dan',
                    last: 'Deacon'
                }
            }
        }
    }

    const deepPick = (fields, object = {}) => {
        const [first, ...remaining] = fields.split('.')
        return remaining.length
            ? deepPick(remaining.join('.'), object[first])
            : object[first]
    }
    console.log(deepPick('type', dan))
    console.log(deepPick('data.info.fullName.first', dan))
    console.log(deepPick('data.info.fullName.first', dan))

    // --------------------------------------------------------------------


    return (
        <div>
            Book
        </div>
    );
};

export default Book;