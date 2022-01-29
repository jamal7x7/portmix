import { Link, useLoaderData } from 'remix'

export const loader = async () => {
  const response = await fetch(
    'https://zp7mbokg.api.sanity.io/v2021-06-07/data/query/production?query=*[][0..2]{title}'
  )

  const data = await response.json()

  const result = data.result

  return result
}

export default function Index() {
  const data = useLoaderData()
  //   const [data, loading] = useLoaderData(loader)
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h2>Counter</h2>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
      </ul>
      <br />
      {/* {data.map((item, index) => (
        <h5>{item}</h5>
      ))} */}
      <details>
        <summary>data comming from the server</summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>
      {data.map((item, index) => (
        <h5>{item.title}</h5>
      ))}
    </div>
  )
}
