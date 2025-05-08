function Button({ text, type, onClick, disabled }) {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className="text-white bg-teal-500 cursor-pointer hover:bg-amber-600 font-medium rounded-none text-sm w-full px-2 py-2.5"
      >
        {text}
      </button>
    </>
  );
}

export default Button;
