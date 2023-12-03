import Input from "./Input"

const PersonForm = ({onSubmit, name, number, setName, setNumber}) => {
   return <form onSubmit={onSubmit}>
        <Input description={"name: "} value={name} onChange={setName}/>
        <Input description={"number: "} value={number} onChange={setNumber}/>
        <button type="submit">add</button>
      </form>
}

export default PersonForm