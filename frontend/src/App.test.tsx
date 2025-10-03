import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import '@testing-library/jest-dom'

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    )
  })

  it('displays the navigation', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    )
    expect(screen.getByText(/PORTFOLIO/i)).toBeInTheDocument()
  })
})
