import Input from "./Input"

const Filter = ({value, onChange}) => {
   return <Input description={"filter shown with"} value={value} onChange={onChange}/>
}

export default Filter