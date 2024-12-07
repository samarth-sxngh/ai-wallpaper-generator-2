import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Switch } from '@mui/material';

const lightTheme = {
  background: '#f5f5f7',
  text: '#1d1d1f',
  inputBg: '#ffffff',
  buttonBg: '#ff6b95',
  buttonText: '#ffffff'
};

const darkTheme = {
  background: '#0a192f',
  text: '#ffffff',
  inputBg: '#172a45',
  buttonBg: '#ff6b95',
  buttonText: '#ffffff'
};

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  transition: all 0.3s ease;
  padding: 2rem;
`;

const Header = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  max-width: 800px;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: ${props => props.theme.buttonBg};
  margin-bottom: 3rem;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 800px;
  margin: 2rem 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  border: none;
  background: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
  font-size: 1rem;
  outline: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const GenerateButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 50px;
  border: none;
  background: ${props => props.theme.buttonBg};
  color: ${props => props.theme.buttonText};
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ThemeToggle = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    // TODO: Implement image generation logic
    console.log('Generating image for prompt:', prompt);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppContainer>
        <ThemeToggle>
          <span>🌞</span>
          <Switch
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
            color="default"
          />
          <span>🌙</span>
        </ThemeToggle>
        
        <Header>From Text to Texture: Craft Your Perfect Wallpaper</Header>
        <Subtitle>Transform Words into Art</Subtitle>

        <InputContainer>
          <Input
            type="text"
            placeholder="Describe your perfect wallpaper..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <GenerateButton onClick={handleGenerate}>
            Generate
          </GenerateButton>
        </InputContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
