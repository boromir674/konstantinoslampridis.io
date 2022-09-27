import { Context as ResponsiveContext } from 'react-responsive'
import { render, } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('ProductsListing', () => {
  test('matches the snapshot', () => {
    const { container: mobile } = render(
      <ResponsiveContext.Provider value={{ width: 300 }}>
        "Test App"
      </ResponsiveContext.Provider>
    )
    expect(mobile).toMatchSnapshot()

    const { container: desktop } = render(
      <ResponsiveContext.Provider value={{ width: 1000 }}>
        "Test App"
      </ResponsiveContext.Provider>
    )
    expect(desktop).toMatchSnapshot()
  })
})