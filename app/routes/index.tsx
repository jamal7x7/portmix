import { Link } from 'remix'

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Portmix</h1>
      <ul>
        <li>
          <Link to='about'>About</Link>
        </li>
        <li>
          <Link to='counter'>Counter</Link>
        </li>
        <li>
          <Link to='r3f'>React Fiber</Link>
        </li>
      </ul>
    </div>
  )
}
