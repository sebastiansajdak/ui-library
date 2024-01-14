interface ButtonProps {
  /**
   * Button contents
   */
  label: string;
}

// It is just a sample component for testing purposes
const Button = ({ label }: ButtonProps) => (
  <button className='p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 tt-ui-bg-transparent'>{label} + 55</button>
);

export default Button;
