import './input.css'

const Input = (props) => {
  return(
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />

  )
}

export default Input