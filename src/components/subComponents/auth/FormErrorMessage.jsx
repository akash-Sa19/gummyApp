const FormErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="w-full p-2 border border-red-400 rounded-md ">
      <p className="text-red-400">{message}</p>
    </div>
  );
};

export default FormErrorMessage;
