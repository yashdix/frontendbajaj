import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Parse the input to ensure it's a valid JSON
      const jsonInput = JSON.parse(input);

      // Ensure the input is in the expected format
      if (!jsonInput.data || !Array.isArray(jsonInput.data)) {
        throw new Error("Invalid format. Expecting {\"data\": [\"1\", \"3\", \"A\", \"b\", \"5\", \"C\"]}");
      }

      // Send POST request to server
      const res = await axios.post('https://backendbajaj-production.up.railway.app/bfhl', jsonInput);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON input or server error');
      setResponse(null);
    }
  };

  // Handle option change (multi-select)
  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  };

  // Render response based on selected options
  const renderResponse = () => {
    if (!response) return null;

    let output = {};
    if (selectedOptions.includes('Numbers')) {
      output.numbers = response.numbers;
    }
    if (selectedOptions.includes('Alphabets')) {
      output.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Even Numbers')) {
      output.evenNumbers = response.numbers.filter(n => n % 2 === 0);
    }
    if (selectedOptions.includes('Odd Numbers')) {
      output.oddNumbers = response.numbers.filter(n => n % 2 !== 0);
    }
    if (selectedOptions.includes('Highest Lowercase Alphabet')) {
      output.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return <pre>{JSON.stringify(output, null, 2)}</pre>;
  };

  return (
    <div>
      <h1>BFHL API Frontend</h1>

      {/* API Input Paragraph Heading */}
      <p
        style={{
          fontSize: '20px',     // Adjust the font size for emphasis
          fontWeight: 'bold',   // Make it bold to look like a heading
          marginTop: '20px',    // Space between the main heading and this paragraph
          marginBottom: '10px'  // Space between the paragraph and textarea
        }}
      >
        API Input
      </p>

      <form onSubmit={handleSubmit}>
        {/* Single-line textarea with rounded corners */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"data": ["1", "3", "A", "b", "5", "C"]}'  // Example input format
          rows="1"  // Limits the number of rows to 1, making it a single line
          style={{
            width: '100%',   // Full-width
            height: '30px',  // Adjusted height to one line
            padding: '10px', // Add padding for better appearance
            borderRadius: '10px', // Rounded corners
            border: '1px solid #ccc', // Border style
            outline: 'none', // Remove default outline
          }}
        />

        <div>
          {/* Submit button with rounded corners */}
          <button
            type="submit"
            style={{
              width: '100%',    // Full-width button
              backgroundColor: 'blue',  // Blue background
              color: 'white',   // White text
              padding: '10px',  // Padding for better appearance
              marginTop: '10px', // Add some margin above the button
              borderRadius: '10px', // Rounded corners
              border: 'none', // Remove border
              cursor: 'pointer',
              fontSize: '16px'  // Adjust font size
            }}
          >
            Submit
          </button>
        </div>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <>
          <h2>Multi Filters</h2>

          {/* Multi Filters Column styled like API Input */}
          <div
            style={{
              width: '100%',    // Full-width
              padding: '10px',  // Padding for better appearance
              marginTop: '10px', // Margin above
              borderRadius: '10px', // Rounded corners
              border: '1px solid #ccc', // Border style
            }}
          >
            <label style={{ display: 'block', marginBottom: '5px' }}>
              <input
                type="checkbox"
                value="Numbers"
                onChange={handleOptionChange}
                style={{ marginRight: '10px' }} // Space between checkbox and label
              />
              Numbers
            </label>

            <label style={{ display: 'block', marginBottom: '5px' }}>
              <input
                type="checkbox"
                value="Alphabets"
                onChange={handleOptionChange}
                style={{ marginRight: '10px' }} 
              />
              Alphabets
            </label>

            <label style={{ display: 'block', marginBottom: '5px' }}>
              <input
                type="checkbox"
                value="Even Numbers"
                onChange={handleOptionChange}
                style={{ marginRight: '10px' }} 
              />
              Even Numbers
            </label>

            <label style={{ display: 'block', marginBottom: '5px' }}>
              <input
                type="checkbox"
                value="Odd Numbers"
                onChange={handleOptionChange}
                style={{ marginRight: '10px' }} 
              />
              Odd Numbers
            </label>

            <label style={{ display: 'block', marginBottom: '5px' }}>
              <input
                type="checkbox"
                value="Highest Lowercase Alphabet"
                onChange={handleOptionChange}
                style={{ marginRight: '10px' }} 
              />
              Highest Lowercase Alphabet
            </label>
          </div>

          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
