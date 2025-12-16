import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <p className="loader"><span>CityResolved</span></p>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    max-width: fit-content;
    color: oklch(var(--bc)); 
    font-size: 50px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    position: relative;
    font-style: italic;
    font-weight: 800;
    letter-spacing: -2px;
  }

  .loader span {
    display: inline-block;
    animation: cut 2s infinite;
    transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .loader:hover {
    color: oklch(var(--p));
  }

  .loader::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 6px;
    border-radius: 4px;
    background-color: oklch(var(--p) / 0.6);
    top: 0px;
    filter: blur(10px);
    animation: scan 2s infinite;
    left: 0;
    z-index: 0;
    transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .loader::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 5px;
    border-radius: 4px;
    background-color: oklch(var(--p));
    top: 0px;
    animation: scan 2s infinite;
    left: 0;
    z-index: 1;
    filter: opacity(0.9);
    transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  @keyframes scan {
    0% { top: 0px; }
    25% { top: 105%; }
    50% { top: 0px; }
    75% { top: 105%; }
  }

  @keyframes cut {
    0% { clip-path: inset(0 0 0 0); }
    25% { clip-path: inset(100% 0 0 0); }
    50% { clip-path: inset(0 0 100% 0); }
    75% { clip-path: inset(0 0 0 0); }
  }
`;

export default Loader;