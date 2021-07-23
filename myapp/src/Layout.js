import React, { useContext } from 'react'
import ThemeContext from './theme-context'

function Layout() {
  const themes = useContext(ThemeContext)
  console.log(themes)
  return (
    <div
      style={{ color: themes.foreground, backgroundColor: themes.background }}
    >
      Hello World
    </div>
  )
}

export default Layout
