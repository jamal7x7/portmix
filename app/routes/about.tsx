import { Link, Outlet } from 'remix'

export default function About() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to About Page</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}
