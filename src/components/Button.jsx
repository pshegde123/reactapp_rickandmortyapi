const Button = ({classes,onClickHandler, label,disabled}) =>{
    return(
        <button className={classes} onClick={onClickHandler} disabled={disabled}>{label}</button>
    )
}
export default Button;