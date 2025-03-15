export default function LogTable({ header } : {
  header: String[]
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>{header[0]}{" Name"}</th>
          <th>{"Amount ("}{header[1]}{")"}</th>
          <th>{"Cost ("}{header[2]}{"/"}{header[1]}{")"}</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A</td>
          <td>B</td>
          <td>C</td>
          <td>D</td>
        </tr>
        <tr>
          <td>C</td>
          <td>D</td>
          <td>E</td>
          <td>F</td>
        </tr>
      </tbody>
    </table>
  )
}
