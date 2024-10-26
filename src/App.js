import React from 'react';
import './App.css';
import { Button } from '@mui/material'; 
import TextField from '@mui/material/TextField';
import Header from './components/Header'; 

const App = () => {
    const [searchBar, setSearchBar] = React.useState("");
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [displayResult, setDisplayResult] = React.useState(true); // Check to false for default

    const toggleAdvancedSearch = () => {
        setIsExpanded(!isExpanded);
    };

    const setInput = (e) => {
        setSearchBar(e.target.value);
    };

    const searchSponsors = () => {
        // Implement your API calls here
        console.log("Searching for sponsors:", searchBar);
    };

    return (
        <div className="App">
            <Header />
            <main>
                <div className="searchBar">
                    <TextField
                        type="search"
                        id="search"
                        name="search"
                        label="Search sponsor..."
                        value={searchBar}
                        onChange={setInput}
                        variant="outlined"
                        sx={{
                          '& .MuiInputBase-input': {
                              color: 'white', // Text color
                          },
                          '& .MuiInputLabel-root': {
                              color: 'white', // Label color
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Border color for outlined variant
                        },
                        }}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={searchSponsors} 
                        disabled={!searchBar}
                        sx={{ backgroundColor: '#228B56'}}
                    >
                        Search
                    </Button>
                </div>

                <div className="advancedSearch">
                    <div>
                        Advanced Search
                        <Button onClick={toggleAdvancedSearch} className="arrowButton">
                            {isExpanded ? '▲' : '▼'}
                        </Button>
                    </div>
                    {isExpanded && (
                        <>
                            <div className="optionGroup">
                                <label htmlFor="number">Number of attendees</label>
                                <select name="number" id="number">
                                    {/* Add options here */}
                                </select>
                            </div>

                            <div className="optionGroup">
                                <label htmlFor="format">In-person/online</label>
                                <select name="format" id="format">
                                    {/* Add options here */}
                                </select>
                            </div>

                            <div className="optionGroup">
                                <label htmlFor="location">Location</label>
                                <select name="location" id="location">
                                    {/* Add options here */}
                                </select>
                            </div>
                        </>
                    )}
                </div>

                {displayResult && (
                    <>
                        <div className="result">
                            <div className='resultsHeader'>Results</div>
                            <div className="cardGroup">
                                {/* Example result cards */}
                                <div className="resultCard">
                                    <div>Sponsor Name 1</div>
                                    <Button variant="contained" sx={{ backgroundColor: '#228B56'}}>More info</Button>
                                </div>
                                <div className="resultCard">
                                    <div>Sponsor Name 2</div>
                                    <Button variant="contained" sx={{ backgroundColor: '#228B56'}}>More info</Button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default App;