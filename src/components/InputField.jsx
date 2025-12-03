function InputField({ label, type, value, handleChangeFn }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} value={value} onChange={handleChangeFn} />
    </div>
  );
}

export default InputField; 