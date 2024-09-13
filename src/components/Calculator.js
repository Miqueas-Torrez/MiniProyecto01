import React, { useState } from 'react';
import axios from 'axios';


const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    const calculate = async (operation) => {
        const [a, b] = input.split(',').map(Number);

        if (isNaN(a) || isNaN(b)) {
            alert('Por favor, ingresa números válidos separados por una coma.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/calculator/${operation}`, {
                params: { a, b }
            });
            setResult(response.data);
            setHistory([...history, { input, operation, result: response.data }]);
        } catch (error) {
            console.error('Error durante el cálculo:', error);
        }
    };

    // Función para obtener el nombre de la operación en español
    const getOperationName = (operation) => {
        switch (operation) {
            case 'add':
                return 'Suma';
            case 'subtract':
                return 'Resta';
            case 'multiply':
                return 'Multiplicación';
            case 'divide':
                return 'División';
            default:
                return 'Operación desconocida';
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Ingreso de valores: 1,1"
            />
            <button onClick={() => calculate('add')}>Sumar</button>
            <button onClick={() => calculate('subtract')}>Restar</button>
            <button onClick={() => calculate('multiply')}>Multiplicar</button>
            <button onClick={() => calculate('divide')}>Dividir</button>
            <div>Resultado: {result !== null ? result : 'No se ha realizado ninguna operacion'}</div>
            <div>
                <h2>Historial</h2>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>
                            {item.input} {getOperationName(item.operation)} = {item.result}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Calculator;