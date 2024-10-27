import React, { useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Header from "./components/Header";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

const App = () => {
  const [searchBar, setSearchBar] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayResult, setDisplayResult] = useState(true); // Check to false for default

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
    <Container maxWidth>
      <Header />
      <main>
        <Stack direction="row" spacing={2} className="searchBar">
          <TextField
            type="search"
            id="search"
            name="search"
            label="Search sponsor..."
            value={searchBar}
            onChange={setInput}
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiInputBase-input": {
                color: "white", // Text color
              },
              "& .MuiInputLabel-root": {
                color: "white", // Label color
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // Border color for outlined variant
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={searchSponsors}
            disabled={!searchBar}
            sx={{ backgroundColor: "#228B56" }}
          >
            Search
          </Button>
        </Stack>

        <Stack className="advancedSearch text-bold">
          <Button
            component="label"
            variant="text"
            endIcon={
              isExpanded ? (
                <ArrowUpwardOutlinedIcon />
              ) : (
                <ArrowDownwardOutlinedIcon />
              )
            }
            onClick={toggleAdvancedSearch}
          >
            Advanced Search
          </Button>

          {isExpanded && (
            <Stack direction="column" spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="number" sx={{ color: 'white' }}>Number of attendees</InputLabel>
                <Select
                  labelId="number"
                  id="number"
                  label="Number of attendees"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', 
                        color: 'white', // Set text color to white
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', 
                        color: 'white', // Set text color to white
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', 
                        color: 'white', // Set text color to white
                    },
                }}
                  //   onChange={}
                >
                  <MenuItem>Put your JSON here</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="format" sx={{ color: 'white' }}>In-person/online</InputLabel>
                <Select labelId="format" id="format" label="Format"  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', 
                        color: 'white', // Set text color to white
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', 
                        color: 'white', // Set text color to white
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', 
                        color: 'white', // Set text color to white
                    },
                }}>
                  <MenuItem>Put your JSON here</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="location" sx={{ color: 'white' }}>Location</InputLabel>
                <Select labelId="location" id="location" label="Location"  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', 
                        color: 'white', // Set text color to white
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', 
                        color: 'white', // Set text color to white
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', 
                        color: 'white', // Set text color to white
                    },
                }}>
                  <MenuItem>Put your JSON here</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          )}
        </Stack>

        {displayResult && (
          <>
            <Stack direction="column" spacing={2}>
              <Typography className="resultsHeader text-bold">
                Results
              </Typography>
              <Box className="cardGroup">
                <Card className="resultCard">
                  <CardMedia image={<ArrowDownwardOutlinedIcon />} />
                  <CardContent>
                    <Typography>Sponsor Name 1</Typography>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#228B56" }}
                    >
                      More info
                    </Button>
                  </CardContent>
                </Card>

                <Card className="resultCard">
                  <CardMedia image={<ArrowDownwardOutlinedIcon />} />
                  <CardContent>
                    <Typography>Sponsor Name 2</Typography>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#228B56" }}
                    >
                      More info
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Stack>
          </>
        )}
      </main>
    </Container>
  );
};

export default App;