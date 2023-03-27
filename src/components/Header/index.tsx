import { HeaderConatiner } from './styled'

import { Timer, Scroll } from 'phosphor-react'

import { NavLink } from 'react-router-dom'

import logoIgnite from '../../assets/logo-ignite.svg'

export function Header() {
  return (
    <HeaderConatiner>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderConatiner>
  )
}
