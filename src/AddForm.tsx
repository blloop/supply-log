export default function AddForm({ header } : {
  header: String[]
}) {
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <p>New Entry</p>
      <label htmlFor="name">{header[0]}{" Name"}</label>
      <input id="name" type="text" />
      <label htmlFor="amount">{"Amount ("}{header[1]}{")"}</label>
      <input id="amount" type="text" />
      <label htmlFor="cost">{"Cost ("}{header[2]}{"/"}{header[1]}{")"}</label>
      <input id="cost" type="text" />
      <label htmlFor="total">Total</label>
      <input id="total" type="text" />
    </form>
  )
}
