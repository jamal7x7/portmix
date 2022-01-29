import { Link } from 'remix'

export default function AboutSubroute() {
  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.4',
        color: 'salmon',
      }}
    >
      <h2>Hello, I'm the Outlet</h2>
      <ul>
        <li>{/* <Link to='about'>About</Link> */}</li>
      </ul>
    </div>
  )
}
