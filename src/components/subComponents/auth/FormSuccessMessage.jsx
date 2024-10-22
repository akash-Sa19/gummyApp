const FormSuccessMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="w-full p-2 border border-green-400 rounded-md">
      <p className="text-green-400">{message}</p>
    </div>
  );
};

export default FormSuccessMessage;
