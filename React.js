import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'numbers', label: 'Numbers' },
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'highest_alphabet', label: 'Highest Alphabet' }
    ];

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(input);
            const res = await axios.post('https://your-backend-url/bfhl', parsedInput);
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input');
        }
    };

    const filteredResponse = () => {
        if (!response) return null;

        const result = {};
        selectedOptions.forEach(option => {
            if (option.value === 'numbers') result.numbers = response.numbers;
            if (option.value === 'alphabets') result.alphabets = response.alphabets;
            if (option.value === 'highest_alphabet') result.highest_alphabet = response.highest_alphabet;
        });

        return result;
    };

    return (
        <div>
            <h1>ABCD123</h1> {/* Replace with your roll number */}
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter JSON input"
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {response && (
                <div>
                    <Select
                        isMulti
                        options={options}
                        onChange={setSelectedOptions}
                    />
                    <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
